const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
require('dotenv').config()

const GetAllUsers = async (req, res) => {
  const params = {
    currentPage: req.query.page || 1,
    perPage: req.query.limit || 5,
    search: req.query.search || '',
    sort: req.query.sort || { keys: 'id', value: 0 }
  }

  const key = Object.keys(params.search)
  if (req.query.search) {
    params.search = key.map((v, i) => {
      return { keys: key[i], value: req.query.search[key[i]] }
    })
  }

  const sortKey = Object.keys(params.sort)
  if (req.query.sort) {
    params.sort = sortKey.map((v, i) => {
      return { keys: sortKey[i], value: req.query.sort[sortKey[i]] }
    })[0]
  } 

  try {
    const users = await userModel.getAll(params)
    const pagination = {
      ...params,
      nextPage: process.env.APP_URL,
      previousPage: process.env.APP_URL,
      totalPages: Math.ceil(users.length / parseInt(params.perPage)),
      totalEntries: users.length
    }

    res.send({
      success: true,
      data: users,
      pagination
    })
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}

const GetSingleUser = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.id)
    if (user) {
      res.send({
        success: true,
        data: user
      })
    } else {
      res.send({
        success: false,
        msg: 'User is not found'
      })
    }
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const DeleteUser = async (req, res) => {
  try {
    const canDelete = await userModel.deleteById(req.params.id)
    if (canDelete) {
      res.send({
        success: true,
        msg: 'User is deleted'
      })
    } else {
      res.send({
        success: true,
        msg: 'User is not found'
      })
    }
  } catch(err) {
    res.send({
      success: true,
      msg: 'There is an error occured ' + err
    })
  }
}


const CreateUser = async (req, res) => {
  const { name, username, password } = req.body
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const canCreate = await userModel.create(name, username, hashedPassword)
    if (canCreate) {
      res.send({
        status: true,
        msg: `User with username ${req.body.username} is created`
      })
    } else {
      res.send({
        status: false,
        msg: 'Username is taken'
      })
    }
  } catch(err) {
    res.send({
      status: false,
      msg: 'There is an error when creating the user ' + err
    })
  }
}

const UpdateUser = async (req, res) => {
  const { id } = req.params
  const { password } = req.body
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);


  try {
    const user = await userModel.getById(id)
    
    if (user) {
      const data = {
        name: req.body.name || user.name,
        username: req.body.username || user.username,
        password: hashedPassword || user.password
      }
  
      await userModel.updateUser(id, data)
      res.send({
        success: true,
        msg: `Update user with id ${id} is success`
      })
    } else {
      res.send({
        success: false,
        msg: 'User not found'
      })
    }
    
  } catch(err) {
    res.send('There is an error occured ' + err)
  }
}

module.exports = { 
  DeleteUser, 
  GetSingleUser, 
  GetAllUsers, 
  CreateUser, 
  UpdateUser 
}
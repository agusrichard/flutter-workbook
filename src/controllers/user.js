const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
const qs = require('qs')
require('dotenv').config()

const GetAllUsers = async (req, res) => {
  // Parameters to specify how to fetch all users
  const params = {
    currentPage: parseInt(req.query.page) || 1,
    perPage: parseInt(req.query.limit) || 5,
    search: req.query.search || '',
    sort: req.query.sort || { keys: 'id', value: 0 }
  }

  // Create search parameters
  const key = Object.keys(params.search)
  if (req.query.search) {
    params.search = key.map((v, i) => {
      return { keys: key[i], value: req.query.search[key[i]] }
    })
  }

  // Create sort parameters
  const sortKey = Object.keys(params.sort)
  if (req.query.sort) {
    params.sort = sortKey.map((v, i) => {
      return { keys: sortKey[i], value: req.query.sort[sortKey[i]] }
    })[0]
  } 

  try {
    const { results, total } = await userModel.getAll(params)
    const totalPages = Math.ceil(total / parseInt(params.perPage))

    // Initialize next page and previous page
    let nextPage = ''
    let previousPage = ''

    // Logic test for next page
    if (params.currentPage < totalPages) {
      const query = req.query
      query.page = params.currentPage + 1;
      nextPage = process.env.APP_URL.concat(`user?${qs.stringify(query)}`)
    } else {
      nextPage = null
    }

    // Logic test for previous page
    if (params.currentPage > 1) {
      const query = req.query
      query.page = params.currentPage - 1;
      previousPage = process.env.APP_URL.concat(`user?${qs.stringify(query)}`)
    } else {
      previousPage = null
    }

    const pagination = {
      ...params,
      nextPage,
      previousPage,
      totalPages,
      totalEntries: total
    }

    res.send({
      success: true,
      data: results,
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
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const date = new Date()
    const canCreate = await userModel.create(name, username, hashedPassword, date)
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
  const { name, username, old_password, new_password, confirm_password } = req.body 

  try {
    const user = await userModel.getById(id)
    const oldPassword = user.password
    
    if (user) {
      if ( old_password && new_password && confirm_password ) {
        if (new_password === confirm_password) {
          if (bcrypt.compareSync(old_password, oldPassword)) {
            const hashedPassword = bcrypt.hashSync(new_password);
            
            const date = new Date()
            const data = {
              name: name || user.name,
              username: username || user.username,
              password: hashedPassword || oldPassword,
              updated_at: date || user.updated_at
            }
        
            await userModel.updateUser(id, data)
            res.send({
              success: true,
              msg: `Update user with id ${id} is success`
            })
          } else {
            res.send({
              success: false,
              msg: 'Wrong password'
            })
          }
        } else {
          res.send({
            success: false,
            msg: "New password and Confirm password do not match"
          })
        }
      } else {
        res.send({
          success: false,
          msg: 'Please provide current password, new password and confirm password'
        })
      }
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
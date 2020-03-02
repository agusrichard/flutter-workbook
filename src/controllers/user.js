const userModel = require('../models/user')


const DeleteUser = async (req, res) => {
  try {
    const canDelete = await userModel.deleteById(req.params.id)
    if (canDelete) {
      res.send('User is deleted')
    } else {
      res.send('User not found')
    }
  } catch(err) {
    res.send('There is an error occured ' + err)
  }
}

const GetSingleUser = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.id)
    if (user) {
      res.send(user)
    } else {
      res.send('User not found')
    }
  } catch(err) {
    res.send('There is an error occured ' + err)
  }
  
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAll()
    res.send(users)
  } catch(err) {
    res.send('There is an error occured' + err)
  }
}

const CreateUser = async (req, res) => {
  const { name, username, password } = req.body
  try {
    const canCreate = await userModel.create(name, username, password)
    if (canCreate) {
      res.send(`User with username ${req.body.username} is created`)
    } else {
      res.send('Username is taken')
    }
  } catch(err) {
    res.send('There is an error when creating the user ' + err)
  }
}

const UpdateUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await userModel.getById(id)

    if (user) {
      const data = {
        name: req.body.name || user.name,
        username: req.body.username || user.username,
        password: req.body.password || user.password
      }
  
      await userModel.updateUser(id, data)
      res.send('Update user is success')
    } else {
      res.send('User not found')
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
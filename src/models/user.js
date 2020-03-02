const db = require('../config/db')
const bcrypt = require('bcryptjs')

const create = (name, username, password) => {
  return new Promise((resolve, reject) => { db.query(
    `SELECT COUNT(*) AS total
     FROM users 
     WHERE username='${username}' 
     LIMIT 1;`, 
    (error, results, fields) => {
      if (!error) {
        const { total } = results[0]
        if (total !== 0) {
          resolve(false)
        } else {
          db.query(`INSERT INTO users(name, username, password) VALUES('${name}', '${username}', '${password}');`,
          (error, results, fields) => {
            if (error) {
              resolve(false)
            } else {
              resolve(true)
            }
          })
        }
      } else {
        throw new Error(error)
      }
    }
  )
  })
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
       FROM users;`,
       (error, results, fields) => {
         if (error) throw error
         resolve(results)
       }
    )
  })
}

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) throw error
        if (results.length !== 0) {
          resolve(results[0])
        } else {
          resolve(false)
        } 
      }
    )
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) throw error
        if (results.length !== 0) {
          db.query(
            `DELETE FROM users
             WHERE id=${parseInt(id)};`,
             (error, results, fields) => {
               if (error) throw error
               resolve(true)
             }
          )
        } else {
          resolve(false)
        } 
      }
    )
  })
}

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) throw error
        if (results.length !== 0) {
          db.query(
            `UPDATE users
             SET name='${data.name}', username='${data.username}', password='${data.password}'
             WHERE id=${parseInt(id)};`,
             (error, results, fields) => {
               if (error) throw error
               resolve(true)
             }
          )
        } else {
          resolve(false)
        } 
      }
    )
  })
}

module.exports = { create, getAll, getById, deleteById, updateUser }
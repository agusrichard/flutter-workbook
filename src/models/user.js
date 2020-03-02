const db = require('../config/db')
const bcrypt = require('bcryptjs')

const create = (name, username, password) => {
  db.query(
    `SELECT COUNT(*) AS total
     FROM users 
     WHERE username='${username}' 
     LIMIT 1`, 
    (error, results, fields) => {
      if (!error) {
        const { total } = results[0]
        if (total !== 0) {
          throw new Error('Username already exists')
        } else {
          db.query(`INSERT INTO users(name, username, password) VALUES('${name}', '${username}', '${password}')`,
          (error, results, fields) => {
            if (error) throw error
          })
        }
        console.log(total)
      } else {
        throw new Error(error)
      }
    }
  )
}

module.exports = { create }
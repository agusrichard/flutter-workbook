const db = require('../config/db')
const bcrypt = require('bcryptjs')

// Create new user
const create = (name, username, password, created_at) => {
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
          db.query(`
          INSERT INTO users(name, username, password, created_at, updated_at) 
          VALUES('${name}', '${username}', '${password}', ${db.escape(created_at)}, ${db.escape(created_at)});
          `,
          (error, results, fields) => {
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          })
        }
      } else {
        reject(error)
      }
    }
  )
  })
}

// Fetch all users
const getAll = (params) => {
  const { perPage, currentPage, search, sort } = params

  // Query conditions
  const conditions = `
  ${search && `WHERE ${search.map(v => `${v.keys} LIKE '%${v.value}%'`).join(' AND ')}`}
  ORDER BY ${sort.keys} ${parseInt(sort.value) === 0 ? 'ASC' : 'DESC'}
  LIMIT ${perPage}
  OFFSET ${(currentPage - 1) * perPage}
  `

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) AS total
      from users`,
      (error, results, fields) => {
        const total = results[0].total
        db.query(
          `SELECT *
           FROM users
           ${conditions};`,
           (error, results, fields) => {
             if (error) reject(error)
             resolve({ results, total })
           }
        )
      }
    )
  })
}

// Fetch one user by id
const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) reject(error)
        if (results.length !== 0) {
          resolve(results[0])
        } else {
          resolve(false)
        } 
      }
    )
  })
}

// Delete user by id
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) reject(error)
        if (results.length !== 0) {
          db.query(
            `DELETE FROM users
             WHERE id=${parseInt(id)};`,
             (error, results, fields) => {
               if (error) reject(error)
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

// Update user by id
const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM users
      WHERE id=${parseInt(id)};`,
      (error, results, fields) => {
        if (error) reject(error)
        if (results.length !== 0) {
          db.query(
            `UPDATE users
             SET name='${data.name}', username='${data.username}', password='${data.password}', updated_at=${db.escape(data.updated_at)}
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
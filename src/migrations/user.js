const db = require('../config/db')

db.query(`CREATE TABLE users (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(60),
  username VARCHAR(40),
  password VARCHAR(40),
  created_at DATETIME,
  updated_at DATETIME
)`, (error, results, fields) => {
  if (error) {
    throw error
    // console.log('Error' + results[0].solutions)
  } else {
    console.log('Success Migrating User')
  }
})
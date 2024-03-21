
const mysql = require('mysql')
let pool = mysql.createPool({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'',
  database:'test_01'
})
module.exports={
  pool
}
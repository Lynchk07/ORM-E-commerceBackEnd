const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
// import sequelize connection
const sequelize = require('./config/connection');
// 
//dotenv
require('dotenv').config()

const db = mysql.createConnection({
  // "-h" host 
  host:process.env.DB_HOST,
  // port:3001,
  //mysql username "-u =user"
  user:process.env.DB_USER,
  //"-p password"
  password: process.env.DB_PASSWORD,
  database:'department_db'
  },

);


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
     })
})




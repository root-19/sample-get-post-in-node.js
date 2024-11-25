const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
// const database = require('./database/database');

// User Registration Handler
async function registerUser(req, res) {
    const { username, email, password } = req.body;
  
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required!');
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // SQL query to insert user into the database
      const sql = 'INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)';
      
      db.query(sql, [username, email, 'user', hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Username or email already exists!');
          }
          return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Registration successful!');
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // User Login Handler
async function loginUser(req, res) {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password are required!');
    }
  
    try {
      // SQL query to get the user by email
      const sql = 'SELECT * FROM users WHERE email = ?';
      
      db.query(sql, [email], async (err, result) => {
        if (err) {
          console.error('Error fetching user from database:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        if (result.length === 0) {
          return res.status(400).send('Invalid email or password');
        }
  
        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, result[0].password);
  
        if (!isMatch) {
          return res.status(400).send('Invalid email or password');
        }
        // het user autintikeyted
        const role = result[0].role;
        if ( role === 'admin') {
            return res.redirect('./admin');
        } else {
            //userr page
            return  res.redirect('./user')
        }
        // res.status(200).send('Login successful!');
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  
  module.exports = { registerUser, loginUser };
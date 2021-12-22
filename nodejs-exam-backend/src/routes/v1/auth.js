const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtPassword } = require('../../config');
const { connectToDb } = require('../../controllers/dbConnection');
const { sendError, sendUserError } = require('../../controllers/error');

const router = express.Router();

const userSchema = Joi.object({
  password: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().trim().lowercase().required(),
  fullName: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(255).required(),
  email: Joi.string().email().trim().lowercase().required(),
});

async function checkDuplicate(email) {
  const query = `
      SELECT 
        id 
      FROM 
        exam_users 
      WHERE
        email=${mysql.escape(email)}
        ;
    `;

  const data = await connectToDb(query);
  console.log(data);
  console.log("Cia yra duomenu ilgis" , data.length);
  return data.length > 0;
};

/**
 * POST /Register.
 */
router.post('/register', async (req, res) => {
  let userInputs = req.body;
  console.log(userInputs);
  try {
    userInputs = await userSchema.validateAsync(userInputs);
  } catch (err) {
    return sendUserError(res, 'Incorect data provided', userInputs);
  }
   try {
     const email = userInputs.email;
     const isDuplicate = await checkDuplicate(email);
     if (isDuplicate) {
      return sendUserError(res, 'Email already exists', userInputs);
    }
    const encryptedPassword = bcrypt.hashSync(userInputs.password, 10);
    const query = `
      INSERT INTO exam_users 
        (
          full_name, 
          email, 
          password
        ) 
        VALUES (
          ${mysql.escape(userInputs.fullName)},
          ${mysql.escape(userInputs.email)},
          '${encryptedPassword}'
        );
        `;
    const dbResponse = await connectToDb(query);
    console.log(dbResponse);
    return res.json({});
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * POST /login 
 */
router.post('/login', async (req, res) => {
  let userInputs = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const query = ` 
      SELECT 
        * 
      FROM 
        exam_users 
      WHERE 
        email = ${mysql.escape(userInputs.email)} 
      LIMIT 1;
      `;
    const [data] = await con.execute(query);
    await con.end();

    if (data.length === 0) {
      return res.status(401).send({ error: 'Incorrect email or password' });
    }
    const isAuthorized = bcrypt.compareSync(userInputs.password, data[0].password);
    const token = jwt.sign(
      {
        id: data[0].id,
        email: userInputs.email
      },
      jwtPassword,
    );

    return isAuthorized
      ? res.send({ msg: 'Succesfully loged in', token })
      : res.status(400).send({ error: 'Incorrect email or password' });
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;

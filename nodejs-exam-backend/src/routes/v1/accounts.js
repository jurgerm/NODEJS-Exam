const express = require('express');
const mysql = require('mysql2/promise');
const { isLoggedIn } = require('../../middleware');
const { connectToDb } = require('../../controllers/dbConnection');
const { sendError, sendUserError } = require('../../controllers/error');

const router = express.Router();

router.use('*', isLoggedIn);

/**
 * GET: /accounts/ - paduoda visas vartotojo grupes (JOIN su groups). ID pasiima iš token.
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.headers.userDetails.id;
    const query = `
      SELECT 
        exam_accounts.id, 
        exam_accounts.group_id, 
        exam_accounts.user_id, 
        exam_groups.full_name 
      FROM 
        exam_accounts 
        INNER JOIN exam_groups 
        ON exam_accounts.group_id = exam_groups.id
      WHERE 
        exam_accounts.user_id = ${mysql.escape(userId)}
    `;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    sendError(res, err);
  }
});


/**
 * POST: /accounts/ - vartotojas paduoda account ID ir savo token. Į accounts lentelę įsirašo duomenys.
 */
router.post('/', async (req, res) => {
  if (!req.body.group_id) {
    sendUserError(res, 'group_id is missing', req.body);
  }
  if (!req.headers.userDetails.id) {
    sendUserError(res, 'user_id is missing', req.headers.userDetails);
  }
  try {
    const userId = req.headers.userDetails.id;
    const groupId = req.body.group_id;
    const query = `
      INSERT INTO exam_accounts 
        (
          user_id, 
          group_id
        ) 
        VALUES 
        ( 
          ${mysql.escape(userId)},
          ${mysql.escape(groupId)}
        )`;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;

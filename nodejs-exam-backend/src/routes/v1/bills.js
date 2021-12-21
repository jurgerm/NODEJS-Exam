const express = require('express');
const mysql = require('mysql2/promise');
const { isLoggedIn } = require('../../middleware');
const { connectToDb } = require('../../controllers/dbConnection');
const { sendError, sendUserError } = require('../../controllers/error');

const router = express.Router();

router.use('*', isLoggedIn);

/**
 * GET: /bills/:id - paduoda vartotojui visas sąskaitas tos grupės.
 */
router.get('/:groupId', async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const query = `
      SELECT 
        bills.id, 
        bills.group_id, 
        bills.amount, 
        bills.description
      FROM 
        exam_bills AS bills
      WHERE 
        bills.group_id =${mysql.escape(groupId)}
        ;
    `;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * POST /bills/ - įrašo naują sąskaitą specifinei grupei (front'as paduoda: group_id, amount, description)
 */
router.post('/', async (req, res) => {
  if (!req.body.group_id) {
    sendUserError(res, 'group_id is missing', req.body);
  }
  if (!req.body.amount) {
    sendUserError(res, 'Amount is missing', req.body);
  }
  if (!req.body.description) {
    sendUserError(res, 'description is missing', req.body);
  }
  try {
    const groupId = req.body.group_id;
    const query = `
      INSERT INTO exam_bills 
        (
          group_id, 
          amount, 
          description
        ) 
        VALUES 
        ( 
          ${mysql.escape(groupId)},
          ${mysql.escape(req.body.amount)},
          ${mysql.escape(req.body.description)}
        );`;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    sendError(res, err);
  }
});
module.exports = router;

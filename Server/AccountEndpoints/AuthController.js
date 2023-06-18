const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../Database/db');

require('dotenv').config();


// *~*~*~* Account create in db logic *~*~*~* 

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const signUp = await pool.query(
      `INSERT INTO appusers (username, email, hashed_password) VALUES($1, $2, $3)`,
      [username, email, hashedPassword]
    );
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12hr' });
    res.json({ username, email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
};



// *~*~*~* Account log in with db logic *~*~*~* 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query('SELECT * FROM appusers WHERE email = $1', [email]);

    if (!users.rows.length) return res.json({ detail: 'Soz, never heard of you?' });

    const success = await bcrypt.compare(password, users.rows[0].hashed_password);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });

    if (success) {
      const username = users.rows[0].username;
      res.json({ username, email: users.rows[0].email, token });
    } else {
      res.json({ detail: 'Login failed, maybe try again?' });
    }
  } catch (err) {
    console.error(err);
  }
};




module.exports = {
  signup,
  login
};

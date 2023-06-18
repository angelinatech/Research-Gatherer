const { pool } = require('../Database/db');


// *~*~*~* save item to database *~*~*~*

const saveItem = async (req, res) => {
    const { title, url, date, username, user_email, category, id} = req.body
    console.log("the id is", id, "the title is", title)
    try {
      const newItem = await pool.query(
        `INSERT INTO usercollection (id, user_email, title, url, date, username, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, user_email, title, url, date, username, category]
      );
      res.json(newItem)
    } catch (err) {
      console.error(err)
    }
}

// *~*~*~* get saved items from database *~*~*~*

const getSavedItems = async (req,res) => {
    const { userEmail } = req.params
    try {
      const userCollection = await pool.query('SELECT * FROM usercollection WHERE user_email = $1', [userEmail])
      res.json(userCollection.rows)
    } catch (err) {
      console.error(err);
    }
}

// *~*~*~* delete item from database *~*~*~*

const deleteItem = async (req,res) => {
    const { id } = req.params
    try {
      const deleteItem = await pool.query('DELETE FROM usercollection WHERE id = $1;', [id])
      res.json(deleteItem)
    } catch (err) {
      console.error(err)
    }
}

// *~*~*~* edit item in database *~*~*~*

const updateItem = async (req, res) => {
    const { id } = req.params;
    const {  user_email, title, url, date, username, category } = req.body;
    console.log(req.body)
    console.log(id)
    try {
      const editUserCollection = await pool.query(
        'UPDATE userCollection SET user_email = $1, title = $2, url = $3, date = $4, username = $5, category = $6 WHERE id = $7;',
        [user_email, title, url, date, username, category, id]
      );
      res.json(editUserCollection);
    } catch (err) {
      console.error(err);
    }
  };



module.exports = {
    saveItem,
    getSavedItems,
    deleteItem,
    updateItem
  };
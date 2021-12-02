var dbConn = require("./../../config/db.config");
//User object create
var User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.is_admin = user.is_admin;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// create a user
User.create = function (user, result) {
  dbConn.query("INSERT INTO users set ?", user, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

// find user by id
User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// get all users
User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

// update user
User.update = function (id, User, result) {
  dbConn.query(
    "UPDATE users SET first_name=?,last_name=?,email=?,is_admin=? WHERE id = ?",
    [User.first_name, User.last_name, User.email, User.is_admin, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// delete users
User.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;

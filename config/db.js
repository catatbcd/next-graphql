var Firebird = require("node-firebird");
var options = {};

options.host = process.env.DBHOST;
options.port = process.env.DBPORT;
options.database = process.env.DBSOURCE;
options.user = process.env.DBUSER;
options.password = process.env.DBPASSWORD;
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null; // default
options.pageSize = 4096; // default when creating database
options.pageSize = 4096; // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop


var pool = Firebird.pool(5, options);
const findUser = async (email) => {
  return new Promise((resolve, reject) => {
    pool.get(function (err, db) {
      if (err) {
        reject({
          ok: false,
          error: "findUser Can't connect to database",
          info: err,
        });
      }
      // db = DATABASE
      var sql = `SELECT * FROM CLIENTE WHERE CLI_EMAIL = '${email}'`;
      //console.log(sql)

      db.query(sql, function (err, result) {
        if (err) {
          reject({
            ok: false,
            error: "Can't run SQL query",
            info: err,
          });
        }
        // IMPORTANT: release the pool connection
        // setUser(result);

        db.detach();
        resolve(result);
      });
    });
    // Destroy pool
    pool.destroy();
  });
};

async function createUser(email) {
  return new Promise((resolve, reject) => {
    pool.get(function (err, db) {
      if (err) {
        reject({
          ok: false,
          error: "createUser Can't connect to database",
          info: err,
        });
      }
      // db = DATABASE
      var sql = `INSERT INTO  CLIENTE (CLI_EMAIL) VALUES('${email}') RETURNING CLI_CODIGO`;
      //console.log(sql)
      db.query(sql, function (err, result) {
        if (err) {
          reject({ ok: false, error: "Could not insert data", info: err });
        }

        // IMPORTANT: release the pool connection
        db.detach();
        resolve(result.CLI_CODIGO);
      });
    });
    // Destroy pool
    pool.destroy();
  });
}

export { pool, findUser, createUser };

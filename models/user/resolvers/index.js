import { pool } from "../../../config/db";

export const resolverUser = {
  Query: {
    getUsers: async () => {
      return new Promise((resolve, reject) => {
        pool.get(function (err, db) {
          if (err) {
            reject({
              ok: false,
              error: "getUsers Can't connect to database",
              info: err,
            });
          }
          // db = DATABASE
          var sql = `SELECT * FROM USERS`;
     
          db.query(sql, function (err, result) {
            if (err) {
              reject({
                ok: false,
                error: "Can't run SQL query",
                info: err,
              });
            }
            // IMPORTANT: release the pool connection

            db.detach();
            resolve(result);
          });
        });
        // Destroy pool
        pool.destroy();
      });
    },
    getUser: async (_, args) => {
      return new Promise((resolve, reject) => {
        pool.get(function (err, db) {
          if (err) {
            reject({
              ok: false,
              error: "getUser Can't connect to database",
              info: err,
            });
          }
          // db = DATABASE
          var sql = `SELECT * FROM USERS WHERE ID='${args.ID}'`;

          db.query(sql, function (err, result) {
            if (err) {
              reject({
                ok: false,
                error: "Can't run SQL query",
                info: err,
              });
            }
            // IMPORTANT: release the pool connection
            db.detach();

            resolve(result[0]);
          });
        });
        // Destroy pool
        pool.destroy();
      });
    },
  },
  Mutation:{
    createUser:async(_,args) => {
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
          var sql = `INSERT INTO USERS ("LOGIN","AVATAR_URL") VALUES('${args.LOGIN}','${args.AVATAR_URL}') RETURNING ID`;

          db.query(sql, function (err, result) {
            if (err) {
              reject({
                ok: false,
                error: "Can't run SQL query",
                info: err,
              });
            }
            // IMPORTANT: release the pool connection
            db.detach();
            const user ={
              ID:result.ID,
              LOGIN:args.LOGIN,
              AVATAR_URL:args.AVATAR_URL
            }
            console.log(result.ID)
            resolve(user);
          });
        });
        // Destroy pool
        pool.destroy();
      });
    },
    editUser:async(_,args) => {
      return new Promise((resolve, reject) => {
        pool.get(function (err, db) {
          if (err) {
            reject({
              ok: false,
              error: "editUser Can't connect to database",
              info: err,
            });
          }
          // db = DATABASE
          var sql =  `UPDATE USERS SET LOGIN='${args.LOGIN}', AVATAR_URL='${args.AVATAR_URL}' WHERE ID ='${args.ID}'`;

          db.query(sql, function (err, result) {
            if (err) {
              reject({
                ok: false,
                error: "Can't run SQL query",
                info: err,
              });
            }
            // IMPORTANT: release the pool connection
            db.detach();
            
            const user ={
              ID:args.ID,
              LOGIN:args.LOGIN,
              AVATAR_URL:args.AVATAR_URL
            }
            resolve(user);
          });
        });
        // Destroy pool
        pool.destroy();
      });
    },
    deleteUser:async(_,args) => {
      return new Promise((resolve, reject) => {
        pool.get(function (err, db) {
          if (err) {
            reject({
              ok: false,
              error: "deleteUser Can't connect to database",
              info: err,
            });
          }
          // db = DATABASE
          var sql =  `DELETE FROM USERS WHERE ID ='${args.ID}'`;

          db.query(sql, function (err, result) {
            if (err) {
              reject({
                ok: false,
                error: "Can't run SQL query",
                info: err,
              });
            }
            // IMPORTANT: release the pool connection
            db.detach();

            resolve("User was deleted");
          });
        });
        // Destroy pool
        pool.destroy();
      });
    }
  }
};

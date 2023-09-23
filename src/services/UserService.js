const db = require('../db');

const test = 

module.exports = {
    getAllUsers: () =>{
        return new Promise((accepted, rejected)=>{
            db.query('SELECT * FROM users', (error, results)=>{
                if(error) {rejected(error); return;}
                accepted(results);
            });
        });
    },
    getSingleUser: (id) =>{
        return new Promise((accepted, rejected)=>{
            db.query('SELECT * FROM users WHERE id = ?', [id], (error, results)=>{
                if(error) {rejected(error); return;}
                if(results.length>0){
                    accepted(results);
                }else{
                    accepted(false);
                }
                
            });
        });
    },
    addNewUser: (firstname, lastname, age) =>{
        return new Promise((accepted, rejected)=>{
            db.query('INSERT INTO users (firstname, lastname, age) VALUES (?,?,?)', [firstname, lastname, age], (error, results)=>{
                if(error) {rejected(error); return;}
                accepted(results.insertCode);    
            });
        });
    },
    editUser: (id, firstname, lastname, age) =>{
        return new Promise((accepted, rejected)=>{
            db.query('UPDATE users SET firstname = ?, lastname=?, age=? WHERE id = ?', [firstname, lastname, age, id], (error, results)=>{
                if(error) {rejected(error); return;}
                accepted(results);    
            });
        });
    },
    deleteUser: (id) =>{
        return new Promise((accepted, rejected)=>{
            db.query('DELETE FROM users WHERE id = ?', [id], (error, results)=>{
                if(error) {rejected(error); return;}
                accepted(results.insertCode);    
            });
        });
    }
};
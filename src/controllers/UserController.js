const UserService = require('../services/UserService');
const contUsers = 0;

module.exports = {
    getAllUsers: async (req,res)=> {

        let users = await UserService.getAllUsers();
        let json = {users:[], total:contUsers};
        for(let i in users){
            contUsers++;
            json.users.push({
                id: users[i].id,
                firstname: users[i].firstname,
                lastname: users[i].lastname,
                age: users[i].age
            })
        }
        res.json(json);
    },
    getSingleUser: async (req,res)=> {
        let json = {};

        let id = req.params.id;
        let user = await UserService.getSingleUser(id);

        if(user){
            json.user  = user;
        } else {
            json.message = "User with id '" + id + "' not found"
        }

        res.json(json);
    },
    addNewUser: async (req,res)=> {
        let json = {};
        
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let age = req.body.age;

        if(firstname && lastname && age){
            let newUser = await UserService.addNewUser(firstname, lastname, age);
            json.user = {
                user : newUser,
                    firstname,
                    lastname,
                    age
            };
        }else{
            json.error = 'You need all fields filled'
        }

        res.json(json);
    
    },
    editUser: async (req,res)=> {
        let json = {};
        
        let id = req.params.id;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let age = req.body.age;

        if(id && firstname && lastname && age){
            await UserService.editUser(id, firstname, lastname, age);

            json.user = {
                id,
                firstname,
                lastname,
                age
            };
        }else{
            json.error = 'You need all fields filled'
        }

        res.json(json);
    
    },
    deleteUser: async (req,res)=> {
        let json = {};

        let id = req.params.id;

        let user = await UserService.getSingleUser(id);

        if(user){
            await UserService.deleteUser(id);
            json.message = "User with id '" + id + "' were deleted"
        } else {
            json.message = "User with id '" + id + "' doesnt exist"
            
        }

        res.json(json);
    }
};
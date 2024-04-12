const User = require('../models/User');

exports.postUser = async (req, res, next) => {

    try{

        if (!req.body.number || !req.body.email) {
            throw new Error("Phone number is mandatory");
        }
        const {name, number, email} = req.body;


        console.log(name, +number, email);

        const existingUserphone = await User.findOne({where:{ phone: +number }});
        if (existingUserphone) {
            return res.status(400).json({ error: 'Phone Number already registered' });
        }

        const existingUser = await User.findOne({where: { email: email }});
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        await User.create({
            name: name,
            phone: +number,
            email: email
        })
        .then(response => res.status(200).json({ message: 'User added successfully!' }))
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "error from editUser"
        });
    }
    
};

exports.getAllUser = async (req, res, next) => {
    try {
        await User.findAll()
        .then(result => {
            res.status(200).json( {users : result} );
        }).catch(err => console.log(err));

    }catch (err) {
        res.status(500).json({error : err.message});
    };
    
};

exports.editUser = async (req, res, next) => {
    try {
        const userId = req.params.Id;

        await User.destroy({
            where: {
              id: userId
            },
          })
        .then(result => {
            res.status(200).json({data: result});
        })
    }catch (err) {
        res.status(500).json({error : err.message, message: "error from editUser"});
    };
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.Id;

        await User.destroy({
            where: {
              id: userId
            },
          })
        .then(result => {
            res.status(200).json({message: "Deleted Successfully"});
        })
    }catch (err) {
        res.status(500).json({error : err.message});
    };
};
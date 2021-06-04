var User = require('../model/userModel');

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            console.log(err);
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.new = function (req, res) {
    var user = new User();
    user.userName = req.body.userName;
    user.accountNumber = req.body.accountNumber;
    user.emailAddress = req.body.emailAddress;
    user.identityNumber = req.body.identityNumber;
    user.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            message: 'New user created!',
            data: user
        });
    });
};

exports.view = function (req, res) {
    User.findById(req.body.userId, function (err, user) {
        if (err)
            return res.send(err);
        return res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

exports.getByAccountNumber = function (req, res) {
    User.findOne({ accountNumber: req.body.accountNumber }, function (error, user) {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        return res.json({
            message: 'Loading get user by account number',
            data: user
        });        
    });
};

exports.getByIdentityNumber = function (req, res) {
    User.findOne({ identityNumber: req.body.identityNumber }, function (e, user) {
        if (e) {
            return res.send(e);
        }
        return res.json({
            message: 'Loading get user by identity number',
            data: user
        });        
    });
};

exports.update = function (req, res) {
    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.send(err);
        }
            
        user.userName = req.body.userName;
        user.accountNumber = req.body.accountNumber;
        user.emailAddress = req.body.emailAddress;
        user.identityNumber = req.body.identityNumber;
    
        user.save(function (error) {
            if (error) {
                return res.json(error);
            }
            return res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

exports.delete = function (req, res) {
    User.remove({
        _id: req.body.userId
    }, function (err, user) {
        if (err) {
            return res.send(err);
        }
            
        return res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};
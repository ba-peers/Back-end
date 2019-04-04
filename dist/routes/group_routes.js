"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _models = require("../db/models");

var _models2 = _interopRequireDefault(_models);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require('sequelize');

// instantiate a router (mini app that only handles routes)
var router = _express2.default.Router();

var Op = Sequelize.Op;

var tokenAuth = _passport2.default.authenticate("jwt", { session: false });
// const localAuth = passport.authenticate("local", { session: false });
// const User = models.User;

var Group = _models2.default.Group;

// router.get("/group",(req, res) => {
//     // if (!req.body.passwords.new) throw new BadParamsError();
//     Group.findAll()
//     .then(group => {
//         res.status(200).json({ group });
//     })
//     .catch(e => console.log("HELLO"+e));
// });

router.post("/group/:group_key", tokenAuth, function (req, res) {
    var userIds = req.user.id;
    _models2.default.Group.findOne({
        where: {
            group_key: req.params.group_key
            // userId:{
            //   [Op.ne]: userIds
            // }
        }
    }).then(function (group) {
        return _models2.default.Member.create({
            member_name: req.body.member_name,
            groupId: group.id,
            userId: userIds
            // where:{
            //   userId:{
            //     [Op.ne]:userIds
            //   }
            // }
        });
    }).then(function (member) {
        return res.status(200).json({ member: member });
    }).catch(function (e) {
        return console.log(e);
    });
});

router.get("/group/:group_key/member", function (req, res) {
    // console.log("hello router.get/group/:group_key");
    // const userId = req.user.id;
    _models2.default.Group.findOne({
        where: {
            group_key: req.params.group_key
        }
    }).then(function (group) {
        return _models2.default.Member.findAll({
            groupId: group.id
        });
    }).then(function (member) {
        return res.status(200).json({ member: member });
    }).catch(function (e) {
        return console.log(e);
    });
});

// list my group that i joined
router.get('/group', tokenAuth, function (req, res, next) {
    var userId = req.user.id;
    _models2.default.User.findOne({
        attributes: ["id"],
        where: { id: userId },
        include: [{ model: _models2.default.Member, as: "members", attributes: ["id"], include: [{ model: _models2.default.Group, attributes: ["id", "name"] }] }]

    }).then(function (user) {

        res.status(200).json({ user: user });
    }).catch(function (e) {
        return next(e);
    });
});
// });
/////
router.delete('/group/:id', tokenAuth, function (req, res) {
    // const userIds = req.user.id;

    _models2.default.Group.findOne({
        where: {
            id: req.params.id
            //  userId:userIds,
            // userId:req.user.id
        }
    }).then(function (group) {
        _models2.default.Member.destroy({
            where: {
                // userId:userIds,
                groupId: group.id
            }
        }).then(function () {
            res.status(200).json({
                result: "Group ID " + req.params.id + " Deleted",
                success: true
            });
        }).catch(function (e) {
            return console.log(e);
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

//////////////

router.post('/new-group', tokenAuth, function (req, res) {
    var userId = req.user.id;

    _models2.default.Group.create({
        name: req.body.name,
        group_key: req.body.group_key,
        userId: userId
    }).then(function (groupNew) {
        // console.log(groupNew)
        res.send(JSON.stringify(groupNew));
    }).catch(function (e) {
        return console.log(e);
    });
});

// Update an existing Group//  
router.put('/group/:id', function (req, res) {
    _models2.default.Group.findByPk(req.params.id).then(function (group) {
        group.update({
            name: req.body.name,
            userId: req.body.userId
        }).then(function (group) {
            res.status(200).json({ group: group });
        }).catch(function (e) {
            return console.log(e);
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

// start a promise chain, so that any errors will pass to `handle`

exports.default = router;
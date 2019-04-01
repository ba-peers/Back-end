import express from "express";
import passport from "passport";
import models from "./../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });


// import { BadParamsError } from "../lib/custom_errors";


// const tokenAuth = passport.authenticate('jwt', { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();
const Group = models.Group;

// router.get("/group/:id", (req, res) => {
//     models.Group.findOne({
//         attributes: ["name","Group"],
//         where: {
//             group_key: group_key
//         }
//       })
//         .then(group => console.log(group.get({ plain: true })))
//         .catch(e => console.log(e));
// });

router.get("/group",(req, res) => {
    // if (!req.body.passwords.new) throw new BadParamsError();
    Group.findAll()
    .then(group => {
        res.status(200).json({ group });
    })
    .catch(e => console.log("HELLO"+e));
});

// try 1
// router.get("/group/:id", (req, res) => {
//     models.Group.findOne()
//       .then(group => {
//         res.status(200).json({ group });
//       })
//       .catch(e => console.log(e));
// });

// try 2
router.post("/group/:group_key", tokenAuth, (req, res) => {
    const userId = req.user.id;
    models.Group.findOne({
        where:{
            group_key: req.params.group_key
        }
    })
    .then(group => {
        return models.Member.create({
            groupId: group.id,
            userId: userId
        }
         
        )
        
        // group.addUser(userId);
    })
    .then(member => res.status(200).json({ member }))
    .catch(e => console.log(e));
});


router.get("/group/:group_key/member", (req, res) => {
    console.log("hello router.get/group/:group_key");
    // const userId = req.user.id;
    models.Group.findOne({
        where:{
            group_key: req.params.group_key
        }
    })
    .then(group => {
        return models.Member.findAll({
            groupId: group.id,
        }
        )
    })
    .then(member => res.status(200).json({ member }))
    .catch(e => console.log(e));
    //     return models.Member.findAll({
    //         where:{
    //             groupId: req.params.id,
    //             userId: userId
    //         },
    //     })
    // // })
    // .then(member => res.status(200).json({ member }))
    // .catch(e => console.log(e));
});

export default router;
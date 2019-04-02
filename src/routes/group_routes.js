import express from "express";
import models from "../db/models";
import passport from "passport";
import jwt from "jsonwebtoken";

// instantiate a router (mini app that only handles routes)
const router = express.Router();


const tokenAuth = passport.authenticate("jwt", { session: false });
// const localAuth = passport.authenticate("local", { session: false });
// const User = models.User;

const Group = models.Group;

router.get("/group",(req, res) => {
    // if (!req.body.passwords.new) throw new BadParamsError();
    Group.findAll()
    .then(group => {
        res.status(200).json({ group });
    })
    .catch(e => console.log("HELLO"+e));
});

router.post("/group/:group_key", tokenAuth, (req, res) => {
    const userId = req.user.id;
    models.Group.findOne({
        where:{
            group_key: req.params.group_key
        }
    })
    .then(group =>{
        return models.Member.create({
            member_name:req.body.member_name,
            groupId: group.id,
            userId: userId
        })
    })
    .then(member => res.status(200).json({ member }))
    .catch(e => console.log(e));
});


router.get("/group/:group_key/member", (req, res) => {
    // console.log("hello router.get/group/:group_key");
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
});

 //get all the groups///
 router.get('/groups', tokenAuth, (req, res)=>{
   models.Group.findOne({
     where:{
      userId:req.user.id
     }
   })
   .then(groups => {
    res.status(200).json({groups:groups})
   })
 .catch(e=> console.log(e));
 });

 /// get Group by record ID ///
 router.get('/group/:id',(req,res)=>{
   models.Group.findByPk(req.params.id)
   .then(group => {
     res.status(200).json({group:group})
   })
    .catch(e=> console.log(e));
  })
////////////////////

  router.delete('/group/:id',tokenAuth,(req,res)=> {
    models.Group.findOne({
     where:{
       id:req.params.id,
       // userId:req.user.id
      }
    }).then(group => {
      models.Member.destroy({
        where:{
          groupId:group.id
        }
      }).then(()=> {
         res.status(200).json({
             result: `Group ID ${req.params.id} Deleted` , 
             success: true
         });
     })
     .catch(e => console.log(e));
  })
    .catch(e => console.log(e));
 })

//////////////
 // create new group//
  router.post('/new-group', tokenAuth,
  (req, res) => {
     const userId = req.user.id;

   models.Group.create({
    name: req.body.name,
    group_key: req.body.group_key,
    userId:userId
      
   }).then(groupNew => {
      // console.log(groupNew)
    res.send(JSON.stringify(groupNew))
    })
    .catch(e => console.log(e));
 });

 //delete an group by its ID//
//  router.delete('/group/:id',tokenAuth,(req,res)=> {
//    models.Group.findOne({
//     where:{
//       id:req.params.id,
//       // userId:req.user.id
//      }
//    }).then(group => {
//     group.destroy().then(()=> {
//         res.status(200).json({
//             result: `Group ID ${req.params.id} Deleted` , 
//             success: true
//         });
//     })
//     .catch(e => console.log(e));
//  })
//    .catch(e => console.log(e));
// })

// Update an existing Group//  
router.put('/group/:id', (req, res) => {
   models.Group.findByPk(req.params.id).then(group => {
     group.update({
       name: req.body.name,
       userId: req.body.userId
     }).then(group=> {
       res.status(200).json({ group: group});
     }).catch(e => console.log(e));
   }).catch(e => console.log(e));
 });

  // start a promise chain, so that any errors will pass to `handle`

export default router;
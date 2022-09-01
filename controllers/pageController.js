const Robot = require('../models/robot')

exports.getHomePage = async ( req,res)=>  {
  const robots = await Robot.find()

    res.status(200).render('homePage',{robots})
} 


exports.getPanelPage = async ( req,res)=>  {
    const robots = await Robot.find()
 
      res.status(200).render('panel',{robots})
  } 









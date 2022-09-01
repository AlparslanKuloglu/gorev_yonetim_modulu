const express = require('express')
const router = express.Router()
const robotController=require('../controllers/robotController')

router.route('/add').post(robotController.createRobot)


module.exports= router 

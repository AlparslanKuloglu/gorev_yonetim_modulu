const express = require('express')
const router = express.Router()

const commandController=require('../controllers/commandController')

router.route('/update').post(commandController.jobUpdate)


module.exports= router 
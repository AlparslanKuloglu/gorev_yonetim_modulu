const Robot = require('../models/robot')



exports.createRobot = async (req, res) => {
  try {
    const user = await Robot.create(req.body);

    res.status(201).redirect('/')

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })

  }

}


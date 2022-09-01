const Command = require('../models/command')


exports.jobCreate =  async (robotID,job,commandID) => {
  
  try {
   let command = await Command.create({
   robotID:robotID,   
   job:job,
   jobUpdate: "Devam ediyor"
    })
    
   return await command
}
 catch(error) { res.status(400).json({
  status: 'fail',
  error
})}

}



exports.jobUpdate = async (req, res) => {

    try {

      const command = await Command.findOne({_id:req.body.commandID})

      if(req.body.updateJob==="iptal et"){
        command.jobUpdate="İptal edildi."
      }
      if(req.body.updateJob==="Durdur"){
        command.jobUpdate="Durduruldu."
      }
      if(req.body.updateJob==="Devam et"){
        command.jobUpdate="Devam ediyor."
      }
      if(req.body.updateJob==="Başarıyla yerine geldi."){
        command.jobUpdate="Başarıyla tamamlandı."
      }
    
      command.save()
     
     res.redirect(`/panel?username=PatikaRobotics&room=${command.robotID}`)
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error
      })
  
    }
  
  }
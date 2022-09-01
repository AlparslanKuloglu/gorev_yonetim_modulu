const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express()
const mongoose = require('mongoose');
const server = http.createServer(app);
const io = socketio(server);

const commandMessage = require("./utils/messages");
const batteryMessage = require("./utils/batteryMessage");
const commandController = require('./controllers/commandController')
const pageRoute = require('./routes/pageRoute')
const robotRoute = require('./routes/robotRoute')
const commandRoute = require('./routes/commandRoute')
const Robot = require('./models/robot')
const Command = require("./models/command");
const {
  userJoin,
  getCurrentUser,
} = require("./utils/users");


mongoose.connect('mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




app.use('/', pageRoute)
app.use('/robots', robotRoute)
app.use('/commands', commandRoute)



//---------------------socket------------------------------------




io.on("connection", async (socket) => {

  socket.on("joinRoom", async ({ username, room }) => {

    const robot = await Robot.findOne({ _id: room })
    const commands = await Command.find({ robotID: room })
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    setInterval(function () { socket.emit("message", batteryMessage(robot._id, robot.batteryInfo)) }, 300)

    for (let i = 0; i < commands.length; i++) {
      socket.emit("commandMessage", commandMessage(commands[i].job, commands[i]._id, commands[i].jobUpdate))
    }

  })

  socket.on("command", async (msg1) => {

    const user = getCurrentUser(socket.id);

    const command = await commandController.jobCreate(user.room, msg1)

    io.to(user.room).emit("commandMessage", commandMessage(msg1, command._id, command.jobUpdate))

  })


})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
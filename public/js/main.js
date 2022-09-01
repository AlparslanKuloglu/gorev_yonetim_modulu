const orderForm = document.getElementById('order-form');
const panelMessages = document.querySelector('.panel-messages');
const commandMessages = document.querySelector('.command-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});


socket.on('message', (message) => {
 
  BatteryMessage(message);

  panelMessages.scrollTop = panelMessages.scrollHeight;
});

socket.on('commandMessage', (message) => {
 
  commandMessage(message);


});



orderForm.addEventListener('submit', (e) => {
  e.preventDefault();


  let msg1 = e.target.elements.msg1.value;

  msg1 = msg1.trim();

  if (!msg1) {
    return false;
  }

  socket.emit('command', msg1);

  e.target.elements.msg1.value = '';
  e.target.elements.msg1.focus();
}); 



function BatteryMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = "Battery Info";
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = `Şu anda yönetilen robotun batarya bilgisi: ${message.batteryInfo}`;
  div.appendChild(para);
  document.getElementById("robotName").innerText= message.robotID;

  document.querySelector('.panel-messages').appendChild(div);
}

function commandMessage(message) {

  
  const div = document.createElement('div');
  div.classList.add('messages-box');
  const form = document.createElement('form')
  form.action="/commands/update"
  form.method="post"
  const select = document.createElement('select')
  const option1 = document.createElement('option')
  const option2 = document.createElement('option')
  const option3 = document.createElement('option')
  const option4 = document.createElement('option')
  const button = document.createElement('button')
  const commandID = document.createElement('input')
  commandID.type="hidden"
  commandID.name="commandID"
  commandID.value=message.commandID
const input = document.createElement('input')
input.type="submit"

select.name = "updateJob"



  option1.innerText = "iptal et"
  option2.innerText = "Durdur"
  option3.innerText = "Devam et"
  option4.innerText = "Başarıyla yerine geldi."


  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');

  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerHTML =`Robota şu komutu verdiniz: ${message.job}   &nbsp; Durum:${message.jobStatus}   `,

  form.appendChild(commandID)
  select.appendChild(option1)
  select.appendChild(option2)
  select.appendChild(option3)
  select.appendChild(option4)
  form.appendChild(select)
  form.appendChild(input)
  div.appendChild(para);
  div.appendChild(form)
  document.querySelector('.command-messages').appendChild(div);
}



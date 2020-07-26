import express from 'express';
import bodyParser from 'body-parser';
const generatePassword = require('password-generator');

const app = express();

const GameRooms ={

}

const GameRoom=
{
    RoomID: "",
    players: [],
    LastMessage: ''
}

const Player=
{
    RoomID: '',
    PlayerID: 0,
    Name: '',
    LastGamePlayload: '',
    LastDevicePayload: ''
}

app.use(bodyParser.json());
app.get('/hello', (req, res) => res.send('Hello'));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));

app.get('/api/createroom/', (req, res) => {
    const roomID = generatePassword(4, false, "[A-Z]"); //generate this code

    var room = {RoomID: roomID, players: [], LastMessage: ''}
    
    GameRooms[roomID]= room;

    res.status(200).send(`${roomID} created!`);

});

app.post('/api/JoinRoom/:roomID', (req, res) => {
    const {playerName} = req.body;
    const roomID = req.params.roomID;

    //var player = {RoomID: roomID, PlayerID:GameRooms[roomID].players.length, name: playerName, LastGamePlayload: '', LastDevicePayload:''}
    
    var player = {RoomID: roomID, PlayerID:0, name: playerName, LastGamePlayload: '', LastDevicePayload:''}
    
    //or if player exists, rejoin
    PlayerID:GameRooms[roomID].players.push(player);

    res.status(200).send(`${playerName} has joined ${roomID}`);
});

app.post('/api/MessagePlayers/:roomID/all', (req, res) => {
    const {message} = req.body;
    const roomID = req.params.roomID;

    for (var i =0; i < GameRooms[roomID].players.length; i++){
    GameRooms[roomID].players[i].LastGamePlayload = message;
    }

    res.status(200).send(`All players last payload is ${message}`);
});

app.listen(8000, () => console.log('Listening on port 8000'));
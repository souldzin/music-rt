const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const state = require('./state');

// --- configuration ------------
const CONFIG = {
    STATIC_ROOT: '../../wwwroot',
    VIEW_ROOT: '../../views',
    PORT: 3000
};

CONFIG.STATIC_ROOT_ABS = path.join(__dirname, CONFIG.STATIC_ROOT);
CONFIG.VIEW_ROOT_ABS = path.join(__dirname, CONFIG.VIEW_ROOT);

// --- setup express app --------

const app = express();

app.use( express.static(CONFIG.STATIC_ROOT_ABS));

app.get('/', function(req, res){
    res.sendFile( path.join(CONFIG.VIEW_ROOT_ABS, "index.html"));
});

// --- setup server & io --------

const server = http.createServer(app);
const io = socketio(server);
const store = state.createServerStore();

io.on('connection', function (socket){
    console.log('a user connected!');

    socket.emit('init', {
        state: store.getState()
    });

    socket.on('action', function(action){
        store.dispatch(action);
        // --- kill sync flag - it's already syncd :)
        action.sync = false; 
        io.emit('action', action);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnected!');
    });
});

// --- start server -------------

server.listen(CONFIG.PORT, () => {
    console.log("listening on port: " + CONFIG.PORT);
});
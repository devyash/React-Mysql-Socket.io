/**
 * Client :
 Events:
 - On New Connection: Request server with ('connect')
 - Listen to port for incoming data ('update_data')


 Server:
 * Events:
 - On Client Connection ('connect'): Emit the basic data from last broadcast (var previous_data) | New Request if  previous_data == null
 - On Refresh('refresh'): Emit the basic data from last broadcast
 - On RecieveData('update_data'): Broadcast the data to All users in a room


 Service:
 Run continuosly in background:

 AfterTimeInterval 2 min: Run the queries
 Compare the result of the query from the previous_data
 if Change in data : Emit RecieveData to the server with the new data.
 */

var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

// Hook Socket.io into Express
var io = require('socket.io')(http);
var previous_data = null;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});



async function emit_data_to_user(){
  if(!previous_data || previous_data==null){
    previous_data = await get_data_from_mysql();
  }
  // TODO make it broadcast to just that user not all
  socket.broadcast.emit('connect',{
    data: previous_data
  });
}

function get_data_from_mysql(){
  return new Promise((resolve,reject) =>  {
      // TODO Get DATA from mysql and close the connection
  });
}

async function update_and_emit_data_to_all(){
    previous_data = await get_data_from_mysql || previous_data
    socket.broadcast.emit('connect',{
      data: previous_data
    });
}



// Socket.io Communication
io.sockets.on('connect', emit_data_to_user);
io.sockets.on('refresh', emit_data_to_user);
io.sockets.on('update_data', update_and_emit_data_to_all)


// Start server
app.listen(3000, function(){
  console.log("Express server listening on port *:3000");
});

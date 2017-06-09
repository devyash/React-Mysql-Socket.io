window.onload = function() {
  // get_data_on_start_up();
  // init();
}

function get_data_on_start_up(){

}


function init(){
    var socket = io('http://localhost');
    socket.on('connect', function (data) {
        console.log(data);
        socket.emit('', { my: 'data' });
      });
}

onconnect = function(e){
	var port = e.ports[0];
	port.addEventListener('message', function(e){
		var workerResult = 'Result: ' + (e.data.x * e.data.y);
      	port.postMessage({result: workerResult});
	});
}
var a = window();
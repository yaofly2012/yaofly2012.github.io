
var messageHandle = function(e){
	var workerResult = 0;
	if(e.data.op === '+'){
		workerResult = e.data.x + e.data.y;
	} else if(e.data.op === '*'){
		workerResult = e.data.x * e.data.y;
	}
	
  	e.source.postMessage({result: workerResult, x:e.data.x, y: e.data.y});
};
onconnect = function(e){
	var port = e.ports[0]; //e.source
	//port.onmessage = messageHandle;
	port.addEventListener('message', function(e){
		var workerResult = 0;
		if(e.data.op === '+'){
			workerResult = e.data.x + e.data.y;
		} else if(e.data.op === '*'){
			workerResult = e.data.x * e.data.y;
		}
		
	  	port.postMessage({result: workerResult});
	});
	port.start(); // Port要start, 通过onmessage属性赋值内部调用，但是如果显示调用addEventListener('message'),则必须显示调用start
	
	port.postMessage({result: 'ready'});
}
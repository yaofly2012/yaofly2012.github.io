// var i=0;
// var timeHandle = null;
// var self = this;
// this.addEventListener('message', function(e){
// 	i = e.data.count;
// 	if(e.data.op === 'start'){
// 		timedCount();
// 	} else{
// 		timeHandle && clearTimeout(timeHandle);
// 		timeHandle = null;
// 	}
// });

// function timedCount()
// {
// 	i=i+1;
// 	postMessage({count: i});
// 	timeHandle = setTimeout("timedCount()", 1000);
// }
postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
  postMessage("Hi " + oEvent.data);
};
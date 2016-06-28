// Demo1
// var i=0;
// var port2;
// onmessage = function(e){
// 	port2 = e.ports[0];
// 	timedCount();
// }
// function timedCount()
// {
// 	port2.postMessage(++i);
// 	timeHandle = setTimeout(timedCount, 1000);
// }

var i=0;
function timedCount()
{
	postMessage(++i);
	timeHandle = setTimeout(timedCount, 1000);
}
timedCount();
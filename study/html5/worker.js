var i=0;
function timedCount()
{
	postMessage(++i);
	timeHandle = setTimeout(timedCount, 1000);
}
timedCount();
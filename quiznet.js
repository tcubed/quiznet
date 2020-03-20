
// https://stackoverflow.com/questions/1638337/the-best-way-to-synchronize-client-side-javascript-clock-with-server-date
// the NTP algorithm
// t0 is the client's timestamp of the request packet transmission,
// t1 is the server's timestamp of the request packet reception,
// t2 is the server's timestamp of the response packet transmission and
// t3 is the client's timestamp of the response packet reception.
function ntp(t0, t1, t2, t3) {
    return {
        roundtripdelay: (t3 - t0) - (t2 - t1),
        offset: ((t1 - t0) + (t2 - t3)) / 2
    };
}
function sampleRoundTrip(callback){
    // calculate the difference in seconds between the client and server clocks, use
    // the NTP algorithm, see: http://en.wikipedia.org/wiki/Network_Time_Protocol#Clock_synchronization_algorithm
    var clientTime=new Date();
    var t0 = clientTime.valueOf();

    $.ajax({
        url: 'timeecho.php',
        success: function(servertime, text, resp) {
            // NOTE: t2 isn't entirely accurate because we're assuming that the server spends 0ms on processing.
            // (t1 isn't accurate either, as there's bound to have been some processing before that, but we can't avoid that)
            var t1 = servertime,
                t2 = servertime,
                t3 = (new Date()).valueOf();
            var c = ntp(t0, t1, t2, t3);

            // log the calculated value rtt and time driff so we can manually verify if they make sense
            //console.log("NTP delay:", c.roundtripdelay, "NTP offset:", c.offset, "corrected: ", (new Date(t3 + c.offset)));
            
            delay.push(c.roundtripdelay)
            offset.push(c.offset)
            if(delay.length<20){
                sampleRoundTrip(callback);
            }
            else{
                delay.sort()
                offset.sort()
                mediandelay=d3.median(delay)
                medianoffset=d3.median(offset)
                callback()
            }
        }
    });
}
function mytime(dt){
    //console.log('mytime')
    //console.log(dt)
    //var txt=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()
    var sec=dt.getSeconds()
    if(sec<10){sec='0'+sec;}
    var msec=dt.getMilliseconds()
    if(msec<10){msec='0'+msec;}
    if(msec<100){msec='0'+msec;}
    var txt=dt.getHours()+':'+dt.getMinutes()+':'+sec+'.'+msec;
    //var txt=dt.getHours()+':'+dt.getMinutes()+':'+(dt.getSeconds()+dt.getMilliseconds()/1000).toFixed(3)
    return txt
}

var delay=[], mediandelay;
var offset=[], medianoffset;

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
            //console.log('NTP,t0:'+t0+', t1:'+t1+',t2:'+t2+',t3:'+t3)
            // log the calculated value rtt and time driff so we can manually verify if they make sense
            //console.log("NTP delay:", c.roundtripdelay, "NTP offset:", c.offset, "corrected: ", (new Date(t3 + c.offset)));
            
            //networkDelay.push(c.roundtripdelay)
            //networkOffset.push(c.offset)
            networkDelay[iSample]=c.roundtripdelay
            networkOffset[iSample]=c.offset
            iSample++;

            if(iSample%200==0){
                console.log(iSample)
            }

            //if(networkDelay.length<NSAMPLE){
            if(iSample<NSAMPLE){
                sampleRoundTrip(callback);
            }
            else{
                networkDelay.sort()
                networkOffset.sort()
                medianNetworkDelay=d3.median(networkDelay)
                medianNetworkOffset=d3.median(networkOffset)
                callback()
            }
        }
    });
}
function submitStats() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            txt= this.responseText
            //if(txt.length<1){txt='no response';}
            //document.getElementById("quizStatus").innerHTML = txt;
        }
    };
    var e=document.getElementById('quizid')
    var quizid=e.value;

    var data={networkOffset:medianNetworkOffset,
              networkDelay:medianNetworkDelay,
              audioDelay:M.medianAudioDelay}
    var payload=encodeURIComponent(JSON.stringify(data))
    var url='quiznet.php?id='+quizid+'&stats';
    //console.log(url)
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('data='+payload)
}
function mytime(dt){
    //console.log('mytime')
    //console.log(dt)
    //var txt=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()
    var mnt=dt.getMinutes();
    if(mnt<10){mnt='0'+mnt;}
    var sec=dt.getSeconds()
    if(sec<10){sec='0'+sec;}
    var msec=dt.getMilliseconds()
    if(msec<10){msec='0'+msec;}
    if(msec<100){msec='0'+msec;}
    var txt=dt.getHours()+':'+mnt+':'+sec+'.'+msec;
    //var txt=dt.getHours()+':'+dt.getMinutes()+':'+(dt.getSeconds()+dt.getMilliseconds()/1000).toFixed(3)
    return txt
}
function benchMessage(obj){
    if(obj.jump=="none"){
        txt='<h6>No one has jumped yet.</h6>'
    }
    else{
        // get times and names
        var txtrows='';
        var dtarr=[]
        for(var ii=0;ii<obj.benches.length;ii+=1){
            var res=obj.benches[ii].split(',');
            var dt=new Date(Number(res[0]));
            //console.log(dt)
            txtrows+='<tr><td>'+res[1]+'</td><td>'+mytime(dt)+'</td></tr>';
            dtarr.push(dt)
        }
        // determine how far ahead the first jumper was compared to the second
        var firstLead=0;
        if(dtarr.length>1){
            firstLead=dtarr[1]-dtarr[0];
        }

        txt='<h6>'+obj.jump+' had the first jump.</h6>'
        if(firstLead>1000){
            txt+='<p style="color:#FFAA00">'+obj.jump+' won by '+(firstLead/1000).toFixed(2)+'s.'
        }
        txt+='<table class="table table-striped" border=1 style="margin-top:20px">';
        txt+='<thead><tr><th>Quizzer</th><th>Timestamp</th></thead>';
        txt+='<tbody>'
        txt+=txtrows
        txt+='</tbody></table>'
    }
    return txt
}

var iSample=0;
var NSAMPLE=30;
var networkDelay=new Array(NSAMPLE);
var networkOffset=new Array(NSAMPLE);
var medianNetworkDelay;
var medianNetworkOffset;
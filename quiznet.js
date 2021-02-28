
function submitNetworkStats() {
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

    var data={networkOffset:T.medianNetworkOffset,
              networkDelay:T.medianNetworkDelay,
              audioDelay:M.medianAudioDelay}
    var payload=encodeURIComponent(JSON.stringify(data))
    var url='quiznet.php?id='+quizid+'&stats';
    //console.log(url)
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('data='+payload)
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
            txtrows+='<tr><td>'+res[1]+'</td><td>'+T.mytime(dt)+'</td></tr>';
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

function pollBenches() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var obj=JSON.parse(this.responseText);
        txt=benchMessage(obj)
        document.getElementById("benchMessage").innerHTML = txt;

        // sample round trip
        T.sampleRoundTrip(syncOne_callback,1)
    }
    };
    var e=document.getElementById('quizid')
    var quizid=e.value;

    var url='quiznet.php?id='+quizid+'&p=1';
    //console.log(url)
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
}


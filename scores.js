function submitScores(team,scoreChange) {
    //console.log('submitScores')
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("txtHint").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };

    xmlhttp.open("POST", "quiznet.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    // calc scores
    var quizid=document.getElementById("quizid").value;
    var scores=[]
    for (var ii=0;ii<3;ii++){
        var nm=document.getElementById("teamName"+(ii+1)).value;
        var oldscore=Number(document.getElementById("teamScore"+(ii+1)).innerText);
        var newscore=oldscore;
        if((ii+1)==team){
            if(scoreChange==20){newscore=20;}
            else if(scoreChange==10 || scoreChange==-10){
                newscore+=scoreChange;
            }
        }
        // update score
        document.getElementById("teamScore"+(ii+1)).innerText=newscore;
        teamdata={team:nm,score:newscore}
        scores.push(teamdata)
    }
    console.log(scores)
    //console.log('args:'+args);
    xmlhttp.send("id="+quizid+"&scores="+JSON.stringify(scores));
    //xmlhttp.send();
}
function getScores(){
    var quizid=document.getElementById("quizid").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("txtHint").innerHTML = this.responseText;
            console.log('getScores');
            console.log('response:"'+this.responseText+'"');
            setJumperScores(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("POST", "quiznet.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id='+quizid+'&getScore='+quizid);
}
function setJumperScores(scores){
    var e, v,teamid;
    for(ii in scores){
        var idx=(Number(ii)+1);
        v=scores[ii]['team']+':'+scores[ii]['score']
        console.log(v)

        teamid='team'+idx+'sm';
        console.log(teamid)
        e=document.getElementById(teamid);
        if(e instanceof Element){
            e.innerText=v
        }
        
        teamid='team'+idx+'lg';
        console.log(teamid)
        e=document.getElementById(teamid);
        if(e instanceof Element){
            e.innerText=v
        }
        
    }
}
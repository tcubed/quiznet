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
    
    // get quizid
    var quizid=document.getElementById("quizid").value.trim();
    
    // calc scores (update DOM if appropriate)
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
        // update score in DOM
        document.getElementById("teamScore"+(ii+1)).innerText=newscore;
        teamdata={team:nm,score:newscore}
        scores.push(teamdata)
    }
    //console.log(scores)

    // quiz number
    var quizNum=Number(document.getElementById("quizNumber").innerText);
    // question
    var question=document.getElementById("questionNumber").innerText;
    if(team==0){
        // quiz number changes
        if(scoreChange=='quiz+1'){quizNum+=1;}
        else if(scoreChange=='quiz-1'){quizNum-=1;}
        else if(scoreChange=='quizNew'){quizNum=1;}
        document.getElementById("quizNumber").innerText=quizNum;

        // question changes
        var idxSuffix=question.search(/[AB]/)
        if(idxSuffix>0){
            quesNum=Number(question.substr(0,idxSuffix));
        }
        else{
            quesNum=Number(question)
        }
        if(scoreChange=='question+1'){question=quesNum+1;}
        else if(scoreChange=='question-1'){question=quesNum-1;}
        else if(scoreChange=='question+A'){question=quesNum+'A';}
        else if(scoreChange=='question+B'){question=quesNum+'B';}
        else if(scoreChange=='questionNew'){question=1;}
        document.getElementById("questionNumber").innerText=question;
    }

    var quizData={quiz:quizNum,question:question,scores:scores}
    console.log(quizData)



    //console.log('args:'+args);
    //xmlhttp.send("id="+quizid+"&scores="+JSON.stringify(scores));
    xmlhttp.send("id="+quizid+"&quizData="+JSON.stringify(quizData));
    //xmlhttp.send();
}
function getScores(quizid){
    //var quizid=document.getElementById("quizid").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("txtHint").innerHTML = this.responseText;
            //console.log('getScores');
            //console.log('response:"'+this.responseText+'"');
            setJumperScores(JSON.parse(this.responseText));
            //return JSON.parse(this.responseText)
        }
    };
    xmlhttp.open("POST", "quiznet.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id='+quizid+'&getScore='+quizid);
}

function setJumperScores(quizData){
    //var scores=getScores(quizid);
    var e, v,teamid;

    // set quiz & question
    e=document.getElementById('quizsm');
    if(e instanceof Element){
        e.innerText='QZ: '+quizData.quiz
        e=document.getElementById('questionsm');
        e.innerText='Q: '+quizData.question
    }
    e=document.getElementById('quizlg');
    if(e instanceof Element){
        e.innerText='QZ: '+quizData.quiz
        e=document.getElementById('questionlg');
        e.innerText='Q: '+quizData.question
    }

    // set scores
    for(ii in quizData.scores){
        var idx=(Number(ii)+1);
        v=quizData.scores[ii]['team']+':'+quizData.scores[ii]['score']
        //console.log(v)

        teamid='team'+idx+'sm';
        //console.log(teamid)
        e=document.getElementById(teamid);
        if(e instanceof Element){
            e.innerText=v
        }

        teamid='team'+idx+'lg';
        //console.log(teamid)
        e=document.getElementById(teamid);
        if(e instanceof Element){
            e.innerText=v
        }
        
    }
}
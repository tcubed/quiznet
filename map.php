<?php
date_default_timezone_set("America/Chicago");

function getVisitorLog($fn){
    if(file_exists($fn)){
        $v=file_get_contents($fn);
        $L=explode(PHP_EOL,$v);
        
        $llen=count($L);
        $loc=array();
        for($ii = 0; $ii < $llen; $ii++) {
            $li=explode(',',$L[$ii]);
            if(count($li)<2){break;}
            $date=$li[0];
            $ip=$li[1];
            $quizid=$li[2];
            $rec=array("date"=>$date,"ip"=>$ip,"quizid"=>$quizid);
            $loc[$ii]=$rec;
        }
        header('Content-Type: application/json');
        echo json_encode($loc);
    }
    else{
        echo '[]';
    }
    
}
function readVisitorJson($fn){
    // read visitor json data and echo out;
    if(file_exists($fn)){
        $json=file_get_contents($fn);
    }
    else{
        $json='[]';
    }
    header('Content-Type: application/json');
    echo $json;
}
function writeVisitorJson($fn,$json){
    //echo 'writeVisitorJson';
    var_dump($json);
    $rc=file_put_contents($fn,$json);
    header('Content-Type: application/json');
    echo '{"msg":"done!"}';
}


$fnjson='visitors.json';

// jump requests
if(array_key_exists("p",$_POST)){
    // write JSON data
    //var_dump($_POST);
    echo '$_POST[p] length:'.strlen($_POST["p"]);
    writeVisitorJson($fnjson,$_POST["p"]);
}
else if(array_key_exists("g",$_GET)){
    readVisitorJson($fnjson);
}
else if(array_key_exists("log",$_GET)){
    getVisitorLog('logs.txt');
}
?>
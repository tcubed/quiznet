<?php
date_default_timezone_set("America/Chicago");

function cmpjump($a,$b){
    // compare jumps: a and b are '<time>,<quizzer>'
    //return $a[0]-$b[0];
    $av=explode(',',$a)[0];
    $bv=explode(',',$b)[0];
    if ($av==$bv) return 0;
    return ($av<$bv)?-1:1;
}

function getJump($quizfile){
    //https://www.w3schools.com/PHP/php_arrays_sort.asp
    //echo 'file contents<br>';
    $s=file_get_contents($quizfile);

    // split into lines
    $arr=explode('\n',$s);
    $nrows=count($arr);
    if(strlen($arr[$nrows-1])==0){
        unset($arr[$nrows-1]);
    }
    // sort
    usort($arr,"cmpjump");
    // get the first quizzer
    $timeQuizzer=explode(',',$arr[0]);

    $ret=array('jump'=>$timeQuizzer[1],'benches'=>$arr);

    echo json_encode($ret);
}
function logVisitors(){
    $now=new DateTime();
    //$serverTimestamp = (new DateTime())->getTimestamp();
    //echo $serverTimestamp->format('U = Y-m-d H:i:s') . "\n";
    $today=$now->format('Y-m-d');
    $ip = $_SERVER["REMOTE_ADDR"];
    $quizid=$_GET["id"];
    $todayVizStr=$today.','.$ip.','.$quizid;
    
    $fileday=sys_get_temp_dir().'/quizDay'.$today.'.csv';
    //unlink($fileday);

    //echo '<br>fileday: '.$fileday.'<br>';
    if(file_exists($fileday)){
        $arr=explode(PHP_EOL,file_get_contents($fileday));
        //echo 'todayfile<br>';
        //var_dump($arr);
        if(in_array($todayVizStr,$arr)){
            //echo "<br>found ".$todayVizStr.'<br>';
            return;
        }
        else{
            //echo '<br> could not find '.$todayVizStr.'<br>';
        }
    }
    //echo '<br>lets log!<br>';
    file_put_contents($fileday, $todayVizStr.PHP_EOL , FILE_APPEND | LOCK_EX);
    file_put_contents('logs.txt', $todayVizStr.PHP_EOL , FILE_APPEND | LOCK_EX);
}


// get quizid
$quizid=$_GET["id"];
$quizid = preg_replace("/[^A-Za-z0-9]/", '', $quizid);

//quizfile
$quizfile=sys_get_temp_dir().'/quiz'.$quizid.'.csv';
$qmfile=sys_get_temp_dir().'/qm_'.$quizid.'.csv';
//$quizpubfile=sys_get_temp_dir().'/quiz'.$quizid.'pub.csv';

// jump requests
if(array_key_exists("q",$_GET)){
    // jump request
    $quizzer = $_GET["q"];
    $t = $_GET["t"];
    $txt=$t.','.$quizzer.'\n';
    file_put_contents($quizfile,$txt,FILE_APPEND);
    echo 'jump logged: '.$txt;
}
if(array_key_exists("p",$_GET)){
    // /poll request
    if(file_exists($quizfile)){
        $arr=getJump($quizfile);
        //echo $arr;
    }
    else{
        echo '{"jump":"none"}';
    }
}
if(array_key_exists("r",$_GET)){
    // quizmaster reset request
    $reset=$_GET["r"];
    if($reset=="1"){
        if(file_exists($quizfile)){
            unlink($quizfile);
            echo '{"msg":"reset"}';
            //echo 'quiz reset!';
        }
        else{
            echo '{"msg":"'.$quizfile.' not found.  Ready to quiz!"}';
            //echo "{'msg':'quiz ready!'}";
        }
    }
}
if(array_key_exists("qmstamp",$_GET)){
    // qm timestamp
    $ts=$_GET["qmstamp"];
    if($ts>0){
        if(file_exists($qmfile)){
            unlink($qmfile);
        }
        //$serverTimestamp = (new DateTime())->getTimestamp();
        file_put_contents($qmfile,$ts);
        echo '{"msg":"quizmaster timestamp logged"}';
    }
    else{
        if(file_exists($qmfile)){
            $dt=file_get_contents($qmfile);
            echo '{"time":'.$dt.'}';
        }
        else{
            echo '{"time":-1,"msg":"no file '.$qmfile.'"}';
        }
    }
}
//echo 'log visitors';
logVisitors();
//.date('Ymd');
/*
if(file_exists($qf)==FALSE){
    echo 'does not exist';
}
else{
    echo 'exists';
}
echo $qf;\*/
//echo 'quizzer: '.$q.' at time '.$t;

//$temp_file = tempnam(sys_get_temp_dir(), 'quiz');
//echo $temp_file;
//echo date('Ymd')

?>
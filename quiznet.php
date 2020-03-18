<?php

function cmpjump($a,$b){
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

    usort($arr,"cmpjump");
    $timeQuizzer=explode(',',$arr[0]);

    $ret=array('jump'=>$timeQuizzer[1],'benches'=>$arr);

    
    echo json_encode($ret);
}

// get quizid
$quizid=$_GET["d"];
$quizid = preg_replace("/[^A-Za-z0-9]/", '', $quizid);
//quizfile
$quizfile=sys_get_temp_dir().'/quiz'.$quizid.'.csv';

// jump requests
if(array_key_exists("q",$_GET)){
    // jump request
    $quizzer = $_GET["q"];
    $t = $_GET["t"];
    $txt=$t.','.$quizzer.'\n';
    file_put_contents($quizfile,$txt,FILE_APPEND);
    echo 'jump logged: '.$txt;
    //echo $quizfile;
    //echo $txt;
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
            //echo 'quiz reset!';
        }
        else{
            //echo "{'msg':'quiz ready!'}";
        }
    }
}

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
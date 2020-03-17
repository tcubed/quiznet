<?php

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

    // search for first jump
    
    $mint=-1;
    $minq='';
    foreach($arr as $line){
        //if(strlen($line)==0){break;}
        $row=explode(',',$line);
        if($mint<0){
            $mint=(int)$row[0];$minq=$row[1];
        }
        if($row[0]<$mint){$mint=$row[0];$minq=$row[1];}
    }
    $ret=array('jump'=>$minq,'benches'=>$arr);
    

    /*
    $arrsort=array();
    foreach($arr as $line){
        $row=explode(',',$line);
        $arrsort[$row[1]]=(int)$row[0];
    }
    asort($arrsort);
    $ret=array('jump'=>array_keys($arrsort)[0],'benches'=>$arrsort);
    */
    echo json_encode($ret);
}

// get district
$district=$_GET["d"];
//quizfile
$quizfile=sys_get_temp_dir().'/quiz'.$district.'.csv';

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
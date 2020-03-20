<?php
/*
header('Content-Type: application/json; charset=utf-8');
//$clientTime = $_GET["ct"] * 1; //for php 5.2.1 or up: (float)$_GET["ct"];
$clientTime = (float)$_GET["ct"]; //for php 5.2.1 or up: (float)$_GET["ct"];
//$serverTimestamp = round(microtime(true)*1000); // (new DateTime())->getTimestamp();
$serverTimestamp = (new DateTime())->getTimestamp();
$serverClientRequestDiffTime = $serverTimestamp - $clientTime;
echo "{\"diff\":$serverClientRequestDiffTime,\"serverTimestamp\":$serverTimestamp}";
*/
echo (string) round($_SERVER['REQUEST_TIME_FLOAT'] * 1000);
?>

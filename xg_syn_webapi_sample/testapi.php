<?php
//例ではbasic認証を使っていますが、アクセスキーを使った方法も可能です。
$sent = "楽しくて忘れてしまう";
$id = "ここにID";
$pw = "ここにパスワード";

$param = array("sent" => $sent, "mode" => "tw_mode");
$param = http_build_query($param,"","&");

$headers = array("User-Agent: php","Authorization: Basic ".base64_encode($id.":".$pw),"Content-Type: application/x-www-form-urlencoded","Content-Length: ".strlen($param));

$context = array(
     "http" => array(
          "method" => "POST",
          "header" => implode("\r\n",$headers),
          "content" => $param
     )
);
$context = stream_context_create($context);

$url = "https://lr.capio.jp/webapis/iminos/synana/1_1/";

$contents = file_get_contents($url,false,$context);

$json = json_decode($contents);
var_dump($json);

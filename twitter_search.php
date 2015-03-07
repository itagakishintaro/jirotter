<?php
	// twitter API関連
	if (!defined('TW_CONSUMER_KEY'))		{ define('TW_CONSUMER_KEY',		'1ec36w58t5gYXo15zI1idHwIi');}
	if (!defined('TW_CONSUMER_SECRET'))		{ define('TW_CONSUMER_SECRET',	'QtH9eukbhpSgFezKnThPIwPI8EjUdBZW9zhM1y461zRSepubM8');}
	if (!defined('ACCESS_TOKEN')) 			{ define('ACCESS_TOKEN',		''); }
	if (!defined('ACCESS_TOKEN_SECRET'))	{ define('ACCESS_TOKEN_SECRET',	''); }

	require_once('twitter/twitteroauth.php');
	$twObj	= new TwitterOAuth(TW_CONSUMER_KEY,TW_CONSUMER_SECRET,ACCESS_TOKEN,ACCESS_TOKEN_SECRET);
  $word = $_GET['kensaku'];

	//Twitterで検索するワード
	$search_word = array($word); // 3つまでOKだったはず
	// $search_word = array(htmlspecialchars($_GET['word'], ENT_QUOTES)); // 3つまでOKだったはず

		//API実行データ取得
		//現時点で100ツイートまでしか取得不可
		$json	= $twObj->OAuthRequest('https://api.twitter.com/1.1/search/tweets.json','GET',
									   array('q'=>$search_word,'count'=>'100','include_entities'=>'true')); //API 1.1で変更
		// $json = $twObj->OAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json', 'GET',
		// 							array('screen_name'=>'@sakanaction_bot', 'count'=>'200', 'exclude_replies'=>'true'));

		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json; charset=utf-8');
		print_r($json);

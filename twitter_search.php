<?php
	// twitter API関連
	if (!defined('TW_CONSUMER_KEY'))		{ define('TW_CONSUMER_KEY',		'jc21cRQFgr11BlIuW7O7Z9ju6');}
	if (!defined('TW_CONSUMER_SECRET'))		{ define('TW_CONSUMER_SECRET',	'o9WHRetR4MybhfDsklZ61SEw3jMB2BvTpNGkdsi1fnIvfeFg6d');}
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
									   array('q'=>$search_word,'count'=>'10','include_entities'=>'true')); //API 1.1で変更
		// $json = $twObj->OAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json', 'GET',
		// 							array('screen_name'=>'@sakanaction_bot', 'count'=>'200', 'exclude_replies'=>'true'));

		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json; charset=utf-8');
		print_r($json);

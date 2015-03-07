'use strict';

var shops = [
'三田本店',
'目黒店',
'仙川店',
'歌舞伎町店',
'品川店',
'新宿小滝橋通り店',
'環七新代田店',
'八王子野猿街道店２',
'池袋東口店',
'新小金井街道店',
'亀戸店',
'京急川崎店',
'府中店',
'松戸駅前店',
'めじろ台法政大学前店',
'荻窪店',
'上野毛店',
'京成大久保店',
'環七一之江店',
'相模大野店',
'横浜関内店',
'神田神保町店',
'小岩店',
'ひばりヶ丘駅前店',
'桜台駅前店',
'栃木街道店',
'立川店',
'大宮店',
'千住大橋駅前店',
'茨城守谷店',
'湘南藤沢店',
'西台駅前店',
'中山駅前店',
'新橋店',
'仙台店',
'赤羽店．',
'札幌店',
'会津若松駅前店',
'JR西口蒲田店' 
];

$.getJSON('http://localhost/jirotter/twitter_search.php?kensaku=ラーメン二郎', function(json) {
console.log(json.statuses);
var sorted = favoriteSort(json.statuses);
console.log(sorted);
});

function favoriteSort(items){
items.sort(function (a, b) {
  if (a.favorite_count < b.favorite_count) {
    return 1;
  }
  if (a.favorite_count > b.favorite_count) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

return items;
}

function iminos(text, favorite_count) {
    $.ajax({
        url: 'https://lr.capio.jp/webapis/iminos/synana_k/1_1/',
        dataType: 'jsonp',
        data: {
            'sent': text,
            'acckey': 'KjrdM5WYryQFcT2b'
        },
        success: function(json) {
console.log(json);
        	
        }
    });
}

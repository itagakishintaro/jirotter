'use strict';

var shops = [
    {name: '三田本店', rank: 0, tweets: null, spn: null},
    {name: '目黒店', rank: 0, tweets: null, spn: null},
    // {name: '仙川店', rank: 0, tweets: null, spn: null},
    // {name: '歌舞伎町店', rank: 0, tweets: null, spn: null},
    // {name: '品川店', rank: 0, tweets: null, spn: null},
    // {name: '新宿小滝橋通り店', rank: 0, tweets: null, spn: null},
    // {name: '環七新代田店', rank: 0, tweets: null, spn: null},
    // {name: '八王子野猿街道店２', rank: 0, tweets: null, spn: null},
    // {name: '池袋東口店', rank: 0, tweets: null, spn: null},
    // {name: '新小金井街道店', rank: 0, tweets: null, spn: null},
    // {name: '亀戸店', rank: 0, tweets: null, spn: null},
    // {name: '京急川崎店', rank: 0, tweets: null, spn: null},
    // {name: '府中店', rank: 0, tweets: null, spn: null},
    // {name: '松戸駅前店', rank: 0, tweets: null, spn: null},
    // {name: 'めじろ台法政大学前店', rank: 0, tweets: null, spn: null},
    // {name: '荻窪店', rank: 0, tweets: null, spn: null},
    // {name: '上野毛店', rank: 0, tweets: null, spn: null},
    // {name: '京成大久保店', rank: 0, tweets: null, spn: null},
    // {name: '環七一之江店', rank: 0, tweets: null, spn: null},
    // {name: '相模大野店', rank: 0, tweets: null, spn: null},
    // {name: '横浜関内店', rank: 0, tweets: null, spn: null},
    // {name: '神田神保町店', rank: 0, tweets: null, spn: null},
    // {name: '小岩店', rank: 0, tweets: null, spn: null},
    // {name: 'ひばりヶ丘駅前店', rank: 0, tweets: null, spn: null},
    // {name: '桜台駅前店', rank: 0, tweets: null, spn: null},
    // {name: '栃木街道店', rank: 0, tweets: null, spn: null},
    // {name: '立川店', rank: 0, tweets: null, spn: null},
    // {name: '大宮店', rank: 0, tweets: null, spn: null},
    // {name: '千住大橋駅前店', rank: 0, tweets: null, spn: null},
    // {name: '茨城守谷店', rank: 0, tweets: null, spn: null},
    // {name: '湘南藤沢店', rank: 0, tweets: null, spn: null},
    // {name: '西台駅前店', rank: 0, tweets: null, spn: null},
    // {name: '中山駅前店', rank: 0, tweets: null, spn: null},
    // {name: '新橋店', rank: 0, tweets: null, spn: null},
    // {name: '仙台店', rank: 0, tweets: null, spn: null},
    // {name: '赤羽店．', rank: 0, tweets: null, spn: null},
    // {name: '札幌店', rank: 0, tweets: null, spn: null},
    // {name: '会津若松駅前店', rank: 0, tweets: null, spn: null},
    {name: 'JR西口蒲田店', rank: 0, tweets: null, spn: null}
];

for(var i=0; i<shops.length; i++){
    $.ajaxSetup({ async: false });
    $.getJSON('http://localhost:8000/twitter_search.php?kensaku=' + shops[i].name, function(json) {
        shops[i].tweets = json.statuses;
        json.statuses.forEach(function(element, index){
            iminos(element.text, i, index);
        });
    });
}

setTimeout(function(){
    var sorted = favoriteSort(shops);
    console.log(sorted);


    $('#no1').text('１位　' + shops[0].name);
    $('.no1.positive').text('');
    shops[0].tweets.filter(function(element){
        return element.spn == 1;
    }).forEach(function(element){
        $('.no1.positive').append('<div>' + element.text + '</div>');
        $('.no1.positive').append('<hr>');
    });
    $('.no1.negative').text('');
    shops[0].tweets.filter(function(element){
        return element.spn == 2;
    }).forEach(function(element){
        $('.no1.negative').append('<div>' + element.text + '</div>');
        $('.no1.negative').append('<hr>');
    });

    $('#no2').text('２位　' + shops[1].name);
        $('.no2.positive').text('');
    shops[1].tweets.filter(function(element){
        return element.spn == 1;
    }).forEach(function(element){
        $('.no2.positive').append('<div>' + element.text + '</div>');
        $('.no2.positive').append('<hr>');
    });
    $('.no2.negative').text('');
    shops[0].tweets.filter(function(element){
        return element.spn == 2;
    }).forEach(function(element){
        $('.no2.negative').append('<div>' + element.text + '</div>');
        $('.no2.negative').append('<hr>');
    });

    $('#no3').text('３位　' + shops[2].name);
        $('.no3.positive').text('');
    shops[2].tweets.filter(function(element){
        return element.spn == 1;
    }).forEach(function(element){
        $('.no3.positive').append('<div>' + element.text + '</div>');
        $('.no3.positive').append('<hr>');
    });
    $('.no3.negative').text('');
    shops[0].tweets.filter(function(element){
        return element.spn == 2;
    }).forEach(function(element){
        $('.no3.negative').append('<div>' + element.text + '</div>');
        $('.no3.negative').append('<hr>');
    });


}, 3000);




function favoriteSort(items){
    items.sort(function (a, b) {
      if (a.rank < b.rank) {
        return 1;
      }
      if (a.rank > b.rank) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    return items;
}

function iminos(text, i, index) {
    $.ajaxSetup({ async: false });
    $.ajax({
        url: 'https://lr.capio.jp/webapis/iminos/synana_k/1_1/',
        async: false,
        dataType: 'jsonp',
        data: {
            'sent': text,
            'acckey': 'KjrdM5WYryQFcT2b'
        },
        success: function(json) {
            shops[i].tweets[index].spn = json.results[0].spn;
            if(json.results[0].spn == 1){
                shops[i].rank++;
            }
        }
    });
}

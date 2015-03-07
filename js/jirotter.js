'use strict';

var FONT_SIZE = 16;
var circle_data = [];
var text_data = [];

// svgタグを生成
var svg = d3.select('#d3')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

$.getJSON('http://localhost:8080/twitter_search.php', function(json) {
    json.statuses.forEach(function(element) {
        iminos(element.text, element.favorite_count);
    });
});

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
        	var x = ($('#d3').width() - 100) * Math.random() + 50;
        	var y = ($('#d3').height() - 100) * Math.random() + 50;
        	var hinshi = json.results[0].morphemes.filter(function(element){
				return element.hinshi !== 'その他';
			});
			var size = hinshi.length;

        	// draw circle
        	circle_data.push( { text: text, spn: json.results[0].spn, x: x, y: y, r: (1 + favorite_count) * 10 } );
        	drawCircle(circle_data);

        	// draw text
			hinshi.forEach(function(element, index){
				// text_data.push( { text: element.shuushi, x: x, y: y - size * FONT_SIZE / 2 + (index + 1) * FONT_SIZE } );
				var pm = index % 2 === 0 ? -1 : 1;
				text_data.push( { text: element.shuushi, x: x + pm * Math.random() * 50, y: y + pm * Math.random() * 50 } );
			});
        	// drawText(text_data);
        }
    });
}

function drawCircle(data) {
    svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y
        })
        .attr('r', function(d) {
            return d.r;
        })
        .attr('fill', function(d) {
            if (d.spn === '0') {
                return '#ecf0f1';
            } else if (d.spn === '1') {
                return '#ecf0f1';
            } else if (d.spn === '2') {
                return '#73B6D9'
            } else if (d.spn === '3') {
                return '#FFE620';
            } else if (d.spn === '4') {
                return '#00AD8E';
            } else {
                return 'white';
            }
        })
        .on('click', function(d) {
            alert(d.text);
        });
}

function drawText(data){
	var color = 'rgb(' + String(Math.round(Math.random() * 255)) + ',' + String(Math.round(Math.random() * 255)) + ',' + String(Math.round(Math.random() * 255)) + ')';
    svg.selectAll('text')
        .data(data.concat(data))
        .enter().append('text')
        .style('font-size', FONT_SIZE + 'px')
        .attr('fill', color)
        .attr('class', 'wrap')
        .attr('x', function(d) {
        	return d.x
        })
        .attr('y', function(d) {
        	return d.y;
        })
        .text(function(d) {
        	return d.text;
        })
        .attr({
            'dominant-baseline': 'middle'
        });
}

function setColor(d){
	if (d.spn === '0') {
        return '#ecf0f1';
    } else if (d.spn === '1') {
        return '#ecf0f1';
    } else if (d.spn === '2') {
        return '#103D7C'
    } else if (d.spn === '3') {
        return '#FFE620';
    } else if (d.spn === '4') {
        return '#00AD8E';
    } else {
        return 'white';
    }
}
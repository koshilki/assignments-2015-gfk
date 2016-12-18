/* global document, XMLHttpRequest */
'use strict';

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;
var MARGIN = 50;
var GRID_STEP = 20;

var svgUtils = {

    createElement: function(type, attributes, content){
        var NS = "http://www.w3.org/2000/svg";
        var el = document.createElementNS(NS, type);
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                el.setAttribute(attr, attributes[attr]);
            }
        }
        if (content) {
            el.innerHTML = content;
        }
        return el;
    },

    createSVG: function createSVG (w, h) {
        return this.createElement('svg', {
            width: w,
            height: h
        });
    },

    createPolyline: function createPolyline (points, cls){
        return this.createElement('polyline', {
            points: points,
            class: cls
        });
    },

    createCircle: function createCircle (x, y, radius, cls){
        return this.createElement('circle', {
            cx: x,
            cy: y,
            r: radius,
            class: cls
        });
    },

    createLine: function createLine (sx, sy, ex, ey, cls){
        return this.createElement('line', {
            x1: sx,
            x2: ex,
            y1: sy,
            y2: ey,
            class: cls
        });
    },

    createText: function createText (x, y, value, cls, transform){
        return this.createElement('text', {
            x: x,
            y: y,
            class: cls,
            transform: transform || ''
        }, value);
    }
};

var parseResponse = function parseResponse (callback) {
    return function () {
        var data = {
            dates: [],
            values: []
        },
        tmpData = {};
        var response = this.responseText;
        var lines = response.split(/\r\n/);
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i].split(';');
            if (line[0]) {
                tmpData[line[0]] = tmpData[line[0]] || [];
                tmpData[line[0]].push(line[2]);
            }
        }

        for (var date in tmpData) {
            data.dates.push(date);
            var percentage = tmpData[date].filter(function(el){return el === 'yes';}).length / tmpData[date].length * 100;
            data.values.push(percentage);
        }
        callback(data);
    };
};

var fetchData = function fetchData (uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", parseResponse(callback));
    xhr.open("GET", uri);
    xhr.send();
};

var createGrid = function createGrid (el, xStep, yStep, dates) {
    // horizontal lines
    for (var p = 0; p <= 100; p+= GRID_STEP) {
        el.appendChild(svgUtils.createLine(MARGIN, CANVAS_HEIGHT - MARGIN - p * yStep, CANVAS_WIDTH + MARGIN, CANVAS_HEIGHT - MARGIN - p * yStep, 'grid'));
        el.appendChild(svgUtils.createText(20, CANVAS_HEIGHT - MARGIN - p * yStep + 3, p, 'grid'));
    }

    // date labels
    for (var i = 0; i < dates.length; i++) {
        el.appendChild(svgUtils.createText(MARGIN + i * xStep - 20, CANVAS_HEIGHT - (i%2 ? 0 : 20), dates[i], 'grid'));
    }

    // chart keys
    el.appendChild(svgUtils.createText(-(CANVAS_HEIGHT + MARGIN) / 2, 10, 'Percentage', 'grid', 'rotate(-90)'));
    el.appendChild(svgUtils.createLine(CANVAS_WIDTH + MARGIN * 2 - 30, CANVAS_HEIGHT / 2, CANVAS_WIDTH + MARGIN * 2 - 10, CANVAS_HEIGHT / 2, 'chart'));
    el.appendChild(svgUtils.createCircle(CANVAS_WIDTH + MARGIN * 2 - 20, CANVAS_HEIGHT / 2, 5, 'chart'));
    el.appendChild(svgUtils.createText(CANVAS_WIDTH + MARGIN * 2 - 28, CANVAS_HEIGHT / 2 + 20, 'Yes', 'grid'));
};

var createLine = function createLine (el, xStep, yStep, values) {
    var points = [];
    for (var i = 0; i < values.length; i++) {
        var coords = [MARGIN + i * xStep, CANVAS_HEIGHT - MARGIN - values[i] * yStep];
        points.push(coords.join(','));
        el.appendChild(svgUtils.createCircle(coords[0], coords[1], 5, 'chart'));
    }
    var polyline = svgUtils.createPolyline(points.join(' '), 'chart');
    el.appendChild(polyline);
};

var drawChart = function(dataURI) {
    var svg = svgUtils.createElement('svg', {
        width: CANVAS_WIDTH + MARGIN * 2,
        height: CANVAS_HEIGHT + MARGIN * 2
    });
    document.body.appendChild(svg);

    fetchData(dataURI, function(data) {
        var xStep = Math.floor(CANVAS_WIDTH / data.dates.length);
        var yStep = Math.floor((CANVAS_HEIGHT - MARGIN) / 100);

        createGrid(svg, xStep, yStep, data.dates);
        createLine(svg, xStep, yStep, data.values);
    });
};

/*eslint-disable */

// create dataset
var data = [];
var names = ["Watch", "Fork", "Subscribed", "Comment", "Issue", "Pull_request"];
var endTime = Date.now();
var month = 30 * 24 * 60 * 60 * 1000;
var startTime = endTime - 6 * month;

function createEvent (name, maxNbEvents) {
    maxNbEvents = maxNbEvents | 200;
    var event = {
        name: name,
        data: []
    };
    // add up to 200 events
    var max =  Math.floor(Math.random() * maxNbEvents);
    for (var j = 0; j < max; j++) {
        var time = (Math.random() * (endTime - startTime)) + startTime;
        event.data.push(new Date(time));
    }

    return event;
}
for (var i = 0; i < 6; i++) {
    data.push(createEvent(names[i]));
}

var color = d3.scale.category20();

// create chart function
var eventDropsChart = d3.chart.eventDrops()
    .eventLineColor(function (datum, index) {
        return color(index);
    })
    .start(new Date(startTime))
    .end(new Date(endTime));

// bind data with DOM
var element = d3.select('#eventdrops-demo').datum(data);

// draw the chart
eventDropsChart(element);

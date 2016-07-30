/*generate-behavior-map*/

function getProjectDeveloper()
{
    var project = document.getElementsByName("project");
    var developer = document.getElementsByName("developer");
    createPie(project[0].value,developer[0].value);
    d3.csv("./behavior_data/project_developer.csv",function(error,csv){
        if (error) throw error;
        csv.forEach(function(x){
           if ((project[0].value==x.project)&(developer[0].value==x.developer))
           {
                //alert(x.id);
                createMap(x.id);
           }
        });
    });
}


function createEvent (name,fileID) {
    var event = {
        name: name,
        data: []
    };

    d3.csv("./behavior_data/"+fileID+".csv",function(error,csv){
        if (error) throw error;
        csv.forEach(function(x){
            var time = x.time;
            if (name==x.action) event.data.push(new Date(time));
        });
    });
    return event;
}

function createMap (fileID) {
    var data = [];
    var names = ["watch", "fork", "subscribed", "comment", "issue", "pull_request"];
    var endTime = "2018-12-01 00:00:00"//Date.now();
    var month = 30 * 24 * 60 * 60 * 1000;
    var startTime = "2008-01-01 00:00:00"//endTime - 108 * month;

    for (var i = 0; i < 6; i++) {
        data.push(createEvent(names[i],fileID));
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
    var element = d3.select('#behavior_map').datum(data);

    // draw the chart
    eventDropsChart(element);
}

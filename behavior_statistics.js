/*behavior statistics*/

function type(d) {
  d.count = +d.count;
  return d;
}

function createPie(project,developer)
{
    document.getElementById("behavior_statistics").innerHTML="";
var width = 500,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#6b486b", "#a05d56", "#d0743c"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });

d3.csv("./behavior_data/project_developer.csv", function(error, data) {
    if (error) throw error;
    var results = [];
    data.forEach(function(x){
        if ((project==x.project)&(developer==x.developer))
           {
                results.push({action:"subscribed",count:x.s_c});
                results.push({action:"comment",count:x.c_c});
                results.push({action:"issue",count:x.i_c});
                results.push({action:"pull_request",count:x.p_c});
                console.log(x)
                var information = "<div><strong>developer: </strong>"+project+"/"+developer+
                    "</div><div><strong>type: </strong>"+x.d_type+"</div>"+
                    "<div><strong>watch: </strong>"+x.w_c+"</div>"+
                    "<div><strong>fork: </strong>"+x.f_c+"</div>"+
                    "<div><strong>subscribed: </strong>"+x.s_c+"</div>"+
                    "<div><strong>comment: </strong>"+x.c_c+"</div>"+
                    "<div><strong>issue: </strong>"+x.i_c+"</div>"+
                    "<div><strong>pull_request: </strong>"+x.p_c+"</div>";
                document.getElementById("basic").innerHTML = information;
           }
    });

    var svg = d3.select("#behavior_statistics").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2+ "," + height/2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(results))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.action); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".45em")
        .text(function(d) { return d.data.action; });
    
});
}



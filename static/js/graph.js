queue()
    .defer(d3.csv, "data/assessment2.csv")
    .await(makeGraphs);

function makeGraphs(error, test) {
    var ndx = crossfilter(test)

    classData(ndx);

    dc.renderAll();
}

function classData(ndx) {
    var dim = ndx.dimension(dc.pluck('standard'));
    console.log("data")
    console.log(dim)
    var group = dim.group();

    dc.barChart("#class1")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("age")
        .yAxis().ticks(20);
}
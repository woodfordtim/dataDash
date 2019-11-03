queue()
    .defer(d3.csv, "data/assessment3.csv")
    .await(makeGraphs);

function makeGraphs(error, schoolData) {
    var ndx = crossfilter(schoolData);

    cohortSelector(ndx);
    readingGraph(ndx);
    writingGraph(ndx);
    mathematicsGraph(ndx);
    testGraph(ndx);

    dc.renderAll();
}

function cohortSelector(ndx) {
    dim = ndx.dimension(dc.pluck("Cohort"));
    group = dim.group();

    dc.selectMenu("#cohortSelector")
    .dimension(dim)
    .group(group);
}

function readingGraph(ndx) {
    var dim = ndx.dimension(dc.pluck('Reading'));
    var group = dim.group();

    dc.barChart("#reading")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("standard")
        .yAxis().ticks(5);
}

function writingGraph(ndx) {
    var dim = ndx.dimension(dc.pluck('Writing'));
    var group = dim.group();

    dc.barChart("#writing")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("standard")
        .yAxis().ticks(5);
}

function mathematicsGraph(ndx) {
    var dim = ndx.dimension(dc.pluck('Mathematics'));
    var group = dim.group();

    dc.barChart("#maths")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("standard")
        .yAxis().ticks(5);
}

function testGraph(ndx) {
    var mathsDimension = ndx.dimension(dc.pluck('Mathematics'));
    var standard_achieved = mathsDimension.group();

    dc.pieChart("#testGraph")
        .width(450)
        .height(300)
        .slicesCap(4)
        .innerRadius(50)
        .dimension(mathsDimension)
        .group(standard_achieved)
        .legend(dc.legend())
}
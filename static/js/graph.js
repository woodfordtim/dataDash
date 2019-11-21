queue()
    .defer(d3.csv, "data/assessment5.csv")
    .await(makeGraphs);

function makeGraphs(error, schoolData) {
    var ndx = crossfilter(schoolData);

    subjectSelector1(ndx);
    subjectSelector2(ndx);
    readingGraph(ndx);
    writingGraph(ndx);
    mathematicsGraph(ndx);
    testGraph(ndx);
    contextGender(ndx);
    contextPupilPremium(ndx);
    contextSEND(ndx);

    dc.renderAll();
}

function subjectSelector1(ndx) {
    dim = ndx.dimension(dc.pluck("Cohort"));
    group = dim.group();

    dc.selectMenu("#subjectSelector1")
        .dimension(dim)
        .group(group); 
} 

function subjectSelector2(ndx) {
    dim = ndx.dimension(dc.pluck("Cohort"));
    group = dim.group();

    dc.selectMenu("#subjectSelector2")
        .dimension(dim)
        .group(group); 
} 

function readingGraph(ndx) {
    var dim = ndx.dimension(dc.pluck('Reading'));
    var group = dim.group();


    /*how do i get a selectMenu to target this chart??
        dc.selectMenu("#subjectSelector2")
        .dimension(dim)
        .group(group); */

    dc.barChart("#reading")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
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
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
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
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Standard")
        .yAxis().ticks(5);
}

function testGraph(ndx) {
    var readingDimension = ndx.dimension(dc.pluck("Reading"));
    var standard_achieved_Skipper = readingDimension.group().reduceSum(function (d) {
        if (d.Cohort === 'Skipper') {
            return +d.Reading;
        } else {
            return 0;
        }
    });

    dc.pieChart("#testGraph")
        .width(450)
        .height(300)
        .innerRadius(50)
        .dimension(readingDimension)
        .group(standard_achieved_Skipper)
        .legend(dc.legend())
}

function testGraph2(ndx) {
    var readingDimension = ndx.dimension(dc.pluck("Reading"));
    var standard_achieved_Admiral = readingDimension.group().reduce(

        // Add a Fact
        function(p, v) {
            p.count++;
            p.total += v.Reading;
            p.average = p.total / p.count;
            return p;
        },
        // Remove a Fact
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.spend;
                p.average = p.total / p.count;
            }
            return p;
        },
        // Initialise the Reducer
        function () {
            return { count: 0, total: 0, average: 0 };
        }
            
            
            );

    dc.pieChart("#testGraph2")
        .width(450)
        .height(300)
        .innerRadius(50)
        .dimension(readingDimension)
        .group(standard_achieved_Skipper)
        .legend(dc.legend())
    }

function contextGender(ndx) {
    var genderDimension = ndx.dimension(dc.pluck('Gender'));
    var genderComparison = genderDimension.group();

    dc.pieChart("#gender")
        .height(200)
        .radius(90)
        .innerRadius(30)
        .dimension(genderDimension)
        .group(genderComparison)
        .legend(dc.legend())
}

function contextPupilPremium(ndx) {
    var pupilPremiumDimension = ndx.dimension(dc.pluck('Pupil Premium'));
    var pupilPremiumComparison = pupilPremiumDimension.group();

    dc.pieChart("#pupilPremium")
        .width(450)
        .height(300)
        .slicesCap(4)
        .innerRadius(50)
        .dimension(pupilPremiumDimension)
        .group(pupilPremiumComparison)
        .legend(dc.legend())
}

function contextSEND(ndx) {
    var sendDimension = ndx.dimension(dc.pluck('SEND'));
    var sendComparison = sendDimension.group();

    dc.pieChart("#SEND")
        .width(450)
        .height(300)
        .slicesCap(4)
        .innerRadius(50)
        .dimension(sendDimension)
        .group(sendComparison)
        .legend(dc.legend())
}
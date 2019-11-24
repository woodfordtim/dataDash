queue()
    .defer(d3.csv, "data/assessment11.csv")
    .await(makeGraphs);

function makeGraphs(error, schoolData) {
    var ndx = crossfilter(schoolData);

    //selectors
    subjectSelector1(ndx);
    subjectSelector2(ndx);

    //context graphs
    contextGender(ndx);
    contextPupilPremium(ndx);
    contextSEND(ndx);
    contextEAL(ndx);

    //subject graphs
    readingGraph(ndx);
    writingGraph(ndx);
    mathsGraph(ndx);

    //cohort graphs
    skipperGraph(ndx);

    //average graphs
    readingAverageGraph(ndx);
    writingAverageGraph(ndx);

    dc.renderAll();
}

//selectors
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

//context graphs
function contextGender(ndx) {
    var genderDimension = ndx.dimension(dc.pluck('Gender'));
    var genderComparison = genderDimension.group();

    dc.pieChart("#gender")
        .height(300)
        .radius(90)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(genderDimension)
        .group(genderComparison)
        .renderLabel(true)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["red", "#006400"]))
}

function contextPupilPremium(ndx) {
    var pupilPremiumDimension = ndx.dimension(dc.pluck('Pupil Premium'));
    var pupilPremiumComparison = pupilPremiumDimension.group();

    dc.pieChart("#pupilPremium")
        .height(300)
        .radius(90)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(pupilPremiumDimension)
        .group(pupilPremiumComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

function contextSEND(ndx) {
    var sendDimension = ndx.dimension(dc.pluck('SEND'));
    var sendComparison = sendDimension.group();

    dc.pieChart("#SEND")
        .height(300)
        .radius(90)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(sendDimension)
        .group(sendComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

function contextEAL(ndx) {
    var ealDimension = ndx.dimension(dc.pluck('EAL'));
    var ealComparison = ealDimension.group();

    dc.pieChart("#EAL")
        .height(300)
        .radius(90)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(ealDimension)
        .group(ealComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

//subject graphs
function readingGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Reading'));
    var group = readingDim.group();

    dc.pieChart('#readingGraph')
        .height(400)
        .radius(150)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(readingDim)
        .group(group)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

function writingGraph(ndx) {
    var writingDim = ndx.dimension(dc.pluck('Writing'));
    var writingComparison = writingDim.group();

    dc.pieChart("#writingGraph")
        .height(400)
        .radius(150)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(writingDim)
        .group(writingComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

function mathsGraph(ndx) {
    var mathematicsDim = ndx.dimension(dc.pluck('Mathematics'));
    var group = mathematicsDim.group();

    dc.pieChart("#mathsGraph")
        .height(400)
        .radius(150)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(mathematicsDim)
        .group(group)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
}

//cohort graphs 

//This section is supposed to show each cohort so that comparisons can be made between cohorts. This helps 
//to identify which cohort is doing better or worse than others. The way my current dashboard is set up only
//allows me to see one cohort at a time- which is ok- but was also hoping for the former but have had trouble
//trying to code this out!

// why does this graph not return any 0s from Skipper 'Reading' data? Something is wrong with this code block
function skipperGraph(ndx) {
    var readingDimension = ndx.dimension(dc.pluck("Reading"));
    var standard_achieved_Skipper = readingDimension.group().reduceSum(function (d) {
        if (d.Cohort === 'Skipper') {
            return +d.Reading;
        } else {
            return 0;
        }
    });

    //how do I check code with a console.log?
    //console.log(skipperGraph);

    /*dc.pieChart("#skipperGraph")
        .height(300)
        .radius(90)
        .innerRadius(30)
        .transitionDuration(1500)
        .dimension(readingDimension)
        .group(standard_achieved_Skipper)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; }) */
}

//average graphs 
function readingAverageGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Cohort'));
    var group = readingDim.group().reduce(

        //Add a fact
        function (p, v) {
            p.count++;
            p.total += v.Reading;
            p.average = p.total / p.count;
            return p;
        },

        //What is a remover? And why is it needed??
        //Remove a Fact
        function (p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Reading;
                p.average = p.total / p.count;
            }
            return p;
        },

        //Initialise the reducer
        function () {
            return {count: 0, total: 0, average: 0};
        }
    );

    //console.log(readingAverageGraph());
  
    dc.barChart("#readingAverageGraph")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 60, bottom: 30, left: 60 })
        .dimension(readingDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Cohort")
        .yAxis().ticks(5); 
}

function writingAverageGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Cohort'));
    var group = readingDim.group().reduceSum(dc.pluck('Writing'));

    dc.barChart("#writingAverageGraph")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 60, bottom: 30, left: 60 })
        .dimension(readingDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Cohort")
        .yAxis().ticks(5); 
}
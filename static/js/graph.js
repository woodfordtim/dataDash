queue()
    .defer(d3.csv, "data/assessment13.csv")
    .await(makeGraphs);

// parse data to change it to integers. Now structure more efficiently (supported by mentor)
function makeGraphs(error, schoolData) {
    var ndx = crossfilter(schoolData);

    schoolData.forEach(function(d){
        d.Reading = parseInt(d.Reading)
        d.Writing = parseInt(d.Writing)
        d.Mathematics = parseInt(d.Mathematics)
    })

    //selector - this calls the funtion for my cohort selector dropdown menu
    subjectSelector1(ndx);

    //context graphs - these call the functions for my 3 contect pie charts
    contextGender(ndx);
    contextPupilPremium(ndx);
    contextSEND(ndx);

    //subject graphs - these call the functions for my 3 subject charts
    readingGraph(ndx);
    writingGraph(ndx);
    mathsGraph(ndx);

    //average graphs - these call the functions for my 3 average charts
    readingAverageGraph(ndx);
    writingAverageGraph(ndx);
    mathsAverageGraph(ndx);

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

//CONTEXT CHARTS
//context chart for gender
function contextGender(ndx) {
    var genderDimension = ndx.dimension(dc.pluck('Gender'));
    var genderComparison = genderDimension.group();

    dc.pieChart("#gender")
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(genderDimension)
        .group(genderComparison)
        .renderLabel(true)
        .renderTitle(true)
        .legend(dc.legend())
        .title(function() {
            return 'test';
        })
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0"]))
}
//context pie chart for 'Pupil Premium'
function contextPupilPremium(ndx) {
    var pupilPremiumDimension = ndx.dimension(dc.pluck('Pupil Premium'));
    var pupilPremiumComparison = pupilPremiumDimension.group();

    dc.pieChart("#pupilPremium")
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(pupilPremiumDimension)
        .group(pupilPremiumComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F"]))
}

//context pie chart for students with special educational needs (SEND)
function contextSEND(ndx) {
    var sendDimension = ndx.dimension(dc.pluck('SEND'));
    var sendComparison = sendDimension.group();

    dc.pieChart("#SEND")
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(sendDimension)
        .group(sendComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F"]))
}

//SUBJECT CHARTS
//reading subject chart
function readingGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Reading'));
    var group = readingDim.group();

    dc.pieChart('#readingGraph')
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(readingDim)
        .group(group)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F", "#FF5757"]))
}

//writing subject chart
function writingGraph(ndx) {
    var writingDim = ndx.dimension(dc.pluck('Writing'));
    var writingComparison = writingDim.group();

    dc.pieChart("#writingGraph")
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(writingDim)
        .group(writingComparison)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F", "#FF5757"]))
}

//mathematics subject chart
function mathsGraph(ndx) {
    var mathematicsDim = ndx.dimension(dc.pluck('Mathematics'));
    var group = mathematicsDim.group();

    dc.pieChart("#mathsGraph")
        .height(250)
        .radius(90)
        .innerRadius(0)
        .transitionDuration(1500)
        .dimension(mathematicsDim)
        .group(group)
        .legend(dc.legend())
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F", "#FF5757"])) 
}

//AVERAGE CHARTS
//reading average chart
function readingAverageGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Cohort'));

        //Add a fact
        function add_item (p, v) {
            p.count++;
            p.total += v.Reading;
            p.average = p.total / p.count;
            return p;
        }

        //Remove a Fact
        function remove_item (p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Reading;
                p.average = p.total / p.count;
            }
            return p;
        }

        //Initialise the reducer
        function initialise () {
            return {count: 0, total: 0, average: 0};
        }

    var averageReading = readingDim.group().reduce(add_item, remove_item, initialise);
  
    dc.barChart("#readingAverageGraph")
        .height(250)
        .margins({ top: 10, right: 60, bottom: 40, left: 60 })
        .dimension(readingDim)
        .group(averageReading)
        .valueAccessor(function(p){
            return p.value.average.toFixed(1);
        })
        .transitionDuration(1500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Cohort")
        .colors(d3.scale.ordinal().range(["#80CCC0", "#E7983F", "#FF5757"]))
        .yAxis().ticks(10);
}

//writing average chart
function writingAverageGraph(ndx) {
    var writingDim = ndx.dimension(dc.pluck('Cohort'));

//Add a fact
        function add_item (p, v) {
            p.count++;
            p.total += v.Writing;
            p.average = p.total / p.count;
            return p;
        }

        //Remove a Fact
        function remove_item (p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Writing;
                p.average = p.total / p.count;
            }
            return p;
        }

        //Initialise the reducer
        function initialise () {
            return {count: 0, total: 0, average: 0};
        }

    var averageWriting = writingDim.group().reduce(add_item, remove_item, initialise);
  
    dc.barChart("#writingAverageGraph")
        .height(250)
        .margins({ top: 10, right: 60, bottom: 40, left: 60 })
        .dimension(writingDim)
        .group(averageWriting)
        .valueAccessor(function(p){
            return p.value.average.toFixed(1);
        })
        .transitionDuration(1500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Cohort")
        .colors(d3.scale.ordinal().range(["#E7983F"]))
        .yAxis().ticks(10); 
}

//mathematics average chart
function mathsAverageGraph(ndx) {
    var mathsDim = ndx.dimension(dc.pluck('Cohort'));

//Add a fact
        function add_item (p, v) {
            p.count++;
            p.total += v.Mathematics;
            p.average = p.total / p.count;
            return p;
        }

        //Remove a Fact
        function remove_item (p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Mathematics;
                p.average = p.total / p.count;
            }
            return p;
        }

        //Initialise the reducer
        function initialise () {
            return {count: 0, total: 0, average: 0};
        }

    var averageMaths = mathsDim.group().reduce(add_item, remove_item, initialise);

     dc.barChart("#mathsAverageGraph")
        .height(250)
        .margins({ top: 10, right: 60, bottom: 40, left: 60 })
        .dimension(mathsDim)
        .group(averageMaths)
        .valueAccessor(function(p){
            return p.value.average.toFixed(1);
        })
        .transitionDuration(1500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Cohort")
        .colors(d3.scale.ordinal().range(["#FF5757"]))
        .yAxis().ticks(10); 
}

//JQuery - to make the charts responsive- when the window size changes the charts redraw
//Supported by Tutor Support 
$( window ).resize(function() {
        dc.renderAll();
})
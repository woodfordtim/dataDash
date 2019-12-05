queue()
    .defer(d3.csv, "data/assessment13.csv")
    .await(makeGraphs);

// parse data to change it to integers. Is there a more efficient method?
function makeGraphs(error, schoolData) {
    var ndx = crossfilter(schoolData);

    schoolData.forEach(function(d){
        d.Reading = parseInt(d.Reading)
    }),

    schoolData.forEach(function(d){
        d.Writing = parseInt(d.Writing)
    }),

    schoolData.forEach(function(d){
        d.Mathematics = parseInt(d.Mathematics)
    })

    //selectors
    subjectSelector1(ndx);

    //context graphs
    contextGender(ndx);
    contextPupilPremium(ndx);
    contextSEND(ndx);

    //subject graphs
    readingGraph(ndx);
    writingGraph(ndx);
    mathsGraph(ndx);

    //cohort graphs
    //skipperGraph(ndx);

    //average graphs
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

//context graphs
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
        //.legend(dc.legend().itemHeight(20).gap(5).x(0).y(0))
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F"]))
}

//subject graphs
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
        //.legend(dc.legend().itemHeight(20).gap(5).x(10).y(60))
        .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; })
        .colors(d3.scale.ordinal().range(["#3B759A", "#80CCC0", "#E7983F", "#FF5757"]))
}

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

//cohort graphs 

//This section is supposed to show each cohort so that comparisons can be made between cohorts. This helps 
//to identify which cohort is doing better or worse than others. The way my current dashboard is set up only
//allows me to see one cohort at a time- which is ok- but was also hoping for the former but have had trouble
//trying to code this out!

// why does this graph not return any 0s from Skipper 'Reading' data? Something is wrong with this code block
// function skipperGraph(ndx) {
//     var readingDimension = ndx.dimension(dc.pluck("Reading"));
//     var standard_achieved_Skipper = readingDimension.group().reduceSum(function (d) {
//         if (d.Cohort === 'Skipper') {
//             return +d.Reading;
//         } else {
//             return 0;
//         }
//     });

    //how do I check code with a console.log?
    //console.log(skipperGraph);

//     dc.pieChart("#skipperGraph")
//         .height(300)
//         .radius(90)
//         .innerRadius(30)
//         .transitionDuration(1500)
//         .dimension(readingDimension)
//         .group(standard_achieved_Skipper)
//         .legend(dc.legend())
//         .label(function(d){  return d.value + " (" +(d.value / ndx.groupAll().reduceCount().value() * 100).toFixed(0) + "%)"; }) 
// }

//average graphs 
function readingAverageGraph(ndx) {
    var readingDim = ndx.dimension(dc.pluck('Cohort'));

        //Add a fact
        function add_item (p, v) {
            p.count++;
            p.total += v.Reading;
            p.average = p.total / p.count;
            return p;
        }

        //What is a remover? And why is it needed??
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

    //console.log(readingAverageGraph());
  
    dc.barChart("#readingAverageGraph")
        //.width(350)
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
        //.width(350)
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

function mathsAverageGraph(ndx) {
    var xwidth = "Get the width here"
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
        //.width(350)
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

// $( window ).resize(function() {
//   $( "#gender" ).resize( "<div>Handler for .resize() called.</div>" );

// $(document).ready(function() {
//     $( window ).resize(function() {
//         document.getElementById("mathsAverageGraph").setAttribute("width", "150px");
//     });
// });

// If this is the approach, we can do this! :)



$( window ).resize(function() {
        dc.renderAll();
})




// var xWidth = document.getElementById('mathsAverageGraph').offsetWidth;
//   chart.width(xWidth)
//     .transitionDuration(0);
//   pie.transitionDuration(0);
//   dc.renderAll();
//   chart.transitionDuration(750);
//   pie.transitionDuration(750);
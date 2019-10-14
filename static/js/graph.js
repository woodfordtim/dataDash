queue()
    .defer(d3.csv, "data/assessment.csv")
    .await(makeGraphs);

function makeGraphs(errors, assessmentData) {

}

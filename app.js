// Use the D3 library to read in samples.json.
//Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

d3.json("samples.json").then((data) => {
    console.log(data);
    var samples = data.samples;
})
// Use sample_values as the values for the bar chart
function charts(charts){
    var output = samples.filter(result => results.id == charts);
    var outcome = output[0];

    var sample_values = outcome.sample_values;
    var otu_ids = outcome.otu_ids;
    var otu_labels = outcome.otu_labels;

    var yaxis = otu_ids.slice(0, 10).map(OID => 'OTU ${OID}').reverse();
    var boutputs = [
        {
            y: yaxis,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "v",
    }
    ];
    var params = {
        title: "Craziest Bacteria found",
        margin: {t: 30, l: 150}
    };
    Plotly.newPlot("bar", boutputs, params);
}






//Initialize
//Tell the function where to find the dropdown information
function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var Samp_ID = data.names;
        Samp_ID.forEach((sample) => {
            selector.append("option").text(sample).property("value");
        });
        buildPlot(Samp_ID[0]);
        console.log(data);
        buildDemographic(data.metadata, + Samp_ID[0]);
    
    });

}
init();
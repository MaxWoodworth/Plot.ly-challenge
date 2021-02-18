// Use the D3 library to read in samples.json.
//Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
function metadata(meta) {
    d3.json("samples.json").then((data) => {
        console.log(data);
        //get data for samples and metadata
        //var samples = data.samples;
        var metadata = data.metadata
        //filter metadata by ID
        var output = metadata.filter(results => results.id == meta);
        //create an initial output to default the first option
        var initialoutput = output[0];
        //from the html, we are told to find the panel w/ id #sample-metadata
        var PANEL = d3.select("#sample-metadata");
        //Clear existing outputs. Something I became very aware of during project 2 and still managed to forget.
        PANEL.html("");
        Object.entries(initialoutput).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
        
    });
    
}

// Use sample_values as the values for the bar chart
function charts(meta){
    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var output = samples.filter(results => results.id == meta);
        var outcome = output[0];

        var sample_values = outcome.sample_values;
        var otu_ids = outcome.otu_ids;
        var otu_labels = outcome.otu_labels;

    var yaxis = otu_ids.slice(0, 10).map(OID => `OTU ${OID}`).reverse();
    var boutputs = [
        {
            y: yaxis,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
    }
    ];
    var params = {
        title: "Craziest Bacteria found",
        margin: {t: 30, l: 150}
    };
        Plotly.newPlot("bar", boutputs, params);

    //build bubble chart
    var bubble = {
        title: "Bacteria Cultures vs Sample",
        margin: { t: 0},
        hovermode: "closest",
        xaxis: { title: "OTU_ID"},
        margin: {t: 30}
    };
    var bubbleinfo = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
    ];
    Plotly.newPlot("bubble", bubbleinfo, bubble);
}
    )};






//Initialize
//Tell the function where to find the dropdown information
function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var Samp_ID = data.names;
        Samp_ID.forEach((sample) => {
            selector.append("option").text(sample).property("value");
        });

        var original = Samp_ID[0];
        charts(original);
        metadata(original);
    
    });
}
//Create a function to display the new outcomes for the data when selection has been altered.
//optionChanged is from the html starter code
function optionChanged(changed){
    charts(changed);
    metadata(changed);
}


init();
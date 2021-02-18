// Use the D3 library to read in samples.json.
//Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
d3.json("samples.json").then((data) => {
    console.log(data);
    var samples = data.samples;
})
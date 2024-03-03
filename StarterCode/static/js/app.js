// Source url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Initialize the page with default sample
function init() {
    // Read in the samples.json data
    d3.json(url).then((data) => {
        // Ensure data was feteched
        console.log(data)

        // Set variable for sample names
        let IDs = data.names;

        // Populate the dropdown menu with sample IDs
        let dropdownMenu = d3.select("#selDataset");
       
        // For each sample ID value in the array append to dropdownMenu variable
        IDs.forEach(ID => {
            dropdownMenu.append("option").text(ID).attr("value", ID);
        });

         // Set default sample as the first index in the array
         let defaultSample = IDs[0]; 

         // Create initial horizontal bar chart, bubble chart and metadata panel executions 
        executeBar(defaultSample, data);
        executeBubble(defaultSample, data);
        executeMetadata(defaultSample, data);
      
     });    
    
};

// Function to create horizontal bar chart to display the top 10 OTUs found in that individual
function executeBar(sampleId,data){

    // Find if the users selection exactly matches the ID
    let sample = data.samples.find(sample => sample.id === sampleId);
    
    // Slice top 10 IDs by sorting the order of elements in the array by .reserve()
    let sampleValues = sample.sample_values.slice(0, 10).reverse();
    let otuIds = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(); // Function to take each sliced 'otu_ids' and append 'OTU' transforming it into a meaning full string to plot 
    let otuLabels = sample.otu_labels.slice(0, 10).reverse();

    // Trace for bar horizontal bar chart
    let barTrace = [{
        x: sampleValues,
        y: otuIds,
        text: otuLabels, // Hover text
        type: "bar",
        orientation: "h",
        marker: {
            color: "black"
        }
    }];

    // Layout for horizontal bar chart 
    let barLayout = {
        title: "Top 10 OTUs Found in Individual",
        xaxis: {title: "Sample Values"},
        yaxis: {title: "OTU IDs"}
    };

    // Plot bar chart
    Plotly.newPlot("bar",barTrace, barLayout)
};

// Function to create bubble chart that displays each sample selection
function executeBubble(sampleId, data) {
    // Find if the users selection exactly matches the ID
    let sample = data.samples.find(sample => sample.id === sampleId);

    // Trace for bubble chart
    let bubbleTrace = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels, // Hover text
        mode: "markers",
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: "Electric"
        }
    }];

    // Layout for bubble chart
    let bubbleLayout = {
        title: "OTU Frequency",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
    };

    // Plot the bubble chart
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
};

// Function to create to create sample metadata demographic information
function executeMetadata(sampleId, data){
    // Find if the users selection exactly matches the ID
    let sampleMetadata = data.metadata.find(metadata => metadata.id === parseInt(sampleId)); // Convert sampleId to integer for comparing to metadata.id

    // Clear container with previous values before appending
    let metadataContainer = d3.select("#sample-metadata");
    metadataContainer.html("");

    // Append each key and its value to the container at a new 'h5' or header
    Object.entries(sampleMetadata).forEach(([key, value]) => {
        metadataContainer.append("h5").text(`${key}: ${value}`); 
    });
}


// Event listener for dropdown change
function optionChanged(selectedSampleId) {
    // Update the visuals with newly selected ID
    d3.json(url).then(data => {
        executeBar(selectedSampleId, data);
        executeBubble(selectedSampleId, data);
        executeMetadata(selectedSampleId, data);
    });
};



// Initialize the dashboard
init();
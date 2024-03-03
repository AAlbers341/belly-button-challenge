// Source url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Initialize the page with default sample
function init() {
    // Read in the samples.json data
    d3.json(url).then((data) => {
        //set variable for sample names
        let sampleIds = data.names;

        // Populate the dropdown menu with sample IDs
        let dropdownMenu = d3.select("#selDataset");
       
        // For each sample ID value in the array append to dropdownMenu variable
        sampleIds.forEach(sampleId => {
            dropdownMenu.append("option").text(sampleId).attr("value", sampleId);
        });

         // Set default sample as the first index in the array
         let defaultSample = sampleIds[0]; 

         // Create initial horizontal bar chart, bubble chart and metadata panel
        createBar(defaultSample, data);
        createBubble(defaultSample, data);
        createMetadata(defaultSample, data);
      
     });    
    
};



// Initialize the dashboard
init();
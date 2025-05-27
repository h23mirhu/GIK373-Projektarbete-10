// URL for the Sweden's forest area change over time written in the variable 'urlSeForestArea'
// From SCB
const urlSeForestArea = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN';
// JSON code for the Sweden's forest area change over time written in the variable 'querySeForestArea'
const querySeForestArea = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionRiket99",
        "values": [
          "00"
        ]
      }
    },
    {
      "code": "Markanvandningsklass",
      "selection": {
        "filter": "item",
        "values": [
          "213"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2000",
          "2005",
          "2010",
          "2015",
          "2020"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
};

// Request object with information from the dataset
// The request har the type 'POST'
// The content of the request is in the variable 'querySeForestArea'
const requestSeForestArea = new Request(urlSeForestArea, {
    method: 'POST',
    body: JSON.stringify(querySeForestArea)
});
// The method fetch is used to preform the request and convert it to JSON
// The function 'printSeForestAreaChart' is sent in the last .then
fetch(requestSeForestArea)
    .then((response) => response.json())
    .then(printSeForestAreaChart);

// Function to create the chart for Sweden's forest area change over time
function printSeForestAreaChart(dataSeForestArea) {
    // Writes the data to the variable 'years'
    const years = dataSeForestArea.data;
    // Writes the 3rd key in the array, which has the years, in the variable 'labels'
    const labels = years.map((year) => year.key[2]);
    // Writes the values, which contains the forest area, to the varaible 'data'
    // The area is divided by 1000000. This is to show the area in million hectars to make it easier to read
    const data = years.map((year) => (year.values[0] / 1000000));

    // The varaible 'datasets' contains an array with the dataset
    const datasets = [
        {
            label: "Forest Area",
            data,
            borderWidth: 2,
            backgroundColor: 'hsla(125, 19%, 39%, 0.5)',
            borderColor: 'hsla(131, 24%, 18%, 1)',
            hoverBorderWidth: 4,
            fill: {
                target: 'origin',
                below: 'hsla(125, 19%, 39%, 0.5)'
            }
        }
    ];
    // A line chart is created in the HTML-element with the id 'seForestArea'
    new Chart(document.getElementById('seForestArea'), {
        type: 'line',
        data: { labels, datasets },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: `Million Hectares`
                    }
                }
            }
        }
    });

    document.getElementById('seaSpinner').style.display = 'none';
}

// URL for the average deforestation in each region in Sweden written in the variable 'urlSeDeforestation'
// From SLU
const urlSeDeforestation = 'https://skogsstatistik.slu.se:443/api/v1/sv/OffStat/Avverkning/AVV_arlig_avverkning_landsdelar_tab.px';
// JSON code for the average deforestation in each region in Sweden written in the variable 'querySeDeforestation'
const querySeDeforestation = {
  "query": [
    {
      "code": "År",
      "selection": {
        "filter": "item",
        "values": [
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36"
        ]
      }
    },
    {
      "code": "Landsdel",
      "selection": {
        "filter": "item",
        "values": [
          "101",
          "102",
          "103",
          "104"
        ]
      }
    },
    {
      "code": "Trädslag",
      "selection": {
        "filter": "item",
        "values": [
          "3"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
};

// Request object with information from the dataset
// The request har the type 'POST'
// The content of the request is in the variable 'querySeDeforestation'
const requestSeDeforestation = new Request(urlSeDeforestation, {
    method: 'POST',
    body: JSON.stringify(querySeDeforestation)
});

// The method fetch is used to preform the requestSeDeforestation and convert it to JSON
// The function 'printSeTreesChart' is sent in the last .then
fetch(requestSeDeforestation)
    .then((responseSeDeforestation) => responseSeDeforestation.json())
    .then((dataSeDeforestation) => {
        const { labels, data } = preparationSeTreesChart(dataSeDeforestation.data);
        printSeTreesChart(
            'seDeforestation',
            "Deforestation",
            labels,
            data,
            'sedSpinner'
        );
    });

// URL for the average forest growth in each region in Sweden written in the variable 'urlSeForestGrowth'
// From SLU
const urlSeForestGrowth = 'https://skogsstatistik.slu.se:443/api/v1/sv/OffStat/Skogsmark/Tillvaxt/SM_Tillvaxt_tab.px';
// JSON code for the average forest growth in each region in Sweden written in the variable 'querySeForestGrowth'
const querySeForestGrowth = {
  "query": [
    {
      "code": "Län",
      "selection": {
        "filter": "item",
        "values": [
          "101",
          "102",
          "103",
          "104"
        ]
      }
    },
    {
      "code": "Fjäll",
      "selection": {
        "filter": "item",
        "values": [
          "0"
        ]
      }
    },
    {
      "code": "Trädslag",
      "selection": {
        "filter": "item",
        "values": [
          "7"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
};

// Request object with information from the dataset
// The request har the type 'POST'
// The content of the request is in the variable 'querySeForestGrowth'
const requestSeForestGrowth = new Request(urlSeForestGrowth, {
    method: 'POST',
    body: JSON.stringify(querySeForestGrowth)
});

// The method fetch is used to preform the requestSeForestGrowth and convert it to JSON
// The function 'printSeTreesChart' is sent in the last .then
fetch(requestSeForestGrowth)
    .then((responseSeForestGrowth) => responseSeForestGrowth.json())
    .then((dataSeForestGrowth) => {
        const { labels, data } = preparationSeTreesChart(dataSeForestGrowth.data, 100);
        printSeTreesChart(
            'seForestGrowth',
            'Forest Growth',
            labels,
            data,
            'segSpinner'
        );
    });

// URL for the protected forest area in each region in Sweden written in the variable 'urlSeProtectedForest'
// From SCB
const urlSeProtectedForest = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0605/SkyddSkogFrivillig';
// JSON code for the protected forest area in each region in Sweden written in the variable 'querySeProtectedForest'
const querySeProtectedForest = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:D-Landsdelar",
        "values": [
          "NON",
          "SON",
          "SVE",
          "GOT"
        ]
      }
    },
    {
      "code": "Overlapp",
      "selection": {
        "filter": "item",
        "values": [
          "UÖA"
        ]
      }
    },
    {
      "code": "TypSkogsmark",
      "selection": {
        "filter": "item",
        "values": [
          "SKT"
        ]
      }
    },
    {
      "code": "Former",
      "selection": {
        "filter": "item",
        "values": [
          "FSS"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "0000024O"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2023"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
};

// Request object with information from the dataset
// The request har the type 'POST'
// The content of the request is in the variable 'querySeProtectedForest'
const requestSeProtectedForest = new Request(urlSeProtectedForest, {
    method: 'POST',
    body: JSON.stringify(querySeProtectedForest)
});

// The method fetch is used to preform the requestSeProtectedForest and convert it to JSON
// The function 'printSeTreesChart' is sent in the last .then
fetch(requestSeProtectedForest)
    .then((responseSeProtectedForest) => responseSeProtectedForest.json())
    .then(displaySeProtectedForestOnMap);

// Prepares the data for the trees charts in Sweden
// The function is made to be used for the all the charts for for the average deforestation and average forest growth map
// valueScale is used to divide the values for different units, to right all charts in the same unit
function preparationSeTreesChart(dataSeTrees, valueScale = 1) {
    // Renames the region code to names
    const regionCodes = {
        '101': 'N Norrland',
        '102': 'S Norrland',
        '103': 'Svealand',
        '104': 'Götaland'
    };
    // Writes the data for each region in the variables
    const regionData = {
        'N Norrland': 0,
        'S Norrland': 0,
        'Svealand': 0,
        'Götaland': 0
    };
    const regionCounts = {
        'N Norrland': 0,
        'S Norrland': 0,
        'Svealand': 0,
        'Götaland': 0
    };
    
    // A loop that counts the average deforestation/forest growth of each region
    // Also combines N Norrland and S Norrland into Norrland
    dataSeTrees.forEach((row) => {
        // Writes the region code to the variable 'regionCode'
        const region = regionCodes[row.key[1]];
        // Converts the values from strings to numbers
        const values = row.values.map(Number);
        // Calculates the average of all numbers in the values array
        const avg = values.reduce((a, b) => a + b, 0) / values.length / valueScale;

        // Sums the average of all years for each region
        regionData[region] += avg;
        regionCounts[region] += 1;
    });

    // Values that will be used for the chart
    const labels = Object.keys(regionData);
    const data = labels.map(region => regionData[region] / regionCounts[region]);

    return { labels, data};
}

// Function for the bar chart for both average deforestation and forest growth in each region in Sweden
function printSeTreesChart(chartId, chartTitle, labels, data, spinnerId){
    // The varaible 'datasets' contains an array with the dataset
    const datasets = [
        {
            label: chartTitle,
            data,
            backgroundColor: 'hsla(125, 19%, 39%, 1)',
            hoverBackgroundColor: 'hsla(125, 18%, 25%, 1)'
        }
    ];
    // A bar chart is created in the HTML-element with the id 'seDeforestation'
    new Chart(document.getElementById(chartId), {
        type: 'bar',
        data: { labels, datasets },
        options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: `Million m \u00B3sk`
                        }
                    }
                }
            }
    });

    document.getElementById(spinnerId).style.display = 'none';
}

// Function for the map of protected forest area in each region in Sweden
function displaySeProtectedForestOnMap(dataSeProtectedForest){
  // Renames the region code to names
  const regionCodes = {
      'NON': 'N Norrland',
      'SON': 'S Norrland',
      'SVE': 'Svealand',
      'GOT': 'Götaland'
  };

  // Writes the data to the variable 'region'
  const region = dataSeProtectedForest.data;
  // Writes the 2nd key in the array, which has the region, in the variable 'labels'
  // regionCodes renames the keys
  const labels = region.map((region) => regionCodes[region.key[0]]);
  // Writes the values, which contains the stem volume over bark, to the varaible 'data'
  const data = region.map((region) => region.values[0]);

  const mapData = { labels, data };

  const dataForMap = [
    {
      type: "choroplethmap", 
      locations: mapData.labels, 
      z: mapData.data,
      featureidkey: 'properties.region',
      colorbar: {
        title: {
          text: 'Protected Forest Area (%)', 
          side: 'right'
        }
      },
      colorscale: [
        [0, 'hsla(54, 68%, 94%, 1)'],
        [0.5, 'hsla(125, 19%, 39%, 1)'],
        [1, 'hsla(125, 18%, 25%, 1)']
      ],
      marker: {
        line: {
          color: 'rgba(0, 0, 0, 0)'
        }
      },
      geojson: 'sweden_regions.json'
    }
  ];

  const layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 2.9},
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    margin: {
      l: 10,
      r: 0,
      t: 10,
      b: 110
    }
  };
  const spinner = document.getElementById('sepSpinner').style.display = 'none';

  const config = { responsive: true, displayModeBar:false }

  Plotly.newPlot('seProtectedForest', dataForMap, layout, config, spinner);
}
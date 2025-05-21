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
            label: "Sweden’s Forest Area Change Over Time (2000-2020)",
            data,
            fill: {
              target: 'origin',
              below: 'rgb(0, 0, 255)'
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
                        text: 'Million Hectars'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}

// URL for the average deforestation of trees in each region in Sweden written in the variable 'urlSeDeforestation'
// From SLU
const urlSeDeforestation = 'https://skogsstatistik.slu.se:443/api/v1/sv/OffStat/Avverkning/AVV_arlig_avverkning_landsdelar_tab.px';
// JSON code for the average deforestation of trees in each region in Sweden written in the variable 'querySeDeforestation'
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
            "Sweden’s Average Deforestation of Trees in Each region (2000-2020)",
            labels,
            data
        );
    });

// URL for the average tree growth in each region in Sweden written in the variable 'urlSeTreeGrowth'
// From SLU
const urlSeTreeGrowth = 'https://skogsstatistik.slu.se:443/api/v1/sv/OffStat/Skogsmark/Tillvaxt/SM_Tillvaxt_tab.px';
// JSON code for the average tree growth in each region in Sweden written in the variable 'querySeTreeGrowth'
const querySeTreeGrowth = {
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
// The content of the request is in the variable 'querySeTreeGrowth'
const requestSeTreeGrowth = new Request(urlSeTreeGrowth, {
    method: 'POST',
    body: JSON.stringify(querySeTreeGrowth)
});

// The method fetch is used to preform the requestSeTreeGrowth and convert it to JSON
// The function 'printSeTreesChart' is sent in the last .then
fetch(requestSeTreeGrowth)
    .then((responseSeTreeGrowth) => responseSeTreeGrowth.json())
    .then((dataSeTreeGrowth) => {
        const { labels, data } = preparationSeTreesChart(dataSeTreeGrowth.data, 100);
        printSeTreesChart(
            'seTreeGrowth',
            'Sweden’s Average Tree growth in Each region (2002-2018)',
            labels,
            data
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
// The function is made to be used for the all the charts for for the average deforestation and average tree growth map
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
    
    // A loop that counts the average deforestation/tree growth of each region
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

// Function for the bar chart for the for the average deforestation of trees in each region in Sweden
function printSeTreesChart(chartId, chartTitle, labels, data){
    // The varaible 'datasets' contains an array with the dataset
    const datasets = [
        {
            label: chartTitle,
            data
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
                },
                x: {
                    title: {
                        display: true,
                        text: 'Region'
                    }
                }
            }
        }
    });
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

  const map = [
    {
      type: "choroplethmap", 
      locations: mapData.labels, 
      z: mapData.data,
      featureidkey: 'properties.region',
      geojson: 'sweden_regions.json'
    }
  ];

  const layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 3.3},
    width: 370, 
    height:600
  };

  Plotly.newPlot('seProtectedForest', map, layout);
}
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
            label: "Forest Area (Million Hectars)",
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
        data: { labels, datasets }
    });
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
            "Deforestation (Million m \u00B3sk)",
            labels,
            data
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
            'Forest Growth (Million m \u00B3sk)',
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

// Function for the bar chart for the for the average deforestation in each region in Sweden
function printSeTreesChart(chartId, chartTitle, labels, data){
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
        data: { labels, datasets }
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

  const dataForMap = [
    {
      type: "choroplethmap", 
      locations: mapData.labels, 
      z: mapData.data,
      featureidkey: 'properties.region',
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

  const config = { responsive: true, displayModeBar:false }

  Plotly.newPlot('seProtectedForest', dataForMap, layout, config);
}

fetch('https://unstats.un.org/sdgapi/v1/sdg/Indicator/Data?indicator=15.1.1&areaCode=112&areaCode=100&areaCode=203&areaCode=348&areaCode=616&areaCode=498&areaCode=642&areaCode=643&areaCode=703&areaCode=804&areaCode=248&areaCode=208&areaCode=233&areaCode=234&areaCode=246&areaCode=831&areaCode=352&areaCode=372&areaCode=833&areaCode=832&areaCode=428&areaCode=440&areaCode=578&areaCode=744&areaCode=752&areaCode=826&areaCode=008&areaCode=020&areaCode=070&areaCode=191&areaCode=292&areaCode=300&areaCode=336&areaCode=380&areaCode=470&areaCode=499&areaCode=807&areaCode=620&areaCode=674&areaCode=688&areaCode=705&areaCode=724&areaCode=040&areaCode=056&areaCode=250&areaCode=276&areaCode=438&areaCode=442&areaCode=492&areaCode=528&areaCode=756&timePeriod=2000&timePeriod=2001&timePeriod=2002&timePeriod=2003&timePeriod=2004&timePeriod=2005&timePeriod=2006&timePeriod=2007&timePeriod=2008&timePeriod=2009&timePeriod=2010&timePeriod=2011&timePeriod=2012&timePeriod=2013&timePeriod=2014&timePeriod=2015&timePeriod=2016&timePeriod=2017&timePeriod=2018&timePeriod=2019&timePeriod=2020&pageSize=1210')
    .then((response) => response.json())
    .then((data) => {
        

        //Sort data
        const sortedData = data.data.map((item) => ({
           year: item.timePeriodStart,
           value: item.value,
           country: item.geoAreaName,
           description: item.seriesDescription 
        }))
        .sort((a,b) => a.year - b.year);

        //Filter the sorted data and pick out Forest area and specific years 2000 and 2020
        const forestAreaData = sortedData.filter(item =>
            item.description === "Forest area (thousands of hectares)" && (item.year === 2000 || item.year === 2020)
        );

        const forestValuesByCountry = {}; //Store data grouped by country

        //Filter each country's values for each year (2000 and 2020)
        forestAreaData.forEach(item => {
            const country = item.country;

            //If we encounter a new country, then add it to the group variable
            if(!forestValuesByCountry[country]) {
                forestValuesByCountry[country] = {};
            }

            //Store the value for each year
            forestValuesByCountry[country][item.year] = item.value;
        })

        const countryForestGainPercent = []; //Store data with each country's forest gain for years 2000 and 2020

        for(const country in forestValuesByCountry) {
            const values = forestValuesByCountry[country];
            const start = values[2000];
            const end = values[2020];

            if(start && end){
                const areaGain = end - start;
                const percentChange = (areaGain / end) * 100;

                countryForestGainPercent.push({
                    country, 
                    percentChange: percentChange.toFixed(2), //Round to 2 decimals
                    description: 'Change of Forest area in percent'
                })
            }
        }

        const top5Gain = countryForestGainPercent
            .sort((a, b) => b.percentChange - a.percentChange) //Smallest number first
            .slice(0, 5) //Only the top 5 countries included

        const gainLabels = top5Gain.map((item) => item.country);
        const gainValues = top5Gain.map((item) => item.percentChange);

        const gainDatasets = [{
            label: 'Forest Area Change (%)',
            data: gainValues,
            borderWidth: 2,
            backgroundColor: 'hsla(125, 19%, 39%, 1)',
            borderColor: 'hsla(54, 68%, 94%, 0.8)',
            hoverBorderWidth: 4
        }];

        new Chart(document.getElementById('euForestGainPercent'), {
            type: 'bar',
            data: {
                labels: gainLabels,
                datasets: gainDatasets
            }
        })
        document.getElementById('gainSpinner').style.display = 'none';

        const top5Loss = countryForestGainPercent
            .filter((item) => item.percentChange < 0) //filter out countries with an unchanged/positive value
            .sort((a, b) => a.percentChange - b.percentChange)
            .slice(0, 5)

        const lossLabels = top5Loss.map((item) => item.country);
        const lossValues = top5Loss.map((item) => Math.abs(item.percentChange));

        const lossDatasets = [{
            label: "Forest Area Change (%)",
            data: lossValues,
            borderWidth: 2,
            backgroundColor: 'hsla(32, 50%, 62%, 1)',
            borderColor: 'hsla(54, 68%, 94%, 0.8)',
            hoverBorderWidth: 4
        }];

        new Chart(document.getElementById('euForestLossPercent'), {
            type: 'bar',
            data: {
                labels: lossLabels,
                datasets: lossDatasets
            }
        })

        document.getElementById('lossSpinner').style.display = 'none';
    });

        

fetch('https://unstats.un.org/sdgapi/v1/sdg/Indicator/Data?indicator=15.1.1&areaCode=150&timePeriod=%5B%222000%22%2C&timePeriod=%222001%22%2C&timePeriod=%222002%22%2C&timePeriod=%222003%22%2C&timePeriod=%222004%22%2C&timePeriod=%222005%22%2C&timePeriod=%222006%22%2C&timePeriod=%222007%22%2C&timePeriod=%222008%22%2C&timePeriod=%222009%22%2C&timePeriod=%222010%22%2C&timePeriod=%222011%22%2C&timePeriod=%222012%22%2C&timePeriod=%222013%22%2C&timePeriod=%222014%22%2C&timePeriod=%222015%22%2C&timePeriod=%222016%22%2C&timePeriod=%222017%22%2C&timePeriod=%222018%22%2C&timePeriod=%222019%22%2C&timePeriod=%222020%22%5D&pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        //Sorting data
        const sortedEUData = data.data.map((item) => ({
            year: item.timePeriodStart,
            value: item.value / 1000, //Divide to get millions instead of thousands
            continent: item.geoAreaName,
            description: item.seriesDescription
        }))
        .sort((a, b) => a.year - b.year); //Making sure it's ascending order of years

        //Filtering the data to only include Forest area and save it in variable
        const forestAreaData = sortedEUData.filter((item) => 
            item.description === "Forest area (thousands of hectares)")

        //Variables for the Chart, visualisation about Europe's forest area changing over time

        const labels = forestAreaData.map((item) => item.year);
        const values = forestAreaData.map((item) => item.value);

        const datasets = [{
            label: "Forest area (millions of hectares)",
            data: values,
            borderWidth: 2,
            backgroundColor: 'hsla(125, 19%, 39%, 0.5)',
            borderColor: 'hsla(131, 24%, 18%, 1)',
            hoverBorderWidth: 4,
            fill: {
                target: 'origin',
                below: 'hsla(125, 19%, 39%, 0.5)'
            }
        }];

        new Chart(document.getElementById('euForestOverTime'), {
            type: 'line',
            data: {labels, datasets},
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
            })
        document.getElementById('euSpinner').style.display = 'none';
    })
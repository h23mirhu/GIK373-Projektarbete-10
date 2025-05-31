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
        .sort((a,b) => a.year - b.year)

        const landAreaByCountry = {};

        sortedData.forEach(item => {
            if (item.description === 'Land area (thousands of hectares)') {
                landAreaByCountry[item.country] = parseFloat(item.value);
            }
        })

        const filteredSortedData = sortedData.filter(item => {
            const landArea = landAreaByCountry[item.country];

            return !landArea || landArea >= 10500; //Filter the data to not include countries with a land area below 10,500, only big countries
        })

        //Filter the sorted data and pick out Forest area and specific years 2000 and 2020
        const forestAreaData = filteredSortedData.filter(item =>
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

            if(start && end){ //If country has both years then we calculate
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
            label: 'Area Increase (%)',
            data: gainValues,
            backgroundColor: 'hsla(125, 19%, 39%, 1)',
            hoverBackgroundColor: 'hsla(125, 18%, 25%, 1)'
        }];

        new Chart(document.getElementById('euForestGainPercent'), {
            type: 'bar',
            data: {
                labels: gainLabels,
                datasets: gainDatasets
            },
            options: {
                plugins: {
                    legend: {
                    display: false
                    }
                }
            }
        })
        document.getElementById('gainSpinner').style.display = 'none';

        const top5Loss = countryForestGainPercent
            .filter((item) => item.percentChange < 0) //filter out countries with an unchanged/positive value
            .sort((a, b) => a.percentChange - b.percentChange)
            .slice(0, 5)

        const lossLabels = top5Loss.map((item) => item.country);
        const lossValues = top5Loss.map((item) => Math.abs(item.percentChange)); //Math.abs gives absolute value, turns negative values into positive which gives more clarity in a chart

        const lossDatasets = [{
            label: "Area Decrease (%)",
            data: lossValues,
            backgroundColor: 'hsla(125, 19%, 39%, 1)',
            hoverBackgroundColor: 'hsla(125, 18%, 25%, 1)'
        }];

        new Chart(document.getElementById('euForestLossPercent'), {
            type: 'bar',
            data: {
                labels: lossLabels,
                datasets: lossDatasets
            },
            options: {
                plugins: {
                    legend: {
                    display: false
                    }
                }
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
            item.description === "Forest area (thousands of hectares)" && (item.year !== 2000 && item.year !== 2010))

        //Variables for the Chart, visualization about Europe's forest area changing over time
        const labels = forestAreaData.map((item) => item.year);
        const values = forestAreaData.map((item) => item.value.toFixed(1));

        const datasets = [{
            label: "Forest area",
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
                plugins: {
                    legend: {
                    display: false
                    }
                }
        }
            })
        document.getElementById('euSpinner').style.display = 'none';
    })
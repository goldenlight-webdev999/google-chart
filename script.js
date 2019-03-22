var data;
var options;
let chart;
var stndDev = 1;
var mean = 0;
let xMin = -4.0;
let xMax = 4.0;
let xLeft = -4;
let xRight = 1.50;

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function createArray(xMin, xMax, xLeft, xRight, mean, stndDev) {
  let chartData = new Array([]);
  let index = 0;
  let temp = 0;
  for (var i = xMin; i < xMax+0.1; i += 0.1) {
    chartData[index] = new Array(4);
    temp = Math.round(100 * (i-xMin)/(xMax - xMin));    
    chartData[index][0] = {v:i, f: temp+"%"};    
    chartData[index][1] = {v:jStat.normal.pdf(i, mean, stndDev), f: ""};

    if (i < xLeft || i > xRight) {
      chartData[index][2] = false;
    }
    chartData[index][3] =
      "opacity: 1; + color: #8064A2; + stroke-color: black; ";

    index++;
  }
  return chartData;
}
function drawChart() {
	data = new google.visualization.DataTable();
	options = { 
        legend: "none",
        vAxis: {
            textPosition: "none",                        
        },
        hAxis: {
            minorGridlines: {
                count: 5
            },
            ticks:[
                {v:xMin,f:'0%'},
                {v:-2,f:''},
                {v:(xMin+xMax)/2,f:'50%'},
                {v:2,f:''},
                {v:xMax,f:'100%'},
            ],                      
        }             
    }
    	
  data.addColumn("number", "X Value");
  data.addColumn("number", "");
  data.addColumn({ type: "boolean", role: "scope" });
  data.addColumn({ type: "string", role: "style" });
  
  data.addRows(createArray(xMin, xMax, xLeft, xRight, mean, stndDev));
  
  chart = new google.visualization.AreaChart(
    document.getElementById("chart_div")
  );  
  chart.draw(data, options);
  
}
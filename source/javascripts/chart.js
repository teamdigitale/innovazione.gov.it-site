var chartDataReceived = document.getElementById("chartData").textContent;
var chartArr = chartDataReceived.replace(/=>/g, ":");
console.log("chartArr", JSON.parse(chartArr));

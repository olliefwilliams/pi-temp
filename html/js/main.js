var g = new Dygraph(
    document.getElementById("graph"),
    // For possible data formats, see http://dygraphs.com/data.html
    // The x-values could also be dates, e.g. "2012/03/15"
    "raw/temp_log_1.csv",
    {
      // options go here. See http://dygraphs.com/options.html
		legend: 'always',
		animatedZooms: true,
		showRangeSelector: true,
		//title: 'Temperature'
		rangeSelectorPlotFillColor: 'rgba(241, 84, 85, 0.2)',
		rangeSelectorPlotFillGradientColor: 'rgba(241, 84, 85, 0.0)',
		rangeSelectorPlotStrokeColor: 'rgba(241, 84, 85, 0.6)',
		rangeSelectorAlpha: 0.2,
		color: 'rgba(241, 84, 85, 1)',
		
		 axes: {
                y: {
                  axisLabelWidth: 35
                }
              }
    });


var todayFlag = 1;

var currentTime = new Date();	

var currentTimeUnix = currentTime.getTime();

// number of ms in one day
var oneDay = 86400000;

// this is the unix timestamp of the start of the current day (aka midnight).
var currentDateUnix = currentTime.setHours(0, 0, 0, 0);

console.log(currentTime);
console.log(currentTimeUnix);
console.log(currentDateUnix);

$(".today-button").click(function(){

todayFlag = 1;	
	
g.updateOptions({
	dateWindow: [currentDateUnix, currentTimeUnix]  
  });

});

// midnight yesterday
var startWindow = currentDateUnix - oneDay;

//midnight today
var endWindow = currentDateUnix;

$(".back-button").click(function(){

	// if it's not today (i.e. we haven't clicked back yet) then update the values
	// otherwise, leave them as the set values above
	if(todayFlag == 0){
		startWindow -= oneDay;
		endWindow -= oneDay;
	}
 
	//now we're no longer showing today.	
	todayFlag = 0;		

	g.updateOptions({
		dateWindow: [startWindow, endWindow]  
	  });

});

$(".forward-button").click(function(){
	
	// if we're trying to look into the future...
	if(endWindow > currentTimeUnix){
		// then it must be today!
		todayFlag = 1;
		// so don't do anything.
		return;
	}
	
	//now add 1 day's worth of ms to whatever we're showing
	startWindow += oneDay;
	endWindow += oneDay;	

	g.updateOptions({
		dateWindow: [startWindow, endWindow]  
	  });
	
});


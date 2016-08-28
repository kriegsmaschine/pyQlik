function scatter(exp_data){

	var data = JSON.parse(exp_data);

	if(!data.text.comparisons){
		document.getElementById("test").innerHTML = "Samples: ";
		document.getElementById("output_test").innerHTML = "".
								concat(data.text.cohort_name_c1,": ",
								data.exp_data_c1.length);

	 	if(data.plot == "scatter"){

	 		//for loop to create x-axis vector
			var tlen = [];
			for(var x = 0; x < data.exp_data_c1.length; x++){
			  	tlen.push(x); //append to array for scatter plot
			}

			var trace1 = {
			  x: tlen,
			  y: data.exp_data_c1,
			  mode: 'markers',
			  type: 'scatter',
			  name: data.text.gene,
			};

			var layout = {
				title: data.text.gene.toUpperCase(),
				yaxis: {
    				title: 'Raw Frequency',
  				},
			};
		
			var pdata = [trace1];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "boxplot"){
			var trace1 = {
				y: data.exp_data_c1,
				type: 'box',
				name: data.text.gene,
			}

			var layout = {
				title: data.text.gene.toUpperCase(),
				yaxis: {
    				title: 'Raw Expression',
  				}
			};

			var pdata = [trace1];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "histogram"){
			var max = Math.max.apply(data.exp_data_c1);
			autobinx: false;

			var binSize = 0.025 * max;
			var trace1 = {
				x: data.exp_data_c1,
				type: 'histogram',
				name: data.text.gene,

				xbins: {
					start: 0,
					end: max,
					size: binSize,
				}
			};

			var layout = {
				title: data.text.gene.toUpperCase(),
				yaxis: {
    				title: 'Frequency',
  				},
  				xaxis: {
  					title: 'Raw Expression',
  				},
			};
			
			var pdata = [trace1];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "kaplan-meier"){
			km_plot(data);

		}else{
			alert("No chart type selected");
		}

	}else{ //else if plotting cohort comparisons

		document.getElementById("output_test").innerHTML = "".concat("Samples: ",
								data.text.cohort_name_c1,": ",
								data.exp_data_c1.length, " ",
								data.text.cohort_name_c2,": ",
								data.exp_data_c2.length);

	 	if(data.plot == "scatter"){
			//for loop to create x-axis vector
			var tlen1 = [];
			var tlen2 = [];

			for(var x = 0; x < data.exp_data_c1.length; x++){
			  	tlen1.push(x); //append to array for scatter plot
			}
			for(var x = 0; x < data.exp_data_c2.length; x++){
				tlen2.push(x);
			}

			var trace1 = {
			  x: tlen1,
			  y: data.exp_data_c1,
			  mode: 'markers',
			  type: 'scatter',
			  name: data.text.cohort_name_c1,
			};

			var trace2 = {
				x: tlen2,
				y: data.exp_data_c2,
				mode: 'markers',
				type: 'scatter',
				name: data.text.cohort_name_c2,
			};

			var layout = {
				title: data.text.gene.toUpperCase(),
				yaxis: {
    				title: 'Raw Frequency',
  				},
			};
		
			var pdata = [trace1,trace2];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "boxplot"){
			var trace1 = {
				y: data.exp_data_c1,
				type: 'box',
				name: data.text.cohort_name_c1,
			}

			var trace2 = {
				y: data.exp_data_c2,
				type: 'box',
				name: data.text.cohort_name_c2,
			};


			var layout = {
				title: data.text.gene.toUpperCase(),
				yaxis: {
    				title: 'Raw Expression',
  				}
			};

			var pdata = [trace1, trace2];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "histogram"){
			var max1 = Math.max.apply(data.exp_data_c1);
			autobinx: false;

			var binSize1 = 0.025 * max1;
			var trace1 = {
				x: data.exp_data_c1,
				type: 'histogram',
				name: data.text.cohort_name_c1,

				xbins: {
					start: 0,
					end: max1,
					size: binSize1,
				}
			};

			var max2 = Math.max.apply(data.exp_data_c2);

			var binSize2 = 0.025 * max2;
			var trace2 = {
				x: data.exp_data_c2,
				type: 'histogram',
				name: data.text.cohort_name_c2,

				xbins: {
					start: 0,
					end: max2,
					size: binSize2,
				}
			};
			
			var layout = {
				title: data.text.gene.toUpperCase(),

				yaxis: {
    				title: 'Frequency',
  				},
  				xaxis: {
  					title: 'Raw Expression',
  				},
			};

			var pdata = [trace1,trace2];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "kaplan-meier"){
			km_plot(data);

		}else{
			alert("No chart type selected");
		}
	}
}

function km_plot(data){
	//will need to remove -1 (unknowns)

	if(!data.text.comparisons){
		document.getElementById("test").innerHTML = "Samples: ";
		document.getElementById("output_test").innerHTML = "".
								concat(data.text.cohort_name_c1,": ",
								data.exp_data_c1.length);

	var death_array_c1     = getDeathArray(data.days_to_death_c1); //set array element == 1 when patient died
	var r_days_to_death_c1 = data.days_to_death_c1;                //removed -1 from days_to_death

	//get array of unique sorted smallest to largest dates to death
	var sortUnique_dtd = getSortedUniqueDaysToDeath(r_days_to_death_c1);

	//get array of the number of deceased Pts by unique dates of death
	var numDeadByDate  = getNumDeadByDateArray(sortUnique_dtd, r_days_to_death_c1);

	//get array of survivors (pts remaining alive)
	var survivors      = getSurvivors(data.exp_data_c1.length, numDeadByDate);

	//determine 1-d/n ~=  1-(numDeadByDate / survivors)
	var oneMinDovN     = getOneMinDovN(numDeadByDate, survivors);

	//S(t) survivors at time t
	var st_survivors   = getSofT(oneMinDovN);

	//format steps for line graph
	var f_survivors = formatSurvAxisPlotly(st_survivors, sortUnique_dtd);
	var f_time      = formatTimeAxisPlotly(sortUnique_dtd, st_survivors, f_survivors);


	var trace1 = {
	  x: f_time,
	  y: f_survivors,
	  type: 'scatter',
	  name: data.text.cohort_name_c1,
	};

	var layout = {
  		title: data.text.gene.toUpperCase(),
  		
  		xaxis: {
    		title: 'Days to Death',
  		},
  		yaxis: {
    		title: '% Survival',
  		}
	};

	var pdata = [trace1,];

	Plotly.newPlot('output_test', pdata, layout);
	
	}else{
		document.getElementById("output_test").innerHTML = "".concat("Samples: ",
								data.text.cohort_name_c1,": ",
								data.exp_data_c1.length, " ",
								data.text.cohort_name_c2,": ",
								data.exp_data_c2.length);

	var death_array_c1     = getDeathArray(data.days_to_death_c1); //set array element == 1 when patient died
	var r_days_to_death_c1 = data.days_to_death_c1;                //removed -1 from days_to_death

	var death_array_c2     = getDeathArray(data.days_to_death_c2); //set array element == 1 when patient died
	var r_days_to_death_c2 = data.days_to_death_c2;                //removed -1 from days_to_death

	//get array of unique sorted smallest to largest dates to death
	var sortUnique_dtd_c1 = getSortedUniqueDaysToDeath(r_days_to_death_c1);
	var sortUnique_dtd_c2 = getSortedUniqueDaysToDeath(r_days_to_death_c2);

	//get array of the number of deceased Pts by unique dates of death
	var numDeadByDate_c1  = getNumDeadByDateArray(sortUnique_dtd_c1, r_days_to_death_c1);
	var numDeadByDate_c2  = getNumDeadByDateArray(sortUnique_dtd_c2, r_days_to_death_c2);

	//get array of survivors (pts remaining alive)
	var survivors_c1      = getSurvivors(data.exp_data_c1.length, numDeadByDate_c1);
	var survivors_c2      = getSurvivors(data.exp_data_c2.length, numDeadByDate_c2);

	//determine 1-d/n ~=  1-(numDeadByDate / survivors)
	var oneMinDovN_c1     = getOneMinDovN(numDeadByDate_c1, survivors_c1);
	var oneMinDovN_c2     = getOneMinDovN(numDeadByDate_c2, survivors_c2);

	//S(t) survivors at time t
	var st_survivors_c1   = getSofT(oneMinDovN_c1);
	var st_survivors_c2   = getSofT(oneMinDovN_c2);

	//format steps for line graph
	var f_survivors_c1 = formatSurvAxisPlotly(st_survivors_c1, sortUnique_dtd_c1);
	var f_time_c1      = formatTimeAxisPlotly(sortUnique_dtd_c1, st_survivors_c1, f_survivors_c1);
	var f_survivors_c2 = formatSurvAxisPlotly(st_survivors_c2, sortUnique_dtd_c2);
	var f_time_c2      = formatTimeAxisPlotly(sortUnique_dtd_c2, st_survivors_c2, f_survivors_c2);


	var trace1 = {
	  x: f_time_c1,
	  y: f_survivors_c1,
	  type: 'scatter',
	  name: data.text.cohort_name_c1,
	};

	var trace2 = {
	  x: f_time_c2,
	  y: f_survivors_c2,
	  type: 'scatter',
	  name:data.text.cohort_name_c2,
	};

	var layout = {
  		title: data.text.gene.toUpperCase(),
  		
  		xaxis: {
    		title: 'Days to Death',
  		},
  		yaxis: {
    		title: '% Survival',
  		}
	};

	var pdata = [trace1,trace2];

	Plotly.newPlot('output_test', pdata, layout);	
	}
}

/////////////////////////////////////////////////////////////////////////////////
//helper functions to create kaplan-meier plots

function getDeathArray(t_days_to_death){
	tarray = removeUnknownDates(t_days_to_death);

	var death_array = [];
	for(var x=0; x < tarray.length; x++){
		death_array[x] = 1;
	}

	return death_array;
}

function removeUnknownDates(t_days_to_death){

	//loop through array to remove -1 (unknown dates)
	for(var x = t_days_to_death.length-1; x--;){
		if (t_days_to_death[x] === -1) 
			t_days_to_death.splice(x, 1);
	}
	//remove last -1 from end of array
	t_days_to_death.splice(-1,1);
	
	return t_days_to_death;
}

function getSortedUniqueDaysToDeath(t2array){
	var n = {}, r = [];

	for(var x = 0; x < t2array.length; x++) 
	{
		if (!n[t2array[x]]) 
		{
			n[t2array[x]] = true; 
			r.push(t2array[x]); 
		}
	}

	//sort by ascending order
	r.sort(function(a, b){return a-b});
	return r;
}

 function getNumDeadByDateArray(sortUniqueDTD, t2days_to_death){
 	var tnumDeadByDate = [];
 	var z = 0;

 	for(var x=0; x < sortUniqueDTD.length; x++){
 		for(var y=0; y < t2days_to_death.length; y++){

 			if(t2days_to_death[y] == sortUniqueDTD[x]){
 				z++;  //increment if patient died at sortUniqueDTD
 			}
 		}
 		tnumDeadByDate[x] = z;
 		z = 0;
 	}

 	return tnumDeadByDate;
 }

 function getSurvivors(totalPatients,t2numDeadByDate){
 	var tsurvivors = [totalPatients];
 	var diff       = totalPatients;

 	for(var x=0; x < t2numDeadByDate.length; x++){
 		diff -= t2numDeadByDate[x];
 		tsurvivors.push(diff);
 	}

 	return tsurvivors;
 }

 function getOneMinDovN(t3numDeadByDate, t2survivors){
 	var t    = [], diff_array = [];
 	var diff = 0;

 	for(var x=0; x < t3numDeadByDate.length; x++){
 		diff = 1 - (t3numDeadByDate[x] / t2survivors[x]);
 		diff_array.push(diff);
 	}

 	return diff_array;
 }

 function getSofT(oneMinDovN){
 	var tsoft = [1];
 	var mult  = 0;

 	for(var x=1; x < oneMinDovN.length; x++){
 		if(x == 0)
 			mult = 1 * oneMinDovN[x];
 		else
 			mult = tsoft[x-1] * oneMinDovN[x]

 		tsoft.push(mult);
 	}

 	return tsoft;
 }

 function formatSurvAxisPlotly(t3survivors, t_dtd){
 	var tsurv = [];

 	for(var x=0; x < t_dtd[1]; x++){
 		tsurv.push(1);
 	}

 	for(var x=2; x < t_dtd.length; x++){
 		for(var y=0; y < t_dtd[x]; y++){
 			tsurv.push(t3survivors[x]);
 		}
 	}

 	return tsurv;
 }

 function formatTimeAxisPlotly(t_dtd, t3survivors, t2surv){
 	var ttime = [];
 	var z = 0;

 	for(var x=0; x < t3survivors.length; x++){
 		for(var y=0; y < t2surv.length; y++){
 			if(t3survivors[x] == t2surv[y]){
 				ttime.push(z);
 				z++;
 			}
 		}
 	}

 	return ttime;
 }
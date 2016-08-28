function scatter(exp_data){

	var data = JSON.parse(exp_data);

	/*
	alert(data.exp_data_c1);
	alert(data.exp_data_c1.length);
	alert(data.exp_data_c2);
	alert(data.exp_data_c2.length);
	alert(data.plot);
	alert(data.text.gene);
	alert(data.text.cohort_name_c1);
	alert(data.text.cohort_name_c2);
	*/

	//alert(data.text.comparisons);
	//alert(typeof(data.text.comparisons));

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
			};
			
			var pdata = [trace1];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "kaplan-meier"){
			alert(data.plot);

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
			};

			var pdata = [trace1,trace2];
			Plotly.newPlot('output_test', pdata, layout);

		}else if(data.plot == "kaplan-meier"){
			alert(data.plot);

		}else{
			alert("No chart type selected");
		}
	}

	/*
		to add multiple plots per plotly graph mush use Plotly.addTraces()
		to overwrite previous data.  this would be used to compare
		different cohorts, msi status, gender, etc.

		https://plot.ly/javascript/plotlyjs-function-reference/
	*/
}
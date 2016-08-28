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
	alert(data.text.comparisons);
	*/

	document.getElementById("output_test").innerHTML = data.exp_data_c1.length;
	document.getElementById("output_test").innerHTML += "".concat("  Gene: ",data.text.gene);

	var tlen = [];
	for(var x = 0; x < data.exp_data_c1.length; x++){
	  	tlen.push(x); //append to array for scatter plot
	}

 	if(data.plot == "scatter"){
		var trace1 = {
		  x: tlen,
		  y: data.exp_data_c1,
		  mode: 'markers',
		  type: 'scatter',
		  name: data.gene,
		};
	
		var data = [trace1];
		Plotly.newPlot('output_test', data);

	}else if(data.plot == "boxplot"){
		var trace1 = {
			y: data.exp_data,
			type: 'box',
			name: data.gene,
		}

		var data = [trace1];
		Plotly.newPlot('output_test', data);

	}else if(data.plot == "histogram"){
		var max = Math.max.apply(data.exp_data);
		autobinx: false;

		var binSize = 0.025 * max;
		var trace1 = {
			x: data.exp_data,
			type: 'histogram',
			name: data.gene,

			xbins: {
				start: 0,
				end: max,
				size: binSize,
			}
		};
		
		var data = [trace1];
		Plotly.newPlot('output_test', data);

	}else if(data.plot == "kaplan-meier"){
		alert(data.plot);

	}else{
		alert("No chart type selected");
	}

	/*
		to add multiple plots per plotly graph mush use Plotly.addTraces()
		to overwrite previous data.  this would be used to compare
		different cohorts, msi status, gender, etc.

		https://plot.ly/javascript/plotlyjs-function-reference/
	*/
}
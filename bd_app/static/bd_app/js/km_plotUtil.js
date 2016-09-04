//helper functions for kaplan-meier curve generation

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
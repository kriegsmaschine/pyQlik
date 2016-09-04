from django.shortcuts         import render
from .models                  import Patient, ClinData, ExpData
from .forms                   import *
from .dbQuery                 import *
                              import json

from django.http              import HttpResponseRedirect
from django.core.urlresolvers import reverse


def index(request):
	if request.method == 'POST':
		pt_form    = PatientForm(request.POST)	
		clin_form  = ClinDataForm(request.POST)
		exp_form   = ExpDataForm(request.POST)
		chart_form = SelectDataChart(request.POST)
		

		if (pt_form.is_valid() and clin_form.is_valid() and
		   exp_form.is_valid() and chart_form.is_valid()):

			#process the PatientForm
			pt_key = processPatientForm(pt_form)
			
			#process the ClinDataForm
			pt_key2 = processClinDataForm(clin_form, pt_key)

			#process the ExpDataForm
			exp_data = processExpDataForm(exp_form, chart_form, pt_key2)

			#return the processed forms
			return render(request, 'bd_app/selection_output.html', {'exp_data':json.dumps(exp_data)})

	else:
		pt_form    = PatientForm()
		clin_form  = ClinDataForm()
		exp_form   = ExpDataForm()
		chart_form = SelectDataChart()


	#return the empty forms
	return render(request, 'bd_app/index.html', 
			      {'pt_form':pt_form,'clin_form':clin_form,'exp_form':exp_form,
			      'chart_form':chart_form})

def help(request):
	return render(request, 'bd_app/help.html',)
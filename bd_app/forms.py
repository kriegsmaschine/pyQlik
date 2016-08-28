from django import forms
from .models import Patient, ClinData, ExpData
from .utils import convertMetaFieldsToList

from django.contrib.admin.widgets import FilteredSelectMultiple

class PatientForm(forms.Form):
	RADIO_CHOICES = (
						('NA','NA'),
						('Cohort','Cohort'),
						('Gender','Gender'),
					)

	cohort = forms.MultipleChoiceField(choices=[], required=True)
	gender = forms.MultipleChoiceField(choices=[], required=True)

	compare_ptForm = forms.ChoiceField(choices=RADIO_CHOICES,required=False,
								       widget=forms.RadioSelect,label='Compare ',
								       initial='NA')

	def __init__(self, *args, **kwargs):
		super(PatientForm, self).__init__(*args, **kwargs)
		
		self.fields['cohort'].choices = (
					Patient.objects.all().values_list('cohort','cohort').distinct())
		
		self.fields['gender'].choices = (
					Patient.objects.all().values_list('gender','gender').distinct())



class ClinDataForm(forms.Form):
	RADIO_CHOICES = (
						(1,'All'),
						(2,'>'),
						(3,'<'),
					)


	msi                   = forms.MultipleChoiceField(choices=[], required=False)
	vital_status          = forms.MultipleChoiceField(choices=[], required=False)
	
	days_to_death         = forms.MultipleChoiceField(choices=[], required=False)
	dtd_radio             = forms.ChoiceField(choices=RADIO_CHOICES, required=False,
								widget=forms.RadioSelect, label='Filter: Days to Death',
								initial=1)
	
	#days_to_last_followup = forms.MultipleChoiceField(choices=[], required=False)
	#dtlf_radio            = forms.ChoiceField(choices=RADIO_CHOICES, required=False,
	#							widget=forms.RadioSelect, label='Filter: Days to Last Followup',
	#							initial=1)
	#
	path_stage            = forms.MultipleChoiceField(choices=[], required=False)

	def __init__(self, *args, **kwargs):
		super(ClinDataForm, self).__init__(*args, **kwargs)

		self.fields['msi'].choices = (
					ClinData.objects.all().values_list('msi','msi').distinct())

		self.fields['vital_status'].choices = (
					ClinData.objects.all().values_list('vital_status',
							'vital_status').distinct())

		self.fields['days_to_death'].choices = (
					ClinData.objects.all().values_list('days_to_death',
							'days_to_death').distinct().order_by('days_to_death'))

		#self.fields['days_to_last_followup'].choices = (
		#			ClinData.objects.all().values_list('days_to_last_followup',
		#					'days_to_last_followup').distinct().order_by('days_to_last_followup'))

		self.fields['path_stage'].choices = (
					ClinData.objects.all().values_list('path_stage',
							'path_stage').distinct().order_by('path_stage'))



class ExpDataForm(forms.Form):
	genes = forms.MultipleChoiceField(choices=[], required=True)
	
	
	def __init__(self, *args, **kwargs):
		super(ExpDataForm, self).__init__(*args, **kwargs)

		ch = ExpData._meta.get_fields()
		tch_genes = convertMetaFieldsToList(ch)
		
		self.fields['genes'].choices = sorted(tch_genes)
		


class SelectDataChart(forms.Form):
	CHART_CHOICES = (
						('boxplot','boxplot'),
						('histogram','histogram'),
						('kaplan-meier','kaplan-meier'),
						('scatter','scatter'),
		            )

	chartType = forms.MultipleChoiceField(choices = CHART_CHOICES, required=True, label='Chart Type ')
from django.db import models

class Patient(models.Model):
	GENDER_CHOICES = (
						('male', 'Male'),
						('female','Female'),
					)

	barcode = models.CharField(max_length = 250)
	cohort  = models.CharField(max_length = 250)
	gender  = models.CharField(max_length = 6,
							   choices = GENDER_CHOICES,
							   default = 'Female'
							   )

	def __str__(self):
		return (str(self.barcode) + '; ' + str(self.cohort) + '; ' +
			    str(self.gender))

	class Meta:
		unique_together = ['barcode', 'cohort', 'gender']


class ClinData(models.Model):
	MSI_CHOICES = (
					('mss'  ,'MSS'),
					('msi-h','MSI-H'),
					('msi-l','MSI-L'),
				  )

	VITAL_CHOICES = (
						('dead' ,'Dead'),
						('alive','Alive'),
					)

	msi                   = models.CharField(max_length = 5,
											 choices = MSI_CHOICES,
											 default = 'MSS'
											 )
	vital_status          = models.CharField(max_length = 5,
											 choices = VITAL_CHOICES,
											 default = 'Alive'
											)

	days_to_death         = models.IntegerField(default = None)
	#days_to_last_followup = models.IntegerField(default = None)
	path_stage            = models.IntegerField(default = None)
	patient               = models.ForeignKey(Patient)

	def __str__(self):
		return (str(self.patient) + '; ' + str(self.msi) + '; ' +
			    str(self.vital_status))

		class Meta:
			unique_together = [
	                              'msi',
	                              'vital_status',
	                              'days_to_death',
	                              'days_to_last_followup',
	                              'path_stage',
	                              'patient',
			                  ]


class ExpData(models.Model):
	braf  = models.FloatField(default = None)
	brap  = models.FloatField(default = None)
	brca1 = models.FloatField(default = None)
	brca2 = models.FloatField(default = None)
	brcc3 = models.FloatField(default = None)
	brd1  = models.FloatField(default = None)
	brd2  = models.FloatField(default = None)
	brd3  = models.FloatField(default = None)
	brd4  = models.FloatField(default = None)

	patient = models.ForeignKey(Patient)

	def __str__(self):
		return (str(self.patient) + '; expression data')

	class Meta:
		unique_together = [
                              'braf',
                              'brap',
                              'brca1',
                              'brca2',
                              'brcc3',
                              'brd1',
                              'brd2',
                              'brd3',
                              'brd4',
                              'patient',
		                  ]
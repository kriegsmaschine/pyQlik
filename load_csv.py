import sys, os, csv, django

csv_file_path = 'F:/python/bioinf_demo/csv/clinicalData_colon_stomach.csv'
project_path  = 'F:/python/bioinf_demo/'

sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'bioinf_demo.settings'
django.setup()

from bd_app.models import Patient, ClinData, ExpData

'''check if value is integer or float 
   if value is not an integer or float
   return -1
'''

def checkNum(var):
	if var != 'NA':
		if float(var).is_integer():
			return int(var)
		else:
			return float(var)
	else:
		return -1

'''get and save patient data into database'''
dataReader = csv.reader(open(csv_file_path), delimiter=',', quotechar='"')

header = dataReader.__next__()
for row in dataReader:
	patient = Patient()
	
	patient.barcode = row[0]
	patient.cohort  = row[1]
	patient.gender  = row[2]

	patient.save()

'''get and save clinical data to database'''
dataReader = csv.reader(open(csv_file_path), delimiter=',', quotechar='"')

header = dataReader.__next__()
for row in dataReader:
	clinData = ClinData()

	clinData.msi                   = row[3]
	clinData.vital_status          = row[4]
	clinData.days_to_death         = checkNum(row[5])
	clinData.days_to_last_followup = checkNum(row[6])
	clinData.path_stage            = checkNum(row[7])

	clinData.patient      = Patient.objects.get(barcode = row[0])
	clinData.save()

'''get and save expression data to database'''
dataReader = csv.reader(open(csv_file_path), delimiter=',', quotechar='"')

header = dataReader.__next__()
for row in dataReader:
	expData = ExpData()

	expData.braf  = checkNum(row[8])
	expData.brap  = checkNum(row[9])
	expData.brca1 = checkNum(row[10])
	expData.brca2 = checkNum(row[11])
	expData.brcc3 = checkNum(row[12])
	expData.brd1  = checkNum(row[13])
	expData.brd2  = checkNum(row[14])
	expData.brd3  = checkNum(row[15])
	expData.brd4  = checkNum(row[16])

	expData.patient = Patient.objects.get(barcode = row[0])
	expData.save()
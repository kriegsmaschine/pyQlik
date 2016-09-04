from scipy.stats import ttest_ind

'''	function to convert a LIST of a QuerySet to a list
	Use this function to take PatientForm QuerySet and
	convert it to a list of integers for the patients'
	ForeignKeys id's
'''
def convertMultListQuerySet(id_queryset):

	id_list = []
	for values in id_queryset:
		for elements in values:
			id_list.append(elements)

	return id_list


'''	function to convert a QuerySet to a list
	Use this function to take PatientForm QuerySet and
	convert it to a list of integers for the patients'
	ForeignKeys id's
'''
def convertSingleListQuerySet(id_queryset):
	id_list = []
	for values in id_queryset:
		id_list.append(values)

	return id_list


'''	function to perform two-way t-test on
	cohorts being compared
'''
def ttest(texp_data_c1, texp_data_c2):
	return ttest_ind(texp_data_c1, texp_data_c2)


'''	Fucntion to take in ch = ExpData._meta.get_fields() and convert
	genes list to dictionary and then convert dictionary to 
	2-tuple to set dynamic fields choices 'genes' for ExpDataForm
'''
def convertMetaFieldsToList(ch):
	ch_genes = []

	#get genes names in list
	for c in ch:
		ch_genes.append(c.name)

	ch_genes.remove('id')
	ch_genes.remove('patient')

	#convert gene list to dictionary
	z = dict((x,x) for x in ch_genes)

	#convert dictionary to 2-tuple 
	tch_genes = [(v,k) for k, v in z.items()]

	return tch_genes
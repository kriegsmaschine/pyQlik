from django.contrib import admin
from .models import Patient, ClinData, ExpData

admin.site.register(Patient)
admin.site.register(ClinData)
admin.site.register(ExpData)

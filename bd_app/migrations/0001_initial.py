# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-04 03:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClinData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msi', models.CharField(choices=[('mss', 'MSS'), ('msi-h', 'MSI-H'), ('msi-l', 'MSI-L')], default='MSS', max_length=5)),
                ('vital_status', models.CharField(choices=[('dead', 'Dead'), ('alive', 'Alive')], default='Alive', max_length=5)),
                ('days_to_death', models.IntegerField(default=None)),
                ('days_to_last_followup', models.IntegerField(default=None)),
                ('path_stage', models.IntegerField(default=None)),
            ],
        ),
        migrations.CreateModel(
            name='ExpData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('braf', models.FloatField(default=None)),
                ('brap', models.FloatField(default=None)),
                ('brca1', models.FloatField(default=None)),
                ('brca2', models.FloatField(default=None)),
                ('brcc3', models.FloatField(default=None)),
                ('brd1', models.FloatField(default=None)),
                ('brd2', models.FloatField(default=None)),
                ('brd3', models.FloatField(default=None)),
                ('brd4', models.FloatField(default=None)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barcode', models.CharField(max_length=250)),
                ('cohort', models.CharField(max_length=250)),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female')], default='Female', max_length=6)),
            ],
        ),
        migrations.AddField(
            model_name='expdata',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bd_app.Patient'),
        ),
        migrations.AddField(
            model_name='clindata',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bd_app.Patient'),
        ),
    ]
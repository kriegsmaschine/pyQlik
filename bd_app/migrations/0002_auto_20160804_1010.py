# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-04 14:10
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bd_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='patient',
            unique_together=set([('barcode', 'cohort', 'gender')]),
        ),
    ]

# Generated by Django 4.0.3 on 2024-08-28 03:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0007_alter_category_options_alter_diagnosis_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
# Generated by Django 4.1.3 on 2022-11-21 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analyzeNumber', '0004_remove_phonemessagemodel_new_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phonemessagemodel',
            name='phoneNumber',
            field=models.TextField(default=''),
        ),
    ]
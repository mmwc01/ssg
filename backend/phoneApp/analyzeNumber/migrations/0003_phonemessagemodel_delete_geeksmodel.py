# Generated by Django 4.1.3 on 2022-11-18 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analyzeNumber', '0002_rename_description_geeksmodel_message_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhoneMessageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phoneNumber', models.BigIntegerField(default=0)),
                ('message', models.TextField()),
                ('new_message', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='GeeksModel',
        ),
    ]

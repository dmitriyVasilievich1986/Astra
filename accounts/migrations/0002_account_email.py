# Generated by Django 3.1.4 on 2021-01-03 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]

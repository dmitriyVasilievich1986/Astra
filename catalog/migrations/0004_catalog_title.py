# Generated by Django 3.1.4 on 2021-01-02 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0003_catalog_full_catalog'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalog',
            name='title',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]

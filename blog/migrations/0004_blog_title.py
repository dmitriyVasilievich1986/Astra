# Generated by Django 3.1.4 on 2021-01-02 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_blog_catalog'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]

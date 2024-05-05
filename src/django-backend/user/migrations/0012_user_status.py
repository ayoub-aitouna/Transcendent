# Generated by Django 5.0.4 on 2024-04-26 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_user_coins_user_current_xp_user_ranking_logs'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('online', 'Online'), ('offline', 'Offline'), ('ingame', 'Ingame'), ('away', 'Away')], default='offline', max_length=10),
        ),
    ]
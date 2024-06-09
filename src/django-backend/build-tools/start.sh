#!/bin/bash
# source /var/app/venv/bin/activate
# python3 manage.py runserver
sleep 10
python3 manage.py makemigrations
python3 manage.py migrate
exec "$@"


#!/bin/bash
# source /var/app/venv/bin/activate
# python3 manage.py runserver
python3 manage.py migrate
exec "$@"

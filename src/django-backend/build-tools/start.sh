#!/bin/bash
# source /var/app/venv/bin/activate
# python3 manage.py runserver
init=false

if $init; then
    echo "Creating Django Project"
    django-admin startproject transcendent .
    echo "Migrating Django Backend"
    python3 manage.py makemigrations
    python3 manage.py migrate
    echo "Django Backend Migrated"
fi

exec "$@"

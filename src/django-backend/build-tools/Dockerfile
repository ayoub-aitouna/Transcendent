FROM debian:bullseye

# Install Python 3.9
RUN apt-get update && apt-get install -y python3.9 python3-pip zsh git curl
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN mkdir -p /var/app


# Set the working directory
WORKDIR /var/app
COPY requirements.txt /var/requirements.txt
RUN pip3 install -r /var/requirements.txt

# Set zsh as the default shell
SHELL ["/bin/zsh", "-c"]

# Expose the port
EXPOSE 8000
COPY start.sh /var/app/start.sh

# Run the Django project
ENTRYPOINT [ "sh", "build-tools/start.sh" ]
CMD ["python3", "-u", "manage.py", "runserver", "0.0.0.0:8000"]
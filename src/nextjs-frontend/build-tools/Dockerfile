FROM debian:bullseye

# Install Node.js 18
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Set the working directory

WORKDIR /var/app
ENTRYPOINT [ "sh", "build-tools/start.sh" ]
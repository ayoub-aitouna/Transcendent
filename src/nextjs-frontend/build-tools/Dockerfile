FROM debian:bullseye

# Install Node.js 18
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN apt install zsh git -y
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Set the working directory

WORKDIR /var/app
ENTRYPOINT [ "sh", "build-tools/start.sh" ]
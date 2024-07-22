BACKEND_HOST_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' backend)
ENV_FILE=.env.local
#check if .env.local file exists
if [ ! -f .env.local ]; then
    echo ".env.local file does not exist. Creating file..."
    touch .env.local
fi

#check if .env.local file is empty
if [ ! -s .env.local ]; then
    echo ".env.local is empty. Writing values..."
    echo "NEXT_PUBLIC_BACKEND_HOST=$BACKEND_HOST_IP" > .env.local
else
    sed -i "s|^NEXT_PUBLIC_BACKEND_HOST=.*|NEXT_PUBLIC_BACKEND_HOST=$BACKEND_HOST_IP|" .env.local
fi
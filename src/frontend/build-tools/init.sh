BACKEND_HOST_IP=$(hostname -i | awk '{print $1}')
PORT=4433
ENV_FILE=.env.local

#check if .env.local file exists
if [ ! -f .env.local ]; then
    echo ".env.local file does not exist. Creating file..."
    touch .env.local
fi

#check if .env.local file is empty
if [ ! -s .env.local ]; then
    echo ".env.local is empty. Writing values..."
    echo "NEXT_PUBLIC_BACKEND_IP=$BACKEND_HOST_IP" > .env.local
	echo "NEXT_PUBLIC_BACKEND_PORT=$PORT" >> .env.local
	echo 'NEXT_PUBLIC_BACKEND_HOST=$NEXT_PUBLIC_BACKEND_IP:$NEXT_PUBLIC_BACKEND_PORT' >> .env.local
else
    sed -i "s|^NEXT_PUBLIC_BACKEND_IP=.*|NEXT_PUBLIC_BACKEND_IP=$BACKEND_HOST_IP|" .env.local
fi
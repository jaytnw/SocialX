echo "Start SocialX"
docker-compose up -d

docker-compose run authentication_server sh -c "npx prisma migrate dev --name init"


docker-compose run resource_server sh -c "npx prisma migrate dev --name init"
docker-compose run resource_server yarn seed

echo "Open http://localhost:8080 with your browser to see the result"

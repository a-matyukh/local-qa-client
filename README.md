sudo docker build . -t amatyukh/local-qa-client
sudo docker push amatyukh/local-qa-client
docker run --rm -p 9000:80 amatyukh/local-qa-client

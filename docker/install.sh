#!/usr/bin/env bash

docker-compose exec wordpress curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
docker-compose exec wordpress chmod +x wp-cli.phar
docker-compose exec wordpress mv wp-cli.phar /usr/local/bin/wp

docker-compose exec wordpress apt-get update
docker-compose exec wordpress apt-get -y install mysql-client


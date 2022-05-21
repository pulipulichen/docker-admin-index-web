BASEDIR=$(dirname "$0")
cd "$BASEDIR"
cd ..

docker-compose rm -f
docker-compose run app npm run w3.webpack-watch-build-production
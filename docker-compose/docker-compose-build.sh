BASEDIR=$(dirname "$0")
cd "$BASEDIR"
cd ..

docker-compose rm -f
docker-compose build
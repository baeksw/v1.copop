build:
	docker-compose -f docker-compose.yml build

up:
	docker-compose -f docker-compose.yml up

down:
	docker-compose -f docker-compose.yml down

clean:
	docker-compose -f docker-compose.yml down -v

reload: clean build up
	echo "reload"

db:
	docker-compose up db


web:
	docker-compose up web 

createadmin:
	docker-compose run  web python manage.py createadmin

makemigrations:
	docker-compose run  web python manage.py makemigrations
migrate:
	docker-compose run  web python manage.py migrate
shell:
	docker-compose run  web python manage.py shell_plus

runserver:
	docker-compose run -p 8000:8000 web

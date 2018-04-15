# Makefile for Agility

# See if Python is installed
PIP := $(shell command -v pip2 2> /dev/null)

# See if Flask is installed
FLASK := $(shell python2 -W ignore -c "help('modules');" | sed 's/ /\n/g' | grep flask)

#See if sqlite3 is installed
SQLITE3 := $(shell command -v sqlite3 2> /dev/null)

sqlite3_check:
	$(info Checking if SQLite3 is installed...)
ifndef SQLITE3
	$(error SQLite3 not installed)
endif

# Creates a sqlite3 database file with the schema pre-configured
database: sqlite3_check
	sqlite3 agility.db ".read db/schema.sql"
	sqlite3 agility.db "PRAGMA foreign_keys = TRUE;"

# Test data for db
testDB: database
	sqlite3 agility.db ".read db/test.sql"

client_install:
	cd client && npm install

webserver: flask_check
	$(info Installing Webserver....)

python_check:
	$(info Checking if Pip is installed....)
ifndef PIP
	$(error pip 2.7 not installed)
endif
	$(info PIP found at "$(PIP)")

flask_check: python_check
	$(info Checking if Flask is installed....)
ifndef FLASK
	$(info Flask not installed, attempting to install)
	$(shell pip2 install flask)
endif
	$(info Flask found)

#execute ngrok to expose our server to github
webhook_serv:
	./ngrok http 4567

# Runs PIP and any other required package managers to install third-party dependencies.
install: database client_install webserver
	@echo "Installing...." && sleep 2 && echo "done!"

# Runs the project
run:
	@echo "run the app!"

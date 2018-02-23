# Makefile for Agility

# See if Python is installed
PIP := $(shell command -v pip2 2> /dev/null)

# See if Flask is installed
FLASK := $(shell python -W ignore -c "help('modules');" | sed 's/ /\n/g' | grep flask)

#See if sqlite3 is installed
SQLITE3 := $(shell command -v sqlite3 2> /dev/null)

sqlite3_check:
	echo "Checking if SQLite3 is installed... "
ifndef SQLITE3
	$(error SQLite3 not installed)
endif

# Creates a sqlite3 database file with the schema pre-configured
database: sqlite3_check
	sqlite3 agility.db ".read db/schema.sql" 

# Test data for db
testDB:
	sqlite3 agility.db ".read db/UserTest.sql"
	
client_install:
	cd client && npm install

webserver: flask_check
	echo "Installing Webserver...." && pip install flask

python_check: 
	echo "Checking if Pip is installed.... "
ifndef PIP
	$(error pip 2.7 not installed)
endif

flask_check: python_check
	echo "Checking if Flask is installed.... "
ifndef FLASK
	$(error Flask not installed) #Placeholder for testing
endif

# Runs PIP and any other required package managers to install third-party dependencies.
install: database client_install webserver
	echo "Installing...." && sleep 2 && echo "done!"

# Runs the project
run: 
	echo "run the app!"



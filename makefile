# Makefile for Agility

# See if Python is installed
PIP := $(shell command -v pip2 2> /dev/null)

# See if Flask is installed
FLASK := $(shell python -W ignore -c "help('modules');" | sed 's/ /\n/g' | grep flask)

#See if SQLite3 is installed
SQL := $(shell command -v sqlite3 2> /dev/null)

sqlite3_check:
	echo "Checking if SQLite3 is installed... "
	  if [ ! -z 'which sqlite3' ]; 
	  then echo "teamdoitnow" fi

# Creates a sqlite3 database file with the schema pre-configured
database:
	echo "Building the database...." && sleep 2 && echo "done!"
	sqlite3 agility.db "CREATE TABLE User(user_id INTEGER PRIMARY KEY, email VARCHAR(50), password_hash VARCHAR(20), role VARCHAR(30));"
	sqlite3 agility.db "CREATE TABLE Feature_Request(feature_id INTEGER PRIMARY KEY, user_id INTEGER, name VARCHAR(50), description VARCHAR(150), FOREIGN KEY (user_id) REFERENCES User(user_id));"
	sqlite3 agility.db "CREATE TABLE Sprint(sprint_id INTEGER PRIMARY KEY, name VARCHAR(30));"
	sqlite3 agility.db "CREATE TABLE Story(story_id INTEGER PRIMARY KEY, feature_id INTEGER, user_id INTEGER, sprint_id INTEGER, name VARCHAR(30), description VARCHAR(150), FOREIGN KEY (feature_id) REFERENCES Feature_Request(feature_id), FOREIGN KEY (user_id) REFERENCES User(user_id), FOREIGN KEY (sprint_id) REFERENCES Sprint(sprint_id));"
	
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



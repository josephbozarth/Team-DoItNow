# Makefile for Agility

# See if Python is installed
PYTHON := $(python -V 2> /dev/null)

# See if Flask is installed
FLASK := $(python -W ignore -c "help('modules');" | sed 's/ /\n/g' | grep flask)

# Creates a sqlite3 database file with the schema pre-configured
database:
	echo "Building the database...." && sleep 2 && echo "done!"

webserver: flask_check
	echo "Installing Webserver...." && pip install flask

python_check: 
	echo "Checking if Python is installed.... "
	ifndef PYTHON
		$(error pip 2.7 not installed)
	endif

flask_check: python_check
	echo "Checking if Flask is installed.... "
	ifndef FLASK
		$(error Flask not installed) #Placeholder for testing
	endif

# Runs PIP and any other required package managers to install third-party dependencies.
install: database webserver
	echo "Installing...." && sleep 2 && echo "done!"

# Runs the project
run: 
	echo "run the app!"



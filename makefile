# Makefile for Agility

# Creates a sqlite3 database file with the schema pre-configured
database:
	echo "Building the database...." && sleep 2 && echo "done!"


# Runs PIP and any other required package managers to install third-party dependencies.
install: database
	echo "Installing...." && sleep 2 && echo "done!"

# Runs the project
run: 
	echo "run the app!"

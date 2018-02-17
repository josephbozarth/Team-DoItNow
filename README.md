# Agility Project

## Getting Started

### Prerequisites
- Bash (either on Linux or via Git Bash for Windows)
- Make
- Sqlite
- Python
- PIP
- NodeJS
- NPM

### Installation

Before running the application, install lthe required components with make:

    make install

## Development

### Running the Web Server

The web server will continue running within the terminal.

    cd server && ./startApp.sh

### Running Client Dev Build

When running the client dev build, webpack will continue running in the terminal and watch for any changes which require a re-build. It will then automatically re-package all required files and deploy them to the correct location in the `/server` folder.

    cd client && npm run dev

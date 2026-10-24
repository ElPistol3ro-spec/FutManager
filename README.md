# FutManager
# Project Overview
FutManager is a functional web application designed to help local football clubs manage their players, match fixtures and training sessions.

## Objectives
Centralize Squad Data - Allow coaches to register, update and manage players from a single roster management platform
Coordinate Fixtures - Provide an interface to plan feature matches and monitor past results.
Schedule Training - Organize training sessions and keep track of player development

## Technologies Used
Frontend - HTML, Javascript and CSS custom layouts
Version Control and Tracking - Git version control tracking managed via Github Project Boards

## API Endpoints
'GET /players' - Pulls the complete registration roster logs to build out table interfaces.
'POST /players - Registers new players into the storage array.
'DELETE /players/:id' - Drops a player out of the database.
'PATCH /matches/:id' - Records fixtures and scores with deleting existing data.

## Setup Instructions
Follow this steps to get this application in a local environment.

### 1. Clone the Repository
git clone [https://github.com/ElPistol3ro-spec/FutManager.git]
cd FutMnager
### 2. Install the Database server
This project uses 'json-server' to mock the production database:
* Launch the database engine on port 3000 in your terminal and run the following command
  "npx json-server --watch db.json --port 3000"
* Leave this terminal window open to allow the frontend to sync data.

## Live Links
Deployment Link: https://[ElPistol3ro-spec].github.io/[FutMnager]
Github Repository: https://github.com/ElPistol3ro-spec/FutManager.git
Figma UI/UX Wireframe: https://www.figma.com/design/SogUIR6jlMGqf7LuHu6Ad0/FutManager-UI-Design?node-id=0-1&p=f&t=j5T7PBRc8bP8slOh-0

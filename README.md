# Flashcards Study App
## React App to study virtual flashcard sets

## Tools and Dependencies
  - Node.js: node forms the basis of the application helping to manage packages and scripts
  - Data Storage: 
    - Data is stored locally in `./data/db.json` 
    - Necessary queries are formatted in `./src/utils/api`
    - Currently, this requires the app to run locally
    
## Setup
  - In the future, stable data storage will be implemented on a remote database, allowing the app to run on the web. Until then, users must spin a server locally.
  
  - To spin this server locally, fork and clone this repo then run the following commands in the terminal: 
    ```bash
    npm install
    ```
    ```bash
    npm run start:server
    ```
  - Start the react app separately with:
    ```bash
    npm run start:react
    ```
  - To run both the server and app the simpler command ```bash npm run start``` may be used
  

    

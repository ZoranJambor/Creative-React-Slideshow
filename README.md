# Creative React Slideshow

A simple slideshow app built in React, which shows a different random image on every slide, pulled from the [Unsplash API](https://unsplash.com/developers). 

## Structure

The project consists of `backend` as Express server and `frontend` as React app, with each part residing in the respective top-level directory.

### Backend

The backend is a simple [Express](https://expressjs.com/) server with the only purpose to serve as a proxy for the Unsplash API. It sends the authentication header with each request, as required by the API. 

By default, the server listens on the port 5000, but it can be configured through the `.env` file.

If you're changing the port, you'll have to update `proxy` value in `/frontend/package.json` to reflect your backend settings.

Make sure you rename `/backend/.env-example` to `backend/.env` and fill in your Unsplash Access Key. 

To find it, you'll need to create an application on the [Unsplash API portal](https://unsplash.com/developers).

### Frontend

Frontend is a simple React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app) 
 that utilizes [React Router](https://github.com/ReactTraining/react-router) for navigation and [React Transition Group](https://github.com/reactjs/react-transition-group) for the page and slide animations.

Data for slides is loaded from `/frontend/src/Slide/Data.js`, where `keyword` value is used as a query param for Unsplash API, to ensure a random photo is somewhat relevant to the content.

`Home`, `Contact` & `Not Found` pages can be changed and tweaked in their respective components. 

## Installation

Run `yarn` (alternatively `npm install`) from your command line, in both `/backend` and `/frontend` directories, to install all dependencies. 

You'll need to have [Yarn](https://yarnpkg.com/en/) installed on your system for this to work.

## Available Scripts

All scripts can be run from the `/frontend` directory.

### `yarn start`

It runs the frontend & backend in the development mode. The React app is available on [http://localhost:3000](http://localhost:3000), while the server is located on [http://localhost:5000](http://localhost:5000).

Alternatively, you can run backend & frontend separately, since this command essentially runs `start-react` and `start-server` simultaneously.

### `yarn start-react`

Starts the React frontend in the development mode on [http://localhost:3000](http://localhost:3000) 


### `yarn start-server`

Starts the server on the port 5000 by default, but it can be configured via `/backend/.env` file. You can access the server on [http://localhost:5000](http://localhost:5000).


### `yarn test`

Launches the test runner in the interactive watch mode. Tests are located in respective component folders (for example, `App.js` test is located in the same directory, in `App.test.js`).

Tests are written using [React Testing Library](https://github.com/kentcdodds/react-testing-library).

### `yarn build`

Builds the app for production to the `build` folder.


### `yarn start-concurrently`

If your `yarn start` fails (which could be the case on Windows), try using [start-concurrently](https://www.npmjs.com/package/concurrently) package (you'll have to install it yourself), since it should be more compatible than the method used in `yarn start`.  

The drawback of `start-concurrently` is that it doesn't clear the console output properly, so you'll see backend and frontend messages mixed.

Alternatively, you can run backend and frontend separately using `yarn start-react` and `yarn start-server`.

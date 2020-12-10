# React Todo App

A simple [React](https://reactjs.org/) + [Redux](https://redux.js.org/) app designed to consume [laravel-todo-api](https://github.com/lemuelbcastro/laravel-todo-api). Generated from [react-redux-starter](https://github.com/lemuelbcastro/react-redux-starter) template.

## Installation

Navigate to the project's root directory and run:

```bash
npm install
```

Create any of these `.env` files:

| ENV File         | Description                             |
| ---------------- | --------------------------------------- |
| .env             | Default                                 |
| .env.local       | Loaded for all environments except test |
| .env.development | Loaded on `npm start`                   |
| .env.production  | Loaded on `npm run build`               |
| .env.test        | Loaded on `npm test`                    |

Add these environment variables:

```sh
REACT_APP_NAME=Todo App
REACT_APP_API_BASE=http://localhost:8000/api
REACT_APP_SESSION_KEY=todo-app-session
```

## Available Scripts

### `npm start`

Runs the app in the development mode.

### `npm format`

Format all the code based on the prettier and linting configuration.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

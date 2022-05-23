# Crown Clothing mock e-commerce application

---

## Description

This application is still in progress.

This is a mock e-commerce application created with React, Redux, Styled Components, Firebase, and (eventually) Stripe. It has functioning user authentication and management via Firebase, including Google sign in. The products displayed are fetched from the Firebase database and are maintained in application state using Redux Sagas and Redux-Persist.

---

## Branches

There are different state management solutions in different branches of the application. (Note: some features may not be implemented in earlier branches, such as persisting user sessions.) The branch state management solutions are as follows:

- `main` and `redux-saga-dev` :
  - Redux Sagas
- `redux-dev` :
  - Redux Thunks
- `dev` :
  - React Context

---

## Deployment

The `main` branch of this application is deployed using Netflify at <https://heartfelt-frangipane-722cca.netlify.app/>.

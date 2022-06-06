# Crown Clothing mock e-commerce application

---

## Description

This application is still in progress. It is followed from the ZTM online course: Complete React Developer in 2022 (w/ Redux, Hooks, GraphQL), with some slight modifications.

This is a mock e-commerce application created with React, Redux, Styled Components, Firebase, and Stripe. It has functioning user authentication and management via Firebase, including Google auth. The products displayed are fetched from the Firebase database and are maintained in application state using Redux Sagas and Redux-Persist.

---

## Branches

There are different branches for different impolementations of the application. (Note: some features may not be implemented in earlier branches, such as persisting user sessions.) The branches are as follows:

- `main` and `typescript` :
  - TS/TSX, state management with Redux Sagas, Stripe payment integration
- `redux-saga-dev` :
  - JS/JSX, state management with Redux Sagas, Stripe payment integration
- `redux-dev` :
  - JS/JSX, state management with Redux Thunks
- `dev` :
  - JS/JSX, state management with React Context

---

## Deployment

The `main` branch of this application is deployed using Netflify at <https://heartfelt-frangipane-722cca.netlify.app/>.

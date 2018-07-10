import { createClass } from 're-base'
import { initializeApp, database } from 'firebase'
import  { compose } from './lib'

const config = {
  apiKey: "AIzaSyA8HQIDfIZ-AKKaLqfZNNviZPRFaUXZOTY",
      authDomain: "avatar-64402.firebaseapp.com",
      databaseURL: "https://avatar-64402.firebaseio.com",
      projectId: "avatar-64402",
      storageBucket: "avatar-64402.appspot.com",
      messagingSenderId: "990982199385"
}

// const base = compose(createClass, database, initializeApp)(config)

const base = createClass(database(initializeApp(config)))

const baseState = {
  idle: 'IDLE',
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export {base, baseState}

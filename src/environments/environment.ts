// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: false,
  firebase: {
    apiKey: "AIzaSyDCdKYtTcKi-aVOGn9rs9WytnMGyc2FU2U",
    authDomain: "bosquejos-homileticos.firebaseapp.com",
    projectId: "bosquejos-homileticos",
    storageBucket: "bosquejos-homileticos.appspot.com",
    messagingSenderId: "770453743079",
    appId: "1:770453743079:web:bf61b1919f8679b8aa0942"
  },
  firebaseEmulator: {
    host: 'localhost:8081',
    ssl: false,
    apiKey: "AIzaSyDCdKYtTcKi-aVOGn9rs9WytnMGyc2FU2U",
    authDomain: "bosquejos-homileticos.firebaseapp.com",
    projectId: "bosquejos-homileticos",
    appId: "1:770453743079:web:bf61b1919f8679b8aa0942",
    messagingSenderId: "770453743079"
  },
  api: {},
  config_firestore_emulator: {
    host: 'localhost:8080',
    ssl: false,
    experimentalAutoDetectLongPolling: true
  },
  config_auth_emulator: {
    host: 'localhost:9099',
    ssl: false,
    experimentalAutoDetectLongPolling: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

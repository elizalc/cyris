// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBB5JKUZCxMZ9JuK5lQeA9Zce5-bG5es80",
    authDomain: "cyris-18.firebaseapp.com",
    databaseURL: "https://cyris-18.firebaseio.com",
    projectId: "cyris-18",
    storageBucket: "",
    messagingSenderId: "947646433556"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
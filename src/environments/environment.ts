// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAWnzqCPvyWsBC1WLzfcDJ_Yc5Jxj2wZQ8',
    authDomain: 'eventformsdb.firebaseapp.com',
    databaseURL: "https://eventformsdb.firebaseio.com",
    projectId: "eventformsdb",
    storageBucket: "eventformsdb.appspot.com",
    messagingSenderId: "38192161139"
  }
};

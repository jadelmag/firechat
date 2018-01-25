// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAaOyGgmpACNINuwWBYC1Lw2dKL5j9K78w',
    authDomain: 'firechat-d9e1a.firebaseapp.com',
    databaseURL: 'https://firechat-d9e1a.firebaseio.com',
    projectId: 'firechat-d9e1a',
    storageBucket: 'firechat-d9e1a.appspot.com',
    messagingSenderId: '227347241075'
  }
};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const DOMAIN = 'localhost:5000';
const HOST_BASE_URL = `http://${DOMAIN}/`;
const API_BASE_URL = `${HOST_BASE_URL}api/`;

export const environment = {
  production: false,
  domain: DOMAIN,
  hostBaseUrl: HOST_BASE_URL,
  apiBaseUrl: API_BASE_URL,
  authApiBaseUrl: `${API_BASE_URL}auth/`,
  userApiBaseUrl: `${API_BASE_URL}users/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

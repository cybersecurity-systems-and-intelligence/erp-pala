const jwt_decode = require('jwt-decode');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZlMzY2Y2JhNzQ1ODAwMTc3MTYxOWIiLCJub21icmUiOiJkcyIsImNvcnJlbyI6ImRvcmlhbkBnbWFpbC5jb20iLCJuaXZlbF9hY2Nlc28iOiJwcm92ZWVkb3IiLCJpYXQiOjE2MTA1NzQ2ODEsImV4cCI6MTYxMDY2MTA4MX0.IedOEjVN_81gVtcKCLNuOUaYoNbkTQTH3tVGZWP5gd8';

var decoded = jwt_decode(token);

/*{exp: 10012016 name: john doe, scope:['admin']}*/
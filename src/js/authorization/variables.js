const RSSCHOOL_API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const VALIDATE_EMAIL = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
const VALIDATE_PASSWORD = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&? "]).*$');



export {
  RSSCHOOL_API_URL, VALIDATE_EMAIL, VALIDATE_PASSWORD,
};
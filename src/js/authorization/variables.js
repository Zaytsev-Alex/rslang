const RSSCHOOL_API_URL = 'https://afternoon-falls-25894.herokuapp.com/';

const LOGIN_PAGE = document.querySelector('.login-page');
const REGISTRATION_FORM = document.querySelector('#registration-form');
const AUTHORIZATION_FORM = document.querySelector('#authorization-form');

const HAVE_ACCOUNT = document.querySelector('#have-account');
const CREATE_ACCOUNT = document.querySelector('#create-account');
const LOG_OUT_BUTTON = document.querySelector('#log-out-button');

const VALIDATE_EMAIL = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
const VALIDATE_PASSWORD = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&? "]).*$');

export {
  RSSCHOOL_API_URL, LOGIN_PAGE, REGISTRATION_FORM, AUTHORIZATION_FORM, HAVE_ACCOUNT, CREATE_ACCOUNT,
  LOG_OUT_BUTTON, VALIDATE_EMAIL, VALIDATE_PASSWORD,
};

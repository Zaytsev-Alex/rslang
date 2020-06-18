const MAIN_TAG = document.querySelector('main');
const HTMLTemplate = document.createElement('section');

HTMLTemplate.className = 'login-page';
HTMLTemplate.innerHTML = `<h1 class="login-page__title">RS lang</h1>
<div class="form-block">
  <form action="users" method="POST" class="registration hide" id="registration-form">
    <h2 class="registration__title">Registration</h2>
    <input type="email" name="email" id="registration-email" placeholder="Email" autocomplete="off" required>
    <p class="error registration__error" id="email-error"></p>
    <input type="password" name="password" id="registration-password" placeholder="password" autocomplete="off" required>
    <p class="error registration__error" id="password-error"></p>
    <button class="button registration__button" id="registration__button" type="submit">Create account</button>
    <p class="registration__switch" id="have-account">I already have account</p>
  </form>
  <form action="#" method="POST" class="authorization hide" id="authorization-form">
    <h2 class="authorization__title">Log into your account</h2>
    <input type="email" name="email" id="authorization-email" placeholder="Email" autocomplete="off" required>
    <input type="password" name="password" id="authorization-password" placeholder="password" autocomplete="off" required>
    <p class="error authorization__error" id="authorization-error"></p>
    <button class="button authorization__button" id="authorization__button" type="submit">Login</button>
    <p class="registration__switch" id="create-account">Create account</p>
  </form>
</div>`;

MAIN_TAG.append(HTMLTemplate);

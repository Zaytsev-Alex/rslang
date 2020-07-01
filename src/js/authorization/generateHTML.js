export default function genHTMLauth() {
  const HTMLTemplate = document.createElement('div');

  HTMLTemplate.innerHTML = `<header class="header wrapper">
  <div class="logo">RS lang</div>
  <div class="header__buttons">
    <button type="button" class="button header__button hide" id="log-out-button">Выйти</button>
  </div>
  </header>

  <main class="wrapper">
  <section class="login-page">
    <div class="form-block">
      <form action="users" method="POST" class="registration hide" id="registration-form">
        <h2 class="registration__title">Регистрация</h2>
        <input type="email" name="email" id="registration-email" placeholder="email" required>
        <p class="error registration__error" id="email-error"></p>
        <input type="password" name="password" id="registration-password" placeholder="password" required>
        <p class="error registration__error" id="password-error"></p>
        <button class="button registration__button" id="registration__button" type="submit">Создать аккаунт</button>
        <p class="registration__switch" id="have-account">У меня уже есть аккаунт</p>
      </form>
      <form action="#" method="POST" class="authorization hide" id="authorization-form">
        <h2 class="authorization__title">Войти</h2>
        <input type="email" name="email" id="authorization-email" placeholder="email" required>
        <input type="password" name="password" id="authorization-password" placeholder="password" required>
        <p class="error authorization__error" id="authorization-error"></p>
        <button class="button authorization__button" id="authorization__button" type="submit">Войти</button>
        <p class="registration__switch" id="create-account">Создать аккаунт</p>
      </form>
    </div>
  </section>
  </main>`;

  document.body.append(HTMLTemplate);
  test();
}

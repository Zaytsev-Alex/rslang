export default async function translate(text) {
  try {
    const response = await fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200510T091420Z.9ae971b75c2234dc.f6fe296f973dffd4841bad1f0b9048c8addd6195&text=${text}&lang=en-ru`,
    );
    const translation = await response.json();

    return translation.text[0];
  } catch (error) {
    console.warn(error);
    return false;
  }
}

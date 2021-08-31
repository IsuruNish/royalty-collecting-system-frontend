const signup = document.querySelector("#signupBtn");
const login = document.querySelector("#loginBtn");
const containerLogin = document.querySelector(".visuallyhidden");
const containerSignup = document.querySelector(".containerSignup");

login.addEventListener("click", () => {
  containerSignup.classList.add("visuallyhidden");
    setTimeout(function () {
      containerSignup.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerLogin.classList.remove('hidden');
        containerSignup.classList.remove('containerSignup');
        containerLogin.classList.add("containerLogin");
      }, 800);

      setTimeout(function () {
        containerLogin.classList.remove('visuallyhidden');
      }, 1000);
});


signup.addEventListener("click", () => {
  containerLogin.classList.add("visuallyhidden");
    setTimeout(function () {
      containerLogin.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerSignup.classList.remove('hidden');
        containerLogin.classList.remove('containerLogin');
        containerSignup.classList.add("containerSignup");
      }, 800);

      setTimeout(function () {
        containerSignup.classList.remove('visuallyhidden');
      }, 1000);
});

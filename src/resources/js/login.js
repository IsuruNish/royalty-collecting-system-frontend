const signup = document.querySelector("#signupBtn");
const login = document.querySelector("#loginBtn");
const containerLogin = document.querySelector(".containerLogin");
const containerSignup = document.querySelector(".visuallyhidden");

signup.addEventListener("click", () => {
    containerLogin.classList.add("visuallyhidden");
    setTimeout(function () {
        containerLogin.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerSignup.classList.remove('hidden');
        containerSignup.classList.add("containerSignup");
      }, 800);

      setTimeout(function () {
        containerSignup.classList.remove('visuallyhidden');
      }, 1000);
});


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

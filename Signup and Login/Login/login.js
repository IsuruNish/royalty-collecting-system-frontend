const signup = document.querySelector("#signupBtn");
const login = document.querySelector("#loginBtn");
const containerLogin = document.querySelector(".containerLogin");
const containerSignup = document.querySelector(".visuallyhidden");

signup.addEventListener("click", () => {
    containerLogin.classList.add("visuallyhidden");
    setTimeout(function () {
        containerLogin.classList.add('hidden');
      }, 600);

    //   containerSignup.classList.remove('visuallyhidden');
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

    //   containerLogin.classList.remove('visuallyhidden');
      setTimeout(function () {
        containerLogin.classList.remove('hidden');
        containerSignup.classList.remove('containerSignup');
        containerLogin.classList.add("containerLogin");
      }, 800);

      setTimeout(function () {
        containerLogin.classList.remove('visuallyhidden');
      }, 1000);
});




// btn.addEventListener('click', function () {
  
//   if (box.classList.contains('hidden')) {
//     box.classList.remove('hidden');
//     setTimeout(function () {
//       box.classList.remove('visuallyhidden');
//     }, 20);
//   } else {
//     box.classList.add('visuallyhidden');    
//     box.addEventListener('transitionend', function(e) {
//       box.classList.add('hidden');
//     }, {
//       capture: false,
//       once: true,
//       passive: false
//     });
//   }
  
// }, false);
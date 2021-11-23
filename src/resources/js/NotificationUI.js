// window.addEventListener('DOMContentLoaded',()=>{
//   let token = Cookies.get('Authorization');
//   if(token == undefined){
//       popUpFromDown("login to continue",'red');
//       setTimeout(function() {
//           window.location.href='../landing_page/login.html';
//       },3000);
//   }

//   else{
//       let options = {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//           },
//       }

//       fetch("http://localhost:8080/OSCA_war_exploded/ApplyLicenseServlet", options)
//       .then(res => res.json())
//       .then((data) => {
//       ut = data['utype']
//       console.log(data);
//       if(ut!=5){
//           popUpFromDown("Access denied!",'red');
//           setTimeout(function() {
//               window.location.href='../landing_page/login.html';
//           },3000);
//           }
//           else{
//             const loading = document.getElementById("loader-wrapper");
//             const realpage = document.getElementById("notsoLoad");
//             let fname = document.getElementById("Topname");
//             let pic = document.getElementById("profilePicSmall");

//             fname.innerHTML = "Hello "+ data['fname']+",";
//             pic.src = data['DPpath'];
//             loading.classList.add("hideME");
//             realpage.classList.remove("hideME");

//             makeArray(data['songNames']);
//             makeArray2(data['songIds']);
//             makeArray3(data['fNames'],  data['lNames'], data['songYears']);

//           }        
//       })
//       .catch(err =>{
//           popUpFromDown("Login again",'red');
//           setTimeout(function() {
//               window.location.href='../landing_page/login.html';
//           },3000);
//           console.error(err);
//         });
//   }
// });





function Delete(is){
    var element = is.parentElement;
    element.remove();
  }
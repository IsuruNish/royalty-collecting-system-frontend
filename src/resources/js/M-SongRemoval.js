
// window.addEventListener('DOMContentLoaded',()=>{
//     let token = Cookies.get('Authorization');
//     if(token == undefined){
//         alert("login to continue")
//         window.location.href='../landing_page/login.html';
//     }

//     else{
//         let options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//         }

//         fetch("http://localhost:8080/OSCA_war_exploded/SARemoveSOServlet", options)
//         .then(res => res.json())
//         .then((data) => {

//             console.log(data);
//             if(data != 404){
//                 ut = data[0]['userType']
//                 if(ut!=1){
//                     alert("Access denied!");
//                     setTimeout(function() {
//                         window.location.href='../landing_page/login.html';
//                     },1000);
//                 }
//                 else{
//                     const loading = document.getElementById("loader-wrapper");
//                     const realpage = document.getElementById("notsoLoad");
//                     const theDiv = document.getElementById("SODiv");
                    
//                     var Topname = document.getElementById('Topname');
//                     Topname.innerHTML = "Hello "+ data[0]['fname']+",";

//                     var picSmall = document.getElementById('profilePicSmall');           
//                     picSmall.src = data[0]['DPpath'];

//                     for (let i = 1; i < data.length; i++) {
//                         var insideDiv = document.createElement("div");
//                         var uid = document.createElement("h2");
//                         var name = document.createElement("h2");
//                         var email = document.createElement("h2");
//                         var phone = document.createElement("h2");
//                         var button = document.createElement("button");
                        
//                         theDiv.appendChild(insideDiv);

//                         insideDiv.classList.add("profileCard");
//                         button.classList.add("remove-btn");
//                         button.setAttribute('id', 'deletebtn');

//                         uid.innerHTML =  data[i]['uid'];
//                         name.innerHTML =  data[i]['fname']+" "+data[i]['lname'];
//                         email.innerHTML =  data[i]['email']
//                         phone.innerHTML =  data[i]['phone']

//                         button.innerHTML =  "Remove User"
//                         insideDiv.appendChild(uid);
//                         insideDiv.appendChild(name);
//                         insideDiv.appendChild(email);
//                         insideDiv.appendChild(phone);
//                         insideDiv.appendChild(button);

//                         button.onclick = function () {
//                             if (confirm("Do you want to delete "+ data[i]['fname']+" "+data[i]['lname']+ " ?")) {
//                                 var userEmail = this.previousSibling.innerHTML;
//                                 var userName = this.previousSibling.previousSibling.previousSibling.innerHTML;
//                                 var userPhone = this.previousSibling.previousSibling.innerHTML;
                                
//                                 let payload = {
//                                     "email":userEmail,
//                                     "fname":userName,
//                                     "phone":userPhone
//                                 }

//                                 let options = {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/json',
//                                         'Authorization': `Bearer ${token}`
//                                     },
//                                     body: JSON.stringify(payload) 
//                                 }
                        
//                                 fetch("http://localhost:8080/OSCA_war_exploded/SARemoveSOServlet", options)
//                                 .then(window.location.href='../super_admin/SA - removeSO.html');
//                             }
//                         };

//                         var searchBar = document.getElementById("search");
//                         searchBar.onkeyup = function(){
//                             var value = this.value;
//                             console.log(value);

//                             var filteredData = [];
//                             for (let i = 1; i < data.length; i++) {
//                                 value = value.toLowerCase();
//                                 console.log(data);
//                                 var filterFName = data[i]['fname'].toLowerCase();
//                                 var filterLName = data[i]['lname'].toLowerCase();
//                                 var filterEmail = data[i]['email'].toLowerCase();
//                                 var filterPhone = data[i]['phone'].toLowerCase();
//                                 var filterID = data[i]['uid'].toString();  
                                
//                                 if(filterFName.includes(value) || filterLName.includes(value) || filterEmail.includes(value) || filterPhone.includes(value) || filterID.includes(value)){
//                                     filteredData.push(data[i]);
//                                 }  
//                             }
//                             const mainDiv = document.getElementById('SODiv');
//                             deleteDiv(mainDiv)
//                             build(filteredData);
//                         }


//                         // theDiv.append('<li><img src="images/' + i + '.jpg"></li>');
    
//                     }
                
//                     setTimeout(function() {
//                         loading.classList.add("hideME");
//                         realpage.classList.remove("hideME");
//                     },500);

//                 }
//             }
//             else{
//                 alert("Login again!");
//                 setTimeout(function() {
//                     window.location.href='../landing_page/login.html';
//                 },1000);
//             }

//         });
//     }
// });



// var cards = document.getElementById('profileCard');
// // var smallCard = document.getElementById('showHide');

// function expand(id) {

//     console.log(id);
//     var l = document.getElementById(id);
//     console.log(l);
//     console.log(id.lastChild);
//     // console.log(l.lastChild);
//     if(id.lastChild.classList.contains('hideMe')){
//         id.lastChild.classList.remove('hideMe');
//     }

//     else if(!id.lastChild.classList.contains('hideMe')){
//         id.lastChild.classList.add('hideMe');
//     }





// };


// function build(dataset){
//     const theDiv = document.getElementById("SODiv");
    
//     for (let i = 0; i < dataset.length; i++) {
//         var insideDiv = document.createElement("div");
//         var uid = document.createElement("h2");
//         var name = document.createElement("h2");
//         var email = document.createElement("h2");
//         var phone = document.createElement("h2");
//         var button = document.createElement("button");
        
//         theDiv.appendChild(insideDiv);

//         insideDiv.classList.add("profileCard");
//         button.classList.add("remove-btn");
//         button.setAttribute('id', 'deletebtn');

//         uid.innerHTML =  dataset[i]['uid'];
//         name.innerHTML =  dataset[i]['fname']+" "+dataset[i]['lname'];
//         email.innerHTML =  dataset[i]['email']
//         phone.innerHTML =  dataset[i]['phone']

//         button.innerHTML =  "Remove User"
//         insideDiv.appendChild(uid);
//         insideDiv.appendChild(name);
//         insideDiv.appendChild(email);
//         insideDiv.appendChild(phone);
//         insideDiv.appendChild(button);

//         button.onclick = function(){
//             var txt;
//             if (confirm("Do you want to delete "+ dataset[i]['fname']+" "+dataset[i]['lname']+ " ?")){

//                 let token = Cookies.get('Authorization');
//                 if(token == undefined){
//                     alert("login to continue")
//                     window.location.href='../landing_page/login.html';
//                 }

                
//                 var userEmail = this.previousSibling.innerHTML;
//                 var userName = this.previousSibling.previousSibling.previousSibling.innerHTML;
//                 var userPhone = this.previousSibling.previousSibling.innerHTML;
                
//                 console.log("hi");

//                 let payload = {
//                     "email":userEmail,
//                     "fname":userName,
//                     "phone":userPhone
//                 }

//                 let options = {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(payload) 
//                 }
        
//                 fetch("http://localhost:8080/OSCA_war_exploded/SARemoveSOServlet", options)
//                 .then(window.location.href='../super_admin/SA - removeSO.html');
//             }
//         }
//     }
// }


// function deleteDiv(parent) {
//     if(parent.hasChildNodes()){
//         while (parent.firstChild) {
//             parent.removeChild(parent.firstChild);
//         }
//     }
// }
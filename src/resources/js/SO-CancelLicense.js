
window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
      popUpFromDown("login to continue",'red')
        window.location.href='../landing_page/login.html';
    }
  
    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
  
        fetch("http://localhost:8080/OSCA_war_exploded/SOCancelLicenseServlet", options)
        .then(res => res.json())
        .then((data) => {
  
            console.log(data);

            if(data != 404){
                ut = data['utype']
                
                if(ut!=5){
                  popUpFromDown("Access denied!",'red');
                    setTimeout(function() {
                        window.location.href='../landing_page/login.html';
                    },1000);
                }
                else{
                    const loading = document.getElementById("loader-wrapper");
                    const realpage = document.getElementById("notsoLoad");
                    const theDiv = document.getElementById("SODiv");
                  //  console.log(data['f'])
                    var Topname = document.getElementById('Topname');
                    Topname.innerHTML = "Hello "+ data['Fname']+",";
  
                    var picSmall = document.getElementById('profilePicSmall');           
                    picSmall.src = data['dpPath'];
                  
  
                    for (let i = 0; i < data['concertID'].length; i++) {
                        var ul = document.getElementById('ul');
                        var li = document.createElement("li");
                        var DivCol1 = document.createElement("div");
                        var DivCol2 = document.createElement("div");
                        var DivCol3 = document.createElement("div");
                        var DivCol4 = document.createElement("div");
                        var DivCol5 = document.createElement("div");
                        var DivCol6 = document.createElement("div");
                        var DivCol7 = document.createElement("div");


                        // var DivCol8 = document.createElement("div");
                       
                        DivCol1.setAttribute("data-label", "Concert ID");
                        DivCol2.setAttribute("data-label", "Concert Name");
                        DivCol3.setAttribute("data-label", "Concert Date");
                        DivCol4.setAttribute("data-label", "Venue");
                        DivCol5.setAttribute("data-label", "Concert Type");
                        DivCol6.setAttribute("data-label", "Refund Amount");
                        DivCol7.setAttribute("data-label", "Refund Amount");

                        // DivCol8.setAttribute("data-label", "Type");

                       

                        li.classList.add("table-row");
                        DivCol1.classList.add("col");
                        DivCol1.classList.add("col-1");
                        DivCol2.classList.add("col");
                        DivCol2.classList.add("col-2");
                        DivCol3.classList.add("col");
                        DivCol3.classList.add("col-3");
                        DivCol4.classList.add("col");
                        DivCol4.classList.add("col-4");
                        DivCol5.classList.add("col");
                        DivCol5.classList.add("col-5");
                        DivCol6.classList.add("col");
                        DivCol6.classList.add("col-6");
                        DivCol7.classList.add("col");
                        DivCol7.classList.add("col-7");
                       
                        

                        li.appendChild(DivCol1);
                        li.appendChild(DivCol2);
                        li.appendChild(DivCol3);
                        li.appendChild(DivCol4);
                        li.appendChild(DivCol5);
                        li.appendChild(DivCol6);
                        li.appendChild(DivCol7);


                      

                        DivCol1.innerHTML = data['concertID'][i];
                        DivCol2.innerHTML = data['concertName'][i];
                        DivCol3.innerHTML = data['concertDate'][i];
                        DivCol4.innerHTML = data['venue'][i];
                        DivCol5.innerHTML = data['concertType'][i];
                        DivCol6.innerHTML = data['refundAmount'][i];
                        DivCol7.innerHTML =' <i class="fas fa-trash"></i>';





                        ul.appendChild(li);

  
  
                        DivCol7.onclick = function(){
                            popUp("Do you want to delete "+ data['concertName'][i]+ " ?")
                          concertID = this.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                          console.log(concertID);
                          document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
                            hdiePopUp();
                            // console.log(data[i]['fname']+" "+data[i]['lname']);
                            
                            const loading = document.getElementById("loader-wrapper");
                            const realpage = document.getElementById("notsoLoad");
  
                            loading.classList.remove("hideME");
                            realpage.classList.add("hideME");
              
                            let token = Cookies.get('Authorization');
                            if(token == undefined){
                                popUpFromDown("login to continue",'red');
                                window.location.href='../landing_page/login.html';
                            }
                            
                            
                            
                            let payload = {
                                
                                "concertID":concertID
                            }

                            
            
                            let options = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify(payload)
                                
                            }
                            console.log(options);
                            fetch("http://localhost:8080/OSCA_war_exploded/SOCancelLicenseServlet", options)
                            .then( data => {
                              
                              popUpFromDown("Successfully canceled the license", 'greenColour');
                              setTimeout(function() {
                                window.location.href='../show_organizer/SO-CancelLicense.html';
                            },3000);
                            })
  
                            .catch(err =>{
                              popUpFromDown("SError try again", 'red');
                              setTimeout(function() {
                                  window.location.href='../show_organizer/SO-CancelLicense.html';
                              },5000);
                              console.error(err);
                            });
                          });
                      }
                    }
                
                    setTimeout(function() {
                        loading.classList.add("hideME");
                        realpage.classList.remove("hideME");
                    },500);
  
                }
            }
            else{
              popUpFromDown("Login again!",'red');
                setTimeout(function() {
                    window.location.href='../landing_page/login.html';
                },1000);
            }
  
        })
        .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              window.location.href='../landing_page/login.html';
          },5000);
          console.error(err);
        });
    }
  });
  
  
  document.getElementById("denyBTN").addEventListener("click",function(){
    hdiePopUp();
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // $(document).ready(function(){
  //   $("#search").on("keyup", function() {
  //     var value = $(this).val().toLowerCase();
  //     $("#ul li").not(":eq(0)").filter(function() {
  //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  //     });
  //   });
  // });
  
  
  
  
  
  
  
  
  
  
  
  
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#ul li").not(":eq(0)").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
  
  
  $('#update').on('click', ()=>{
    
    myFunction();
  
  })
  
  
  function myFunction() {
    
    
    // window.location.href='../landing_page/forgotpw.html';
    window.location.href='../member/M-EditSongOwnership.html';
  
  
  
    
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var checkBox1 = document.getElementById("myCheck1");
      // Get the output text
  var text1 = document.getElementById("text1");
  var image=document.getElementById("img");
  var checkBox2 = document.getElementById("myCheck2");
  var text2 = document.getElementById("text2");
  
  var checkBox3 = document.getElementById("myCheck3");
  var text3 = document.getElementById("text3");
  function myFunction1() {
      
      if (checkBox1.checked == true){
        text1.style.display = "block";
        
        image.style.display="none";
      } else {
        text1.style.display = "none";
        if(checkBox1.checked==false&& checkBox2.checked==false&&checkBox3.checked==false){
        songImage.style.display="none";
        image.style.display="block";
      }
    }
  }
  
   
    function myFunction2() {
      
    
      // If the checkbox is checked, display the output text
      if (checkBox2.checked == true){
        text2.style.display = "block";
        // songImage.style.display="block";
        image.style.display="none";
      } else {
        text2.style.display = "none";
        if(checkBox1.checked==false&& checkBox2.checked==false&&checkBox3.checked==false){
        songImage.style.display="none";
        image.style.display="block";
        }
      }
    }
  
    function myFunction3() {
      
     
      // If the checkbox is checked, display the output text
      if (checkBox3.checked == true){
        text3.style.display = "block";
        // songImage.style.display="block";
        image.style.display="none";
      } else {
        text3.style.display = "none";
        if(checkBox1.checked==false&& checkBox2.checked==false&&checkBox3.checked==false){
        songImage.style.display="none";
        image.style.display="block";
        }
      }
    }
  
    
  
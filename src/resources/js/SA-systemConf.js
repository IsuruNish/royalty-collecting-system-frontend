window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },3000);
    }

    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        fetch("http://localhost:8080/OSCA_war_exploded/SystemDetailsServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        console.log(data);
        if(ut!=1){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");
                

                var topic1 = document.getElementById('topicValue1');
                var topic2 = document.getElementById('topicValue2');
                var topic3 = document.getElementById('topicValue3');

                var Topname = document.getElementById('Topname');
                var picSmall = document.getElementById('profilePicSmall');


                setTimeout(function() {
                    picSmall.src = data['DPpath'];
                    Topname.innerHTML = "Hello "+ data['fname']+",";

                    topic1.innerHTML = "Current commission percentage - "+ 100*data['commision'] +"%";
                    topic2.innerHTML = "Current cancellation date - "+data['cancellationDuration']+ " days";
                    topic3.innerHTML = "Current cancellation fee - Rs."+data['cancellationFee'];

                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }        
        })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
            console.error(err);
          });
    }
});




var button1 = document.getElementById('submitButtonForm1');
var button2 = document.getElementById('submitButtonForm2');
var button3 = document.getElementById('submitButtonForm3');



button1.addEventListener('click', ()=>{
    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");
    let token = Cookies.get('Authorization');

    let filled1 = validateJustDates("inputField1");
    let filled2 = validateJustDates("birthday1");
    let filled3 = validateJustInputWithValues("inputField1");

    if (filled1 && filled2 && filled3) {
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");

        if(token == undefined){
            popUpFromDown("login to continue",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
        }

        else{
            let inputValue = document.getElementById('inputField1').value/100;
            var date1 = document.getElementById('birthday1').value;

            let payload = {
                "commision":inputValue,
                "commisionDate":date1,
                "systemDetailType":1,
            }
                
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            }

            fetch("http://localhost:8080/OSCA_war_exploded/SystemDetailsServlet", options)
            .then(res => res.json())
            .then((data) => {
            console.log(data);
            if(data['ok']!=1){
                popUpFromDown("Error try again",'red');
                loading.classList.add("hideME");
                realpage.classList.remove("hideME");
                }
                else{
                    popUpFromDown("Changed successfully",'greenColour');
            
                    setTimeout(function() {
                        
                        window.location.href='SA-systemConf.html';
                    },3000);

                }        
            })
            .catch(err =>{
                popUpFromDown("Error try again",'red');
                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },3000);
                console.error(err);
            });
        }
    }
})




button2.addEventListener('click', ()=>{
    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");
    let token = Cookies.get('Authorization');


    let filled1 = validateJustDates("inputField2");
    let filled2 = validateJustDates("birthday2");
    let filled3 = validateJustInputWithValues("inputField2");
    
    console.log(filled1);
    console.log(filled2);
    console.log(filled3);
    if (filled1 && filled2) {
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");

        if(token == undefined){
            popUpFromDown("login to continue",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
        }

        else{
            let inputValue = document.getElementById('inputField2').value;
            var date1 = document.getElementById('birthday2').value;

            let payload = {
                "cancellationDuration":inputValue,
                "cancellationDurationDate":date1,
                "systemDetailType":2,
            }
                
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            }

            fetch("http://localhost:8080/OSCA_war_exploded/SystemDetailsServlet", options)
            .then(res => res.json())
            .then((data) => {
            console.log(data);
            if(data['ok']!=1){
                popUpFromDown("Error try again",'red');
                loading.classList.add("hideME");
                realpage.classList.remove("hideME");
                }
                else{
                    popUpFromDown("Changed successfully",'greenColour');
            
                    setTimeout(function() {
                        window.location.href='SA-systemConf.html';
                        
                    },3000);

                }        
            })
            .catch(err =>{
                popUpFromDown("Error try again",'red');
                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },3000);
                console.error(err);
            });
        }
    }

})





button3.addEventListener('click', ()=>{
    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");
    let token = Cookies.get('Authorization');

    let filled1 = validateJustDates("inputField3");
    let filled2 = validateJustDates("birthday3");
    let filled3 = validateJustInputWithValues("inputField3");
    

    if (filled1 && filled2 && filled3) {
            
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");

        if(token == undefined){
            popUpFromDown("login to continue",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
        }

        else{
            let inputValue = document.getElementById('inputField3').value;
            var date1 = document.getElementById('birthday3').value;

            let payload = {
                "cancellationFee":inputValue,
                "cancellationFeeDate":date1,
                "systemDetailType":3,
            }
                
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            }

            fetch("http://localhost:8080/OSCA_war_exploded/SystemDetailsServlet", options)
            .then(res => res.json())
            .then((data) => {
            console.log(data);
            if(data['ok']!=1){
                popUpFromDown("Error try again",'red');
                loading.classList.add("hideME");
                realpage.classList.remove("hideME");
                }
                else{
                    popUpFromDown("Changed successfully",'greenColour');
            
                    setTimeout(function() {
                    
                        window.location.href='SA-systemConf.html';
                    },3000);

                }        
            })
            .catch(err =>{
                popUpFromDown("Error try again",'red');
                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },3000);
                console.error(err);
            });
        }
    }

})

















const ComPercentage = document.getElementById("cp");
const licenseCanDate = document.getElementById("lcd");
const licenseCanFee = document.getElementById("lcf");

const ComPercentageDiv = document.getElementById("com");
const licenseCanDateDiv = document.getElementById("canDate");
const licenseCanFeeDiv = document.getElementById("canFee");

ComPercentage.addEventListener("click", ()=>{

    if(ComPercentage.classList.contains('black')){
        ComPercentage.classList.remove("black");
        ComPercentage.classList.add("btn");

        if(licenseCanDate.classList.contains('btn') && licenseCanFee.classList.contains('btn')){
            img.classList.remove("blank");
            ComPercentageDiv.classList.add("blank"); 
            licenseCanDateDiv.classList.add("blank"); 
            licenseCanFeeDiv.classList.add("blank"); 
        }
    }

    else{
        ComPercentage.classList.add("black");
        ComPercentage.classList.remove("btn");
        img.classList.add("blank");
        
        licenseCanDate.classList.add("btn");
        licenseCanDate.classList.remove("black");
    
        licenseCanFee.classList.add("btn");
        licenseCanFee.classList.remove("black");
    
        ComPercentageDiv.classList.remove("blank"); 
        licenseCanDateDiv.classList.add("blank"); 
        licenseCanFeeDiv.classList.add("blank"); 
    }

    
});

licenseCanDate.addEventListener('click', ()=>{

    if(licenseCanDate.classList.contains('black')){
        licenseCanDate.classList.remove("black");
        licenseCanDate.classList.add("btn");

        if(ComPercentage.classList.contains('btn') && licenseCanFee.classList.contains('btn')){
            img.classList.remove("blank");
            ComPercentageDiv.classList.add("blank"); 
            licenseCanDateDiv.classList.add("blank"); 
            licenseCanFeeDiv.classList.add("blank"); 
        }
    }

    else{
        img.classList.add("blank");
        ComPercentage.classList.add("btn");
        ComPercentage.classList.remove("black");
        
        licenseCanDate.classList.add("black");
        licenseCanDate.classList.remove("btn");
    
        licenseCanFee.classList.add("btn");
        licenseCanFee.classList.remove("black");
    
        
        ComPercentageDiv.classList.add("blank"); 
        licenseCanDateDiv.classList.remove("blank"); 
        licenseCanFeeDiv.classList.add("blank"); 
    }
   
});

licenseCanFee.addEventListener('click', ()=>{

    if(licenseCanFee.classList.contains('black')){
        licenseCanFee.classList.remove("black");
        licenseCanFee.classList.add("btn");

        if(ComPercentage.classList.contains('btn') && licenseCanDate.classList.contains('btn')){
            img.classList.remove("blank");
            ComPercentageDiv.classList.add("blank"); 
            licenseCanDateDiv.classList.add("blank"); 
            licenseCanFeeDiv.classList.add("blank"); 
        }
    }

    else{
        img.classList.add("blank");

        ComPercentage.classList.add("btn");
        ComPercentage.classList.remove("black");
        
        licenseCanDate.classList.add("btn");
        licenseCanDate.classList.remove("black");
    
        licenseCanFee.classList.add("black");
        licenseCanFee.classList.remove("btn");
    
        
        ComPercentageDiv.classList.add("blank"); 
        licenseCanDateDiv.classList.add("blank"); 
        licenseCanFeeDiv.classList.remove("blank"); 
    }

});


$(function(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
   
    var maxDate = year + '-' + month + '-' + day;

    $('#birthday1').attr('min', maxDate);
    $('#birthday2').attr('min', maxDate);
    $('#birthday3').attr('min', maxDate);
});



// function validateJustInput(){
//     var input = $('.imput');
//     var filled = true;
  
//     for(var i = 0; i < input.length; i++){
//       if(validateVI(input[i]) == false){
//         showValidateVI(input[i], input[i].id);
//         filled = false;
//       }
//     }

//     return filled;
// }

function validateJustDates(inputName){
    var input = document.getElementById(inputName)
    var filled = true;
  

    if(validateVI(input) == false){
    showValidateVI(input, input.id);
    filled = false;
    }
    
    return filled;
}

function validateVI(input) {
    if($(input).attr('type') != 'email' | $(input).attr('name') != 'email') {
      if($(input).val().trim() == ''){
          return false;
      }
    }
  
    if($(input).attr('type') == 'email' | $(input).attr('name') == 'email') {
      if($(input).val().trim() == ''){
          return false;
      }
    }
}


function showValidateVI (input, id) {
    if($(input).val().trim() == '') {
      var field = document.getElementById(id);
      var text = field.nextElementSibling;
  
      if($(input).attr('name') == 'birthday3'){
        text.innerHTML = "Starting date is required";
        text.style.color = "#ff0000";
      }
  
      if($(input).attr('name') == 'birthday2'){
        text.innerHTML = "Starting date is required";
        text.style.color = "#ff0000";
      }
  
      if($(input).attr('name') == 'birthday1'){
        text.innerHTML = "Starting date is required";
        text.style.color = "#ff0000";
      }
  
      if($(input).attr('name') == 'inputField3'){
        text.innerHTML = "New value is required";
        text.style.color = "#ff0000";
      }
  
      if($(input).attr('name') == 'inputField2'){
        text.innerHTML = "New value is required";
        text.style.color = "#ff0000";
      }

      if($(input).attr('name') == 'inputField1'){
        text.innerHTML = "New value is required";
        text.style.color = "#ff0000";
      }
  }
}


function validateJustInputWithValues(name){
    let i = document.getElementById(name).value;

    if(name == "inputField1" && i.match((/(.+)?[a-zA-Z](.+)?/))){

        var field = document.getElementById(name);
        var text = field.nextElementSibling;
    
        text.innerHTML = "Letters not allowed";
        text.style.color = "#ff0000";
        filled = false;
    }

    else if(name == "inputField3" && i.match((/(.+)?[a-zA-Z](.+)?/))){

        var field = document.getElementById(name);
        var text = field.nextElementSibling;
    
        text.innerHTML = "Letters not allowed";
        text.style.color = "#ff0000";
        filled = false;
    }

    return true;
    // else if(name == "inputField2" && Number.isInteger(i) && i != ""){

    //     var field = document.getElementById(name);
    //     var text = field.nextElementSibling;
    
    //     text.innerHTML = "Letters not allowed";
    //     text.style.color = "#ff0000";
    //     filled = false;
    // }
}
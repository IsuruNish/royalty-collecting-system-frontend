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

                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this
                    //change the values in this

                    topic1.innerHTML = data[''];
                    topic2.innerHTML = data[''];
                    topic3.innerHTML = data[''];

                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }        
        })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                // window.location.href='../landing_page/login.html';
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

    
    loading.classList.remove("hideME");
    realpage.classList.add("hideME");

    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },3000);
    }

    else{
        let inputValue = document.getElementById('inputField1').value;
        var date1 = document.getElementById('birthday1').value;

        
                
        //chnage the names and request type
        //chnage the names and request type
        //chnage the names and request type
        //chnage the names and request type
        //chnage the names and request type
        //chnage the names and request type
        let payload = {
            "input":inputValue,
            "date":date1,
            "requestType":1,
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
                loading.classList.add("hideME");
                realpage.classList.remove("hideME");
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
})




button2.addEventListener('click', ()=>{
    



})





button3.addEventListener('click', ()=>{
    




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



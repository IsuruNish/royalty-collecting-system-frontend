const licenseApp = document.getElementById("la");
const licenseCan = document.getElementById("lc");
const songReg = document.getElementById("sr");
const songOwn = document.getElementById("soc");
const songRemove = document.getElementById("sre");



const licenseAppDiv = document.getElementById("licenseApplications");
const licenseCanDiv = document.getElementById("licenseCancellations");
const songRegDiv = document.getElementById("songRegistrations");
const songOwnDiv = document.getElementById("songOwnership");
const songRemoveDiv = document.getElementById("songRemoval");


licenseApp.addEventListener("click", ()=>{
    licenseApp.classList.add("black");
    licenseApp.classList.remove("btn");
    
    licenseCan.classList.add("btn");
    licenseCan.classList.remove("black");

    songReg.classList.add("btn");
    songReg.classList.remove("black");

    songOwn.classList.add("btn");
    songOwn.classList.remove("black");

    songRemove.classList.add("btn");
    songRemove.classList.remove("black");


    licenseAppDiv.classList.remove("blank"); 
    licenseCanDiv.classList.add("blank"); 
    songRegDiv.classList.add("blank"); 
    songOwnDiv.classList.add("blank"); 
    songRemoveDiv.classList.add("blank"); 
});




licenseCan.addEventListener("click", ()=>{
    licenseApp.classList.add("btn");
    licenseApp.classList.remove("black");

    licenseCan.classList.add("black");
    licenseCan.classList.remove("btn");

    songReg.classList.add("btn");
    songReg.classList.remove("black");

    songOwn.classList.add("btn");
    songOwn.classList.remove("black");

    songRemove.classList.add("btn");
    songRemove.classList.remove("black");

    licenseAppDiv.classList.add("blank"); 
    licenseCanDiv.classList.remove("blank"); 
    songRegDiv.classList.add("blank"); 
    songOwnDiv.classList.add("blank"); 
    songRemoveDiv.classList.add("blank"); 

});


songReg.addEventListener("click", ()=>{
    licenseApp.classList.add("btn");
    licenseApp.classList.remove("black");

    licenseCan.classList.add("btn");
    licenseCan.classList.remove("black");

    songReg.classList.add("black");
    songReg.classList.remove("btn");

    songOwn.classList.add("btn");
    songOwn.classList.remove("black");

    songRemove.classList.add("btn");
    songRemove.classList.remove("black");

    licenseAppDiv.classList.add("blank"); 
    licenseCanDiv.classList.add("blank"); 
    songRegDiv.classList.remove("blank"); 
    songOwnDiv.classList.add("blank"); 
    songRemoveDiv.classList.add("blank"); 
});


songOwn.addEventListener("click", ()=>{
    licenseApp.classList.add("btn");
    licenseApp.classList.remove("black");

    licenseCan.classList.add("btn");
    licenseCan.classList.remove("blank");

    songReg.classList.add("btn");
    songReg.classList.remove("black");

    songOwn.classList.add("black");
    songOwn.classList.remove("btn");

    songRemove.classList.add("btn");
    songRemove.classList.remove("black");


    licenseAppDiv.classList.add("blank"); 
    licenseCanDiv.classList.add("blank"); 
    songRegDiv.classList.add("blank"); 
    songOwnDiv.classList.remove("blank"); 
    songRemoveDiv.classList.add("blank"); 
});



songRemove.addEventListener("click", ()=>{
    licenseApp.classList.add("btn");
    licenseApp.classList.remove("black");

    licenseCan.classList.add("btn");
    licenseCan.classList.remove("blank");

    songReg.classList.add("btn");
    songReg.classList.remove("black");

    songOwn.classList.add("btn");
    songOwn.classList.remove("black");

    songRemove.classList.add("black");
    songRemove.classList.remove("btn");

    licenseAppDiv.classList.add("blank"); 
    licenseCanDiv.classList.add("blank"); 
    songRegDiv.classList.add("blank"); 
    songOwnDiv.classList.add("blank"); 
    songRemoveDiv.classList.remove("blank"); 
});


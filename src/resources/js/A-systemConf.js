const ComPercentage = document.getElementById("cp");
const licenseCanDate = document.getElementById("lcd");
const licenseCanFee = document.getElementById("lcf");

const ComPercentageDiv = document.getElementById("com");
const licenseCanDateDiv = document.getElementById("canDate");
const licenseCanFeeDiv = document.getElementById("canFee");

ComPercentage.addEventListener("click", ()=>{
    ComPercentage.classList.add("black");
    ComPercentage.classList.remove("btn");
    
    licenseCanDate.classList.add("btn");
    licenseCanDate.classList.remove("black");

    licenseCanFee.classList.add("btn");
    licenseCanFee.classList.remove("black");

    ComPercentageDiv.classList.remove("blank"); 
    licenseCanDateDiv.classList.add("blank"); 
    licenseCanFeeDiv.classList.add("blank"); 
});

licenseCanDate.addEventListener('click', ()=>{
    ComPercentage.classList.add("btn");
    ComPercentage.classList.remove("black");
    
    licenseCanDate.classList.add("black");
    licenseCanDate.classList.remove("btn");

    licenseCanFee.classList.add("btn");
    licenseCanFee.classList.remove("black");

    
    ComPercentageDiv.classList.add("blank"); 
    licenseCanDateDiv.classList.remove("blank"); 
    licenseCanFeeDiv.classList.add("blank"); 
});

licenseCanFee.addEventListener('click', ()=>{
    ComPercentage.classList.add("btn");
    ComPercentage.classList.remove("black");
    
    licenseCanDate.classList.add("btn");
    licenseCanDate.classList.remove("black");

    licenseCanFee.classList.add("black");
    licenseCanFee.classList.remove("btn");

    
    ComPercentageDiv.classList.add("blank"); 
    licenseCanDateDiv.classList.add("blank"); 
    licenseCanFeeDiv.classList.remove("blank"); 
});



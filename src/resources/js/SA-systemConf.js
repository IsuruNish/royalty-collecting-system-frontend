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



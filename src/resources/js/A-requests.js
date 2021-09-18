const licenseApp = document.getElementById("la");
const licenseCan = document.getElementById("lc");
const songReg = document.getElementById("sr");
const songOwn = document.getElementById("soc");
const songRemove = document.getElementById("sre");
const img = document.getElementById("img");

const licenseAppDiv = document.getElementById("licenseApplications");
const licenseCanDiv = document.getElementById("licenseCancellations");
const songRegDiv = document.getElementById("songRegistrations");
const songOwnDiv = document.getElementById("songOwnership");
const songRemoveDiv = document.getElementById("songRemoval");


licenseApp.addEventListener("click", ()=>{

    if(licenseApp.classList.contains('black')){
        licenseApp.classList.remove("black");
        licenseApp.classList.add("btn");

        if(licenseCan.classList.contains('btn') && songReg.classList.contains('btn') && songRemove.classList.contains('btn') && songOwn.classList.contains('btn')){
            img.classList.remove("blank");
            licenseAppDiv.classList.add("blank"); 
            licenseCanDiv.classList.add("blank"); 
            songRegDiv.classList.add("blank"); 
            songOwnDiv.classList.add("blank"); 
            songRemoveDiv.classList.add("blank"); 
        }
    }
    else{
        img.classList.add("blank");
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
    }
    
});




licenseCan.addEventListener("click", ()=>{
    if(licenseCan.classList.contains('black')){
        licenseCan.classList.remove("black");
        licenseCan.classList.add("btn");

        if(licenseApp.classList.contains('btn') && songReg.classList.contains('btn') && songRemove.classList.contains('btn') && songOwn.classList.contains('btn')){
            img.classList.remove("blank");
            licenseAppDiv.classList.add("blank"); 
            licenseCanDiv.classList.add("blank"); 
            songRegDiv.classList.add("blank"); 
            songOwnDiv.classList.add("blank"); 
            songRemoveDiv.classList.add("blank"); 
        }
    }



    else{
        img.classList.add("blank");

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
    }
});


songReg.addEventListener("click", ()=>{

    if(songReg.classList.contains('black')){
        songReg.classList.remove("black");
        songReg.classList.add("btn");

        if(licenseApp.classList.contains('btn') && licenseCan.classList.contains('btn') && songRemove.classList.contains('btn') && songOwn.classList.contains('btn')){
            img.classList.remove("blank");
            licenseAppDiv.classList.add("blank"); 
            licenseCanDiv.classList.add("blank"); 
            songRegDiv.classList.add("blank"); 
            songOwnDiv.classList.add("blank"); 
            songRemoveDiv.classList.add("blank"); 
        }
    }

    else{
        img.classList.add("blank");

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
    }
     
});


songOwn.addEventListener("click", ()=>{
    if(songOwn.classList.contains('black')){
        songOwn.classList.remove("black");
        songOwn.classList.add("btn");

        if(licenseApp.classList.contains('btn') && licenseCan.classList.contains('btn') && songRemove.classList.contains('btn') && songReg.classList.contains('btn')){
            img.classList.remove("blank");
            licenseAppDiv.classList.add("blank"); 
            licenseCanDiv.classList.add("blank"); 
            songRegDiv.classList.add("blank"); 
            songOwnDiv.classList.add("blank"); 
            songRemoveDiv.classList.add("blank"); 
        }
    }

    else{
        img.classList.add("blank");

        licenseApp.classList.add("btn");
        licenseApp.classList.remove("black");
    
        licenseCan.classList.add("btn");
        licenseCan.classList.remove("black");
    
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
    }
    
});



songRemove.addEventListener("click", ()=>{

    if(songRemove.classList.contains('black')){
        songRemove.classList.remove("black");
        songRemove.classList.add("btn");

        if(licenseApp.classList.contains('btn') && licenseCan.classList.contains('btn') && songOwn.classList.contains('btn') && songReg.classList.contains('btn')){
            img.classList.remove("blank");
            licenseAppDiv.classList.add("blank"); 
            licenseCanDiv.classList.add("blank"); 
            songRegDiv.classList.add("blank"); 
            songOwnDiv.classList.add("blank"); 
            songRemoveDiv.classList.add("blank"); 
        }
    }

    else{
        img.classList.add("blank");

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
    }
    
});


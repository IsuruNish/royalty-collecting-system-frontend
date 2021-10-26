
$(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#ul li").not(":eq(0)").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
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

  

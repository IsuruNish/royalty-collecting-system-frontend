(function () {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    var month_selected = "Month"; // current month
    var option = '';
    option = '<option>Month</option>'; // first option

    for (let i = 0; i < months.length; i++) {
        let month_number = (i + 1);

        // value month number with 0. [01 02 03 04..]
        let month = (month_number <= 9) ? '0' + month_number : month_number;

        // or value month number. [1 2 3 4..]
        // let month = month_number;

        // or value month names. [January February]
        // let month = months[i];

        let selected = (i === month_selected ? ' selected' : '');
        option += '<option value="' + month + '"' + selected + '>' + months[i] + '</option>';
    }

    
    document.getElementById("month").innerHTML = option;
   
})();



(function () {
    

    let year_satart = (new Date).getFullYear()-5;
    let year_end = (new Date).getFullYear(); // current year
    let year_selected = "Year";

    let option = '';
    option = '<option>Year</option>'; // first option

    for (let i = year_satart; i <= year_end; i++) {
        let selected = (i === year_selected ? ' selected' : '');
        // let arabic_number = to_arabic(i); // number convert to arabic digit
        option += '<option value="' + i + '"' + selected + '>' + i + '</option>';
    }

    document.getElementById("arabic-year").innerHTML = option;
})();






var tableDataArr = []



window.addEventListener("DOMContentLoaded", () => {
    let token = Cookies.get("Authorization");
    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");

    if (token == undefined) {
      popUpFromDown("login to continue", "red");
      // alert("login to continue");
      setTimeout(function () {
        window.location.href = "../landing_page/login.html";
      }, 3000);
      
    } else {

      loading.classList.add("hideME");
      realpage.classList.remove("hideME");

      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      fetch("http://localhost:8080/OSCA_war_exploded/AMonthlyReportsServlet", options)
        .then((res) => res.json())
        .then((data) => {
          ut = data["uType"];
          console.log(data);
  
          if (ut != 2 && ut != 1) {
            popUpFromDown("Access denied!", "red");
            setTimeout(function () {
              window.location.href = "../landing_page/login.html";
            }, 3000);
          } else {
            var Topname = document.getElementById("Topname");
            Topname.innerHTML = "Hello " + data["fName"] + ",";
  
            var picSmall = document.getElementById("profilePicSmall");
            picSmall.src = data["dpPath"];

            console.log(data['tableDataArr']);

            
            tableDataArr = data['tableDataArr'];

            console.log(tableDataArr);
            console.log("tableDataArr");


            
          }
        })
  
        .catch((err) => {
          alert("Email or Password is wrong");
          popUpFromDown("Login again", "red");
          setTimeout(function () {
            window.location.href = "../landing_page/login.html";
          }, 3000);
          popUp("Email or Password is wrong");
          console.error(err);
        });
    }
  });
  
  

  $("#s").click(function(){
 

    var checkMonthh = $("#month").val();
    var checkYear = $("#arabic-year").val();
    var type_temp = $("#single").val();
    var checkFlagMonthAndYear = 0;
  
    if (checkMonthh == "Month" || checkYear == "Year") {
      popUpFromDown("Enter year and month",'red')
    }

    else{

    
      var type_temp = $("#single").val();
      if(type_temp=="Incomming details"){
          var type =1;
      }
      else{
          type =2;
      }
            var month_temp = $("#month").val();
            var month=month_temp

            
            var year = $("#arabic-year").val();
            console.log(year);
  
  var filled = true;
  
  

  if(filled){  
   
    let payload = {
      "type":type,
      "year":year,
      "month":month
    }
    console.log(payload);
    let token = Cookies.get('Authorization');
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload) 
      
      
    }
    
    fetch("http://localhost:8080/OSCA_war_exploded/AMonthlyReportsServlet", options)
        .then(res => res.json())
        .then(data => {
            console.log("here");
          ut = data['userType']
        
          console.log(data);

          
          if(type==1){
            var createXLSLFormatObj = [];
            var xlsHeader = ["ID", "Full Name","Phone Number","Amount","Concert Name"];
           
            var xlsRows = [];
            var total=0;
            var counter=0;


            for(var i=0;i<data['incomingDetails'][0].length;i++){

              var temp=[];
              temp[0]=data['incomingDetails'][0][i];
              temp[1]=data['incomingDetails'][1][i];
              temp[2]=data['incomingDetails'][2][i];
              temp[3]=data['incomingDetails'][3][i];
              temp[4]=data['incomingDetails'][4][i];
              
              total+=parseFloat(temp[3]);
              xlsRows[i]=temp;
              counter+=1;
              
            }
            
            var temp2=[" "," "," Total amount:",total," "," "];

          xlsRows[counter]=temp2;


            createXLSLFormatObj.push(xlsHeader);
        $.each(xlsRows, function(index, value) {
            var innerRowData = [];
            $("tbody").append('<tr><td>' + value.EmployeeID + '</td><td>' + value.FullName + '</td></tr>');
            $.each(value, function(ind, val) {

                innerRowData.push(val);
            });
            createXLSLFormatObj.push(innerRowData);
        });

        var filename = "Incoming_Monthly_Report.xlsx";

        /* Sheet Name */
        var ws_name = "FreakySheet";

        if (typeof console !== 'undefined') console.log(new Date());
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

        /* Add worksheet to workbook */
        XLSX.utils.book_append_sheet(wb, ws, ws_name);

        /* Write workbook and Download */
        if (typeof console !== 'undefined') console.log(new Date());
        XLSX.writeFile(wb, filename);
        if (typeof console !== 'undefined') console.log(new Date());

          }

          if(type==2){
            var createXLSLFormatObj = [];
            var xlsHeader = ["ID", "Full Name","Phone Number","Amount","Concert Name","Bank Details"];
            // var xlsRows = data['outgoingDetails'];
            var xlsRows = [];
            var total=0;
            var counter=0;


            for(var i=0;i<data['outgoingDetails'][0].length;i++){

              var temp=[];
              temp[0]=data['outgoingDetails'][0][i];
              temp[1]=data['outgoingDetails'][1][i];
              temp[2]=data['outgoingDetails'][2][i];
              temp[3]=data['outgoingDetails'][3][i];
              temp[4]=data['outgoingDetails'][4][i];
              temp[5]=data['outgoingDetails'][5][i];
              total+=parseFloat(temp[3]);
              xlsRows[i]=temp;
              counter+=1;
              
            }
            
            var temp2=[" "," "," Total amount:",total," "," "];

          xlsRows[counter]=temp2;
            createXLSLFormatObj.push(xlsHeader);
        $.each(xlsRows, function(index, value) {
            var innerRowData = [];
            $("tbody").append('<tr><td>' + value.EmployeeID + '</td><td>' + value.FullName + '</td></tr>');
            $.each(value, function(ind, val) {

                innerRowData.push(val);
            });
            createXLSLFormatObj.push(innerRowData);
        });

        var filename = "Outgoing_Monthly_Report.xlsx";

        /* Sheet Name */
        var ws_name = "FreakySheet";

        if (typeof console !== 'undefined') console.log(new Date());
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

        /* Add worksheet to workbook */
        XLSX.utils.book_append_sheet(wb, ws, ws_name);

        /* Write workbook and Download */
        if (typeof console !== 'undefined') console.log(new Date());
        XLSX.writeFile(wb, filename);
        if (typeof console !== 'undefined') console.log(new Date());

          }

          
        })

        

        .catch(err =>{
          // alert("Email or Password is wrong");
          popUpFromDown("Email or Password is wrong",'red')

          // popUp("Email or Password is wrong");
          console.error(err);
        });
        
  };
}
})

$("#m").click(function(){

  var checkMonthh = $("#month").val();
  var checkYear = $("#arabic-year").val();
  var type_temp = $("#single").val();
  var checkFlagMonthAndYear = 0;

  if (checkMonthh == "Month" || checkYear == "Year") {
    popUpFromDown("Enter year and month",'red')
  }

  else{
    
  console.log(checkMonthh);
  console.log(checkYear);
  for (let i = 0; i < tableDataArr.length; i++) {
    if(parseInt(tableDataArr[i][0]) == checkYear && parseInt(tableDataArr[i][1]) == checkMonthh) {
      checkFlagMonthAndYear = 1
    }
    
  }


  if(type_temp=="Incoming details"){
    popUpFromDown("Doesn't apply for incomes",'red')
  }
  else if(type_temp=="Outgoing details" && checkFlagMonthAndYear == 0){

      type =2;
  
      var month_temp = $("#month").val();
      var month=month_temp
 
      var year = $("#arabic-year").val();

  let payload = {
    "type":type,
    "year":year,
    "month":month
  }
  console.log(payload);
  let token = Cookies.get('Authorization');
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload) 
  }

  fetch("http://localhost:8080/OSCA_war_exploded/ACompletedOutgoingDetailsServlet", options)
  .then(res => res.json())
  .then(data => {
      console.log("here");
    ut = data['userType']
  
    if(data['ok'] == 1){
      popUpFromDown("The outgoing payments are done",'greenColour')

      setTimeout(function() {
        window.location.href='A-monthlyReport.html';
      },3000);
    }

    if(data['ok'] == 0){
      popUpFromDown("Error try again",'red')
    }

})

        

  .catch(err =>{
    // alert("Email or Password is wrong");
    popUpFromDown("Email or Password is wrong",'red')

    // popUp("Email or Password is wrong");
    console.error(err);
  });

}

else{
    popUpFromDown("The payments are already done",'red')
}
  }

})





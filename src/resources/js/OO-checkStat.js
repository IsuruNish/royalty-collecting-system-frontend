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
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    loading.classList.add("hideME");
    realpage.classList.remove("hideME");
    
    fetch("http://localhost:8080/OSCA_war_exploded/ACheckStatServlet", options)
      .then((res) => res.json())
      .then((data) => {
        ut = data["uType"];
        console.log(data);

        if (ut != 3) {
          popUpFromDown("Access denied!", "red");
          setTimeout(function () {
            window.location.href = "../landing_page/login.html";
          }, 3000);
        } else {
          var Topname = document.getElementById("Topname");
          Topname.innerHTML = "Hello " + data["fName"] + ",";
          

          var picSmall = document.getElementById("profilePicSmall");
          picSmall.src = data["dpPath"];

          function displayVals() {
            var singleValues = $("#single").val();
            var singleValues2 = $("#single2").val();
            console.log(singleValues);
            if (singleValues == "Monthly" && singleValues2 =="Payment history of show organizers") {
              paymentHistorymonthly();
            } 
            else if(singleValues == "Annually" && singleValues2 =="Payment history of show organizers"){
              paymentHistoryAnnualy();
            }
            else if(singleValues == "Monthly" && singleValues2 =="Income of members"){
              memberIncomeMonthly();
            }
            else if(singleValues == "Annually" && singleValues2 =="Income of members"){
              memberIncomeAnnually();
            }
            else if(singleValues == "Monthly" && singleValues2 =="Income of OSCA"){
              oscaIncomeMonthly();
            }
            else if(singleValues == "Annually" && singleValues2 =="Income of OSCA"){
              oscaIncomeAnnually();
            }
            
          }

          $("select").change(displayVals);
          displayVals();

          var myCharts;
          function paymentHistorymonthly() {
            var yValues = [];
            var xValues = [];
            const m = new Date();
            var q = m.getMonth()+1;
            
            var z=0;var r=0;
            for (var j=0; j < 12; j++) {
              
              if(data["monthDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              
              if(data["monthDetails"][1][z]==q)
              {
                
                yValues[r] = data["monthDetails"][0][z];
                console.log(data["monthDetails"]);
                 z++;
                
              }
              
            }
              const month = new Array();

              month[1] = "January";
              month[2] = "February";
              month[3] = "March";
              month[4] = "April";
              month[5] = "May";
              month[6] = "June";
              month[7] = "July";
              month[8] = "August";
              month[9] = "September";
              month[10] = "October";
              month[11] = "November";
              month[12] = "December";
              const d = new Date();
              k = 12;
              var p = d.getMonth();
              let name = month[++p];
              console.log(name);
              xValues[0] = name;
              for (var j = 1; j < 12; j++) {
                xValues[j] = month[--p];
                if (p < 1) {
                  xValues[j] = month[k--];
                }
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#58508d",
                "#bc5090",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      // label:'click',
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Monthly Payment History",
                  },
                },
              });
            }
          // }
          
          function memberIncomeMonthly() {
            var yValues = [];
            var xValues = [];
            
            const m = new Date();
            var q = m.getMonth()+1;
            
            var z=0;var r=0;
            for (var j=0; j < 12; j++) {
              
              if(data["memberIncomeMonthDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              if(data["memberIncomeMonthDetails"][1][z]==q)
              {
                yValues[r] = data["memberIncomeMonthDetails"][0][z];
                console.log(data["memberIncomeMonthDetails"]);
                z++;
                
              }
            }
              const month = new Array();

              month[1] = "January";
              month[2] = "February";
              month[3] = "March";
              month[4] = "April";
              month[5] = "May";
              month[6] = "June";
              month[7] = "July";
              month[8] = "August";
              month[9] = "September";
              month[10] = "October";
              month[11] = "November";
              month[12] = "December";
              const d = new Date();
              k = 12;
              var p = d.getMonth();
              let name = month[++p];
              console.log(name);
              xValues[0] = name;
              for (var j = 1; j < 12; j++) {
                xValues[j] = month[--p];
                if (p < 1) {
                  xValues[j] = month[k--];
                }
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#58508d",
                "#bc5090",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      // label:'click',
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Monthly Payment History",
                  },
                },
              });
            // }
          }
          function oscaIncomeMonthly() {
            var yValues = [];
            var xValues = [];
            const m = new Date();
            var q = m.getMonth()+1;
            
            var z=0; var r=0;
            for (var j=0; j < 12; j++) {
              
              if(data["LicenseIncomeMonthDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              if(data["LicenseIncomeMonthDetails"][1][z]==q)
              {
                yValues[r] = data["LicenseIncomeMonthDetails"][0][z];
                console.log(data["LicenseIncomeMonthDetails"]);
                z++;
                
              }
              
              
            }
              const month = new Array();

              month[1] = "January";
              month[2] = "February";
              month[3] = "March";
              month[4] = "April";
              month[5] = "May";
              month[6] = "June";
              month[7] = "July";
              month[8] = "August";
              month[9] = "September";
              month[10] = "October";
              month[11] = "November";
              month[12] = "December";
              const d = new Date();
              k = 12;
              var p = d.getMonth();
              let name = month[++p];
              console.log(name);
              xValues[0] = name;
              for (var j = 1; j < 12; j++) {
                
                xValues[j] = month[--p];
                if (p < 1) {
                  xValues[j] = month[k--];
                }
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
                "#58508d",
                "#bc5090",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      // label:'click',
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Monthly Payment History",
                  },
                },
              });
            // }
          }

          
          function paymentHistoryAnnualy() {
            var yValues = [];
            var xValues = [];
            
            const m = new Date();
            var q = m.getFullYear();
            
            var z=0;var r=0;
            for (var j=0; j < 5; j++) {
              
              if(data["yearDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              if(data["yearDetails"][1][z]==q)
              {
                yValues[r] = data["yearDetails"][0][z];
                console.log(data["yearDetails"]);
                 z++;
                
              }
            }
              const d = new Date();

              var p = d.getFullYear();
              console.log(p);
              let name = p;

              xValues[0] = name;
              for (var h = 1; h < 5; h++) {
                xValues[h] = --p;
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Annully Payment History",
                  },
                },
              });
            // }
          }

          function memberIncomeAnnually() {
            var yValues = [];
            var xValues = [];
            
            const m = new Date();
            var q = m.getFullYear();
            
            var z=0;var r=0;
            for (var j=0; j < 5; j++) {
              
              if(data["memberIncomeYearDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              if(data["memberIncomeYearDetails"][1][z]==q)
              {
                yValues[r] = data["memberIncomeYearDetails"][0][z];
                console.log(data["memberIncomeYearDetails"]);
                 z++;
                
              }
            }
              const d = new Date();

              var p = d.getFullYear();
              console.log(p);
              let name = p;

              xValues[0] = name;
              for (var h = 1; h < 5; h++) {
                xValues[h] = --p;
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Annully Payment History",
                  },
                },
              });
            // }
          }

          function oscaIncomeAnnually() {
            var yValues = [];
            var xValues = [];
            
            const m = new Date();
            var q = m.getFullYear();
            
            var z=0;var r=0;
            for (var j=0; j < 5; j++) {
              
              if(data["LicenseIncomeYearDetails"][1][z]!=q)
              {
                  
                  r++;
                  q--;
                  
                  
              }
              if(data["LicenseIncomeYearDetails"][1][z]==q)
              {
                yValues[r] = data["LicenseIncomeYearDetails"][0][z];
                console.log(data["LicenseIncomeYearDetails"]);
               z++;
                
              }
            }
              const d = new Date();

              var p = d.getFullYear();
              console.log(p);
              let name = p;

              xValues[0] = name;
              for (var h = 1; h < 5; h++) {
                xValues[h] = --p;
              }

              var barColors = [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ];

              if (myCharts != undefined) myCharts.destroy();
              myCharts = new Chart(document.getElementById("myChart"), {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [
                    {
                      backgroundColor: barColors,
                      data: yValues,
                    },
                  ],
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Annully Payment History",
                  },
                },
              });
            // }
          }

          
          
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

$("#download").on("click", () => {
  genPDF();
});

function genPDF() {
  var canvas = document.querySelector("#myChart");
  //creates image
  var canvasImg = canvas.toDataURL("image/png", 1.0);

  //creates PDF from img
  var doc = new jsPDF("landscape");
  doc.setFontSize(20);
  // doc.text(15, 15, "Cool Chart");
  doc.addImage(canvasImg, "JPEG", 10, 10, 280, 150);
  doc.save("report.pdf");
}
// ,6000)

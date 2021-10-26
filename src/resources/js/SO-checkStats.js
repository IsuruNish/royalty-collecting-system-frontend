var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
  "#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "sample text"
    }
  }
});


$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
          template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
    template += '</div></div>';
    
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".custom-select-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });



// function genPDF(){

//   // Default export is a4 paper, portrait, using milimeters for units
// var doc = new jsPDF()

// doc.text('Hello world!', 10, 10)
// doc.save('report.pdf')

// }

// document.getElementById('download').addEventListener("click", downloadPDF);

$('#download').on('click', ()=>{
    
  genPDF();

})


// setTimeout(
  
  function genPDF() {
    var canvas = document.querySelector('#myChart');
    //creates image
    var canvasImg = canvas.toDataURL("image/jpeg", 1.0);
    
    //creates PDF from img
    var doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text(15, 15, "Cool Chart");
    doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150 );
    doc.save('report.pdf');
  }
  // ,6000)


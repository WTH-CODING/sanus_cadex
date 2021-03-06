$(document).ready(function () {
  // Init
  $(".image-section").hide();
  $("#loader").hide();
  $("#result").hide();

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#file-picker").change(function () {
    $(".image-section").show();
    $("#btn-predict").show();
    $("#result").text("");
    $("#result").hide();
    $('#prev').hide();
    $("#preresult").show();
    readURL(this);
  });

  // Predict
  $("#btn-predict").click(function () {
    

    // Show loading animation
    $(this).hide();
    $("#preresult").hide();
    $("#loader").show();

    // Make prediction by calling api /predict
    $.ajax({
      type: "POST",
      url: "/malaria/predict",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        $("#loader").hide();
        $("#result").fadeIn(600);
        $("#result").text(data);
        console.log("Success!");
      },
    });
  });
});

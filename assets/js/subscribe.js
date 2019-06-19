jQuery(document).ready(function($) {
  "use strict";

  const clickHandler = () => {
    $('#subscribeEmail').val(function( index, value ) {
      if (!value || value === '') {
        $("#subscribeMessage").removeClass("show");
        $("#subscribeErrorMessage").addClass("show");
        $('#subscribeErrorMessage').html("Debe ingresar un mail");
        return;
      }
      const emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
      if (!emailExp.test(value)) {
        $("#subscribeMessage").removeClass("show");
        $("#subscribeErrorMessage").addClass("show");
        $('#subscribeErrorMessage').html('Por favor ingrese un mail válido');
        return;
      }
      removeClickHandler();
      $("#subscribeButton").addClass("disabled");
      $.ajax({
        type: "POST",
        url: "/api/subscribe",
        data: "email=" + encodeURIComponent(value),
        success: function(msg) {
          addAgainClickHandler();
          $("#subscribeButton").removeClass("disabled");
          if (msg === 'User successfully subscribed!') {
            $("#subscribeMessage").addClass("show");
            $("#subscribeErrorMessage").removeClass("show");
            $("#subscribeMessage").html("El mail fue suscripto, gracias!");
          } else {
            $("#subscribeMessage").removeClass("show");
            $("#subscribeErrorMessage").addClass("show");
            $('#subscribeErrorMessage').html(msg);
          }
        },
        error: function(err) {
          addAgainClickHandler();
          $("#subscribeButton").removeClass("disabled");
          console.log(err);
          $("#subscribeMessage").removeClass("show");
          $("#subscribeErrorMessage").addClass("show");
          $('#subscribeErrorMessage').html("Error");
        } 
      });
      return;
    });
  }

  $('#subscribeButton').on('click', clickHandler);

  const removeClickHandler = () => $('#subscribeButton').off('click', clickHandler);
  const addAgainClickHandler = () => $('#subscribeButton').on('click', clickHandler);

});

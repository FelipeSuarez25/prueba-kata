//TABS
$(document).ready(function () {
  $(".tab-link").click(function () {
    // Remover la clase 'active' de todas las pestañas
    $(".tab-link").removeClass("active");
    // Agregar la clase 'active' solo a la pestaña clicada
    $(this).addClass("active");

    // Ocultar todo el contenido de las pestañas
    $(".tab-content").removeClass("active");
    // Mostrar el contenido de la pestaña seleccionada
    $("#" + $(this).data("tab")).addClass("active");

    // Si la pestaña 3 es seleccionada, esconder el containerHash
    if ($(this).data("tab") === "tab3") {
      $(".containerHash").hide();
    } else {
        $(".containerHash").show();
    }
  });
});

//GENERADOR DEL HASH
$(document).ready(function () {
  $("#generateHashButton").click(function () {
    const inputText = $("#inputText").val();
    const hash = CryptoJS.MD5(inputText).toString();

    if(inputText === ''){
      // Si el campo está vacío, muestra el mensaje de error
      $("#errorText").show();
    }else{
      // Si el campo no está vacío, genera el hash y oculta el mensaje de error
      $("#errorText").hide();
      // Mostrar el hash generado
      $("#outputHash").text(`MD5 Hash: ${hash}`).show();

      // Capturar el primer valor numérico del rango 1 al 9
      const firstNumber = hash.match(/[1-9]/);
      if (firstNumber) {
        $("#outputNumber")
          .text(`Primer número del hash: ${firstNumber[0]}`)
          .show();
      } else {
        $("#outputNumber")
          .text("No se encontró ningún número del rango 1-9 en el hash.")
          .show();
      }
    }
  });
});

const typed = new Typed('.typed', {
  strings: ['DESARROLLO KATA'],
  typeSpeed: 200,
  backSpeed: 100,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});
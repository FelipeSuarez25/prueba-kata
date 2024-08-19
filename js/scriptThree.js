console.log("tab 3");
function nonConstructibleChange(coins) {
  // Ordenamos las monedas en orden ascendente
  coins.sort((a, b) => a - b);

  let currentChangeCreated = 0;

  // Iteramos sobre cada moneda
  for (let coin of coins) {
    // Si la moneda actual es mayor que currentChangeCreated + 1,
    // significa que no podemos crear currentChangeCreated + 1 como cambio
    if (coin > currentChangeCreated + 1) {
      throw new Error(
        `No es posible iterar al ${coin}, ya que no se podría crear: ${
          currentChangeCreated + 1
        } centavos`
      );
    }

    // Si no, actualizamos currentChangeCreated sumando el valor de la moneda actual
    currentChangeCreated += coin;
  }

  // Si podemos crear todos los cambios hasta currentChangeCreated,
  // entonces el cambio mínimo que no podemos crear es currentChangeCreated + 1
  return currentChangeCreated + 1;
}

function isValidInput(input) {
  // Eliminar espacios y validar el formato
  input = input.replace(/\s+/g, ''); 
  
  const inputCoin = /^[0-9]+(,[0-9]+)*$/;
  return inputCoin.test(input);
}

$(document).ready(function () {
  $("#calculateBtn").click(function () {
    const coinInput = $("#coinInput").val();
    const outputDiv = $("#outputCoin");

    if (!isValidInput(coinInput)) {
      outputDiv
          .text("Entrada inválida. Por favor, ingrese solo números separados por comas.")
          .removeClass('success')
          .addClass('errorCambio');
      return;
    }

    if (coinInput === "") {
      // Si el campo está vacío, muestra el mensaje de error
      $("#errorTextCoin").show();
    } else {
      // Si el campo no está vacío, oculta el mensaje de error
      $("#errorTextCoin").hide();

      // Convertimos el input en un array de números
      const coins = coinInput.split(",").map(Number);

      try {
        const result = nonConstructibleChange(coins);
        outputDiv.text(`El cambio mínimo no constructible es: ${result}`);
        outputDiv.removeClass("errorCambio").addClass("success");
      } catch (error) {
        outputDiv.text(`${error.message}`);
        outputDiv.removeClass("success").addClass("errorCambio");
      }
    }
  });
});

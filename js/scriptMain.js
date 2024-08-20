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
  let firstNumber; 

  $(document).ready(function () {
    $("#generateHashButton").click(function () {
      const inputText = $("#inputText").val();
      const hash = CryptoJS.MD5(inputText).toString();

      // Validación para asegurarse de que solo contiene letras (y espacios)
      const inputTextValidate = /^[a-zA-Z\s]+$/;

      if(inputText === ''){
        // Si el campo está vacío, muestra el mensaje de error
        $("#errorText").text("Entrada inválida. Por favor, ingrese solo texto").show();
      //comprobar una cadena true si hay una coincidencia y false si no la hay.
      }else if (!inputTextValidate.test(inputText)) { 
        // Si contiene números o caracteres especiales, muestra un mensaje de error
        $("#errorText").text("El texto no debe contener números ni caracteres especiales.").show();
      }else{
        // Si el campo no está vacío, genera el hash y oculta el mensaje de error
        $("#errorText").hide();
        // Mostrar el hash generado
        $("#outputHash").text(`MD5 Hash: ${hash}`).show();

        // Capturar el primer valor numérico del rango 1 al 9 
        //obtener todas las coincidencias de una expresión regular.
        firstNumber = hash.match(/[1-9]/);

        if (firstNumber) {
          const message = `Primer número del hash: ${firstNumber[0]}`;
          $("#outputNumber")
            .text(message)
            .show();
          // Mostrar el mensaje también en el primer tab
          $("#tab1 .output, #tab2 .output").text(message).show();
        } else {
          const noNumberMessage = "No se encontró ningún número del rango 1-9 en el hash.";
          $("#outputNumber")
            .text(noNumberMessage)
            .show();
          // Mostrar el mensaje también en el primer tab
          $("#tab1 .output, #tab2 .output").text(noNumberMessage).show();
        }
      }
    });
  });

//DESAFIO 1
// Función para reemplazar el número en el array
function arrayReplace(hashNumber) {
  // Genera un array aleatorio de 10 números entre 0 y 98
  arrayRandom = Array.from({length: 10}, () => Math.floor(Math.random() * 99));
  // Muestra el array en la web
  $("#outputArrayAleatorio").text(`Array aleatorio: ${arrayRandom.join(", ")}`).show();

  // Convierte el número de hash a cadena para la operación de reemplazo
  valueToReplace = hashNumber.toString();
  
  // Modifica el array aleatorio reemplazando las ocurrencias del número de hash
  modifiedArray = arrayRandom.map(function(element){
      x = element.toString().replace(valueToReplace, ''); // Reemplaza el valor
      if (x === '') {
          return 999; // Si el resultado está vacío, retorna 999
      } else {
          return Number(x); // De lo contrario, convierte de nuevo a número
      }
  });
  // Filtra el array para mantener solo los números menores a 100
  return modifiedArray.filter(x => x < 100);
}

// Función para ordenar un array por algoritmo de burbuja
function arraySort(arrayToSort) {
  let sorted = false; // Indica si esta ordenado, y se asume que no lo está

  // Mientras sorted sea false significa que aun no esta ordenado
  while (!sorted) {
      sorted = true; // se establece en true suponiendo que el array esta ordenado, si hay desordenados se cambia a false y continua el bucle
      
      // Recorre el array desde indice 1 hasta el final
      for (let i = 1; i < arrayToSort.length; i++) {
          // Compara el elemento actual con el anterior
          if (arrayToSort[i - 1] > arrayToSort[i]) {
              // Si el elemento anterior es mayor que el actual, se intercambian
              sorted = false; // El array no está ordenado aún
              // Realiza el intercambio usando destructuración de arrays
              [arrayToSort[i - 1], arrayToSort[i]] = [arrayToSort[i], arrayToSort[i - 1]];
          }
      }
  }
  return arrayToSort; // Retorna el array ya ordenado
}

$("#arrayOneBtn").click(function () {
  // Verifica si la variable 'firstNumber' está definida
  if (firstNumber === undefined) {
      // Muestra un mensaje de error si 'firstNumber' no está definido
      $("#outputArrayOne").text("Genera un hash primero.")
          .addClass('errorCambio') 
          .removeClass('success'); 
      return;
  }

  // Llama a la función arrayReplace pasando firstNumber y almacena el resultado en replacedArray
  const replacedArray = arrayReplace(firstNumber);
  // Llama a la función arraySort para ordenar el replacedArray y almacena el resultado en sortedArray
  const sortedArray = arraySort(replacedArray);
  //join(", ") para convertir el array en una cadena con los elementos separados por comas.
  $("#outputArrayOne").text(`Array modificado y ordenado: ${sortedArray.join(", ")}`)
      .removeClass('errorCambio')
      .addClass('success');
});


//DESAFIO 2
function arrayReplaceRange(hashNumber) {
  // Generar un array aleatorio con valores positivos y negativos
	arrayRandom = Array.from({length: 10}, () => Math.floor(Math.random() * 20) - 9);
  $("#outputArrayAlTwo").text(`Array aleatorio: ${arrayRandom.join(", ")}`).show();
  
  // Modifica el array generando el cuadrado de cada elemento
  modifiedArray = arrayRandom.map(x=>x*x);
  // Genera un rango máximo basado en el número de hash y se concatena para obtener el rango maximo
  let range= hashNumber.toString() + hashNumber.toString();
  $("#outputArrayRange").text(`Rango máximo: ${range}`).addClass('success').removeClass('succerrorCambioess');
  // Filtra el array modificado para mantener solo los valores menores que el rango máximo
	return modifiedArray.filter(x => x < Number(range));
}

$("#arrayTwoBtn").click(function () {
  if (firstNumber === undefined) {
      $("#outputArrayTwo").text("Genera un hash primero.").addClass('errorCambio').removeClass('success');
      return;
    }

    const replacedArray = arrayReplaceRange(firstNumber);
    const sortedArray = arraySort(replacedArray);
    $("#outputArrayTwo").text(`Array modificado y ordenado: ${sortedArray.join(", ")}`).removeClass('errorCambio').addClass('success');
});


//DESADIO 3
function miniumChange(coins) {
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
        const result = miniumChange(coins);
        outputDiv.text(`El cambio mínimo no constructible es: ${result}`);
        outputDiv.removeClass("errorCambio").addClass("success");
      } catch (error) {
        outputDiv.text(`${error.message}`);
        outputDiv.removeClass("success").addClass("errorCambio");
      }
    }
  });
});

//validaciones
function isValidInput(input) {
  // Eliminar espacios y validar el formato
  input = input.replace(/\s+/g, ''); 
  
  const inputCoin = /^[0-9]+(,[0-9]+)*$/;
  return inputCoin.test(input);
}

//Titulo dinamico
const typed = new Typed('.typed', {
  strings: ['DESARROLLO KATA'],
  typeSpeed: 300,
  backSpeed: 150,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});
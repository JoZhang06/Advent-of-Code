fetch('input.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split('\n');
        let result = "";

        for (let i = 0; i < lines.length; i += 1) {
            const firstLetter = lines[i];
            const secondLetter = lines[i + 1];
            // Aquí puedes hacer lo que necesites con las letras

            // Agregar el resultado al string de resultados
            result += `${firstLetter}${secondLetter}, `;
        }

        // Mostrar el resultado
        document.getElementById("resultado").innerHTML = result;
        console.log("El resultado es: " + result);

        // Ejemplo de if/else
        if (result.includes("C,Y")) {
            console.log("Se encontró la secuencia 'C,Y'");
        } else {
            console.log("No se encontró la secuencia 'C,Y'");
        }
    })
    .catch(error => console.error(error));

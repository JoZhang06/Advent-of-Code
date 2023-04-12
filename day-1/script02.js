fetch('input.txt')
    .then(response => response.text())
    .then(data => {
        // dividir las calorías de los alimentos en listas separadas para cada Elfo
        const elfCalories = [[]];
        let currentElf = 0;
        data.trim().split('\n').forEach(line => {
            if (line === '') {
                // agregar nueva lista para el siguiente Elfo
                elfCalories.push([]);
                currentElf++;
            } else {
                // agregar calorías del alimento a la lista actual del Elfo
                elfCalories[currentElf].push(parseInt(line));
            }
        });

        // calcular la cantidad total de calorías llevadas por cada Elfo
        const elfTotals = elfCalories.map(calories => calories.reduce((total, c) => total + c, 0));

        // encontrar el Elfo que lleva la mayoría de las calorías
        const maxElfIndex = elfTotals.indexOf(Math.max(...elfTotals)) + 1;

        // devolver la cantidad total de calorías que lleva el Elfo que lleva la mayoría
        const maxCalories = elfTotals[maxElfIndex - 1];

        document.getElementById("resultado").innerHTML = maxCalories;
        console.log("El resultado es: " + maxCalories);
    })
    .catch(error => console.error(error));

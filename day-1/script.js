fetch('input.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split('\n');
        const calories = [];
        let currentElf = -1;

        // Parse input and calculate total calories for each elf
        for (const line of lines) {
            if (line === '') {
                currentElf++;
            } else {
                const calorieCount = parseInt(line, 10);
                if (!isNaN(calorieCount)) {
                    if (!calories[currentElf]) {
                        calories[currentElf] = 0;
                    }
                    calories[currentElf] += calorieCount;
                }
            }
        }

        // Sort elves by calorie count
        const sortedElves = calories.slice().sort((a, b) => b - a);

        // Calculate sum of top three elves' calories
        const topThree = sortedElves.slice(0, 3);
        const sum = topThree.reduce((acc, val) => acc + val, 0);

        document.getElementById("resultado").innerHTML = sum;
        console.log("El resultado es: " + sum);
    })
    .catch(error => console.error(error));

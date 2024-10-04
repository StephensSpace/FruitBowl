let yourFruitBowl = []
async function fetchDataJson() {

    try {
        let response = await fetch("https://www.fruityvice.com/api/fruit/all");
        let fruitsJson = await response.json();
        populateDropdown(fruitsJson);
        console.log(fruitsJson);
    } catch (error) {
        console.error("Fehler:", error);
    }
}

function calculateYourNutritions(selectedValue, multiplicator) {
    [calories, sugar] = selectedValue.split(',');
    calories = calories * multiplicator;
    sugar = sugar * multiplicator;
    return [calories, sugar];
}

function NutritionsHTML(calories, sugar) {
    let formatedCalories = calories.toFixed(2).toString().replace('.', ',') + 'KJ';
    let formatedSugar = sugar.toFixed(2).toString().replace('.', ',') + 'g';

    return `Brennwerte: <li>Kalorien:${formatedCalories}</li>
        <li>Zucker:${formatedSugar}</li>`
}

async function fetchDataJson() {
    try {
        let response = await fetch("https://www.fruityvice.com/api/fruit/all");
        let fruitsJson = await response.json();
        populateDropdown(fruitsJson);
        console.log(fruitsJson);
    } catch (error) {
        console.error("Fehler:", error);
    }
}

function populateDropdown(data) {
    const dropdown = document.getElementById('apiDropdown');
    let id = 0;

    // Für jedes Element im Array eine Option erstellen
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = `${item.nutritions.calories}, ${item.nutritions.sugar}`;  // id ist ein Beispiel, je nachdem welche Eigenschaft willst
        option.id = `${id}`;
        option.textContent = item.name;  // z.B. der Name der Frucht
        dropdown.appendChild(option);
        id++
    });
}

function ShowCalories(element) {
    const selectedValue = element.value;
    // Splitte den Wert in Kalorien und Zucker
    let multiplicator = document.getElementById('valueInput').value / 100;
    let [calories, sugar] = calculateYourNutritions(selectedValue, multiplicator);
    document.getElementById('caloriesSugar').innerHTML = NutritionsHTML(calories, sugar);
    document.getElementById('addBtn').disabled = false;
    let gram = multiplicator * 100;
    let index = element.selectedIndex;
    let fruitName = element[index].innerHTML
    passParameterToBtn(calories, sugar, gram, fruitName)
}



function calculateNutritionsGrammChange(element) {
    let multiplicator = element.value / 100;
    let selectedValue = document.getElementById('apiDropdown').value;
    if (selectedValue == '') {
        document.getElementById('caloriesSugar').innerHTML = 'Bitte zuerst eine Frucht auswählen'
    } else {
        let [calories, sugar] = calculateYourNutritions(selectedValue, multiplicator);
        document.getElementById('caloriesSugar').innerHTML = NutritionsHTML(calories, sugar);
        let gram = element.value;
        let index = document.getElementById('apiDropdown').selectedIndex;
        let fruitName = document.getElementById('apiDropdown')[index].innerHTML
        passParameterToBtn(calories, sugar, gram, fruitName);
    }
}

function addBowl(calories, sugar, gram, fruitName) {

    newIngredient = {
        'name': fruitName,
        'calories': calories,
        'sugar': sugar,
        'gram': gram
    };
    yourFruitBowl.push(newIngredient);
    console.log(yourFruitBowl);
    renderFruitBowl()
}

function passParameterToBtn(calories, sugar, gram, fruitName) {
    document.getElementById('addBtn').setAttribute("onclick", `addBowl(${calories}, ${sugar}, ${gram}, '${fruitName}')`);
}

function renderFruitBowl() {
    let table = document.getElementById('bowlTable');
    let totalNutrition = 0;
    let totalSugar = 0;
    table.innerHTML = tableHeaderHTML();
    yourFruitBowl.forEach(element => {
        totalSugar += element.sugar // ist das selbe als n = n + new; n += new
        totalNutrition += element.calories
        let formatedCalories = element.calories.toFixed(2).toString().replace('.', ',') + 'KJ';
        let formatedSugar = element.sugar.toFixed(2).toString().replace('.', ',') + 'g';
        let newRow = document.createElement('tr');
        let cells = FillTable(formatedSugar, formatedCalories, element);
        newRow.append(...cells);
        table.appendChild(newRow);
    });
    let formatedTotalSugar = totalSugar.toFixed(2).toString().replace('.', ',') + 'g';
    let formatedTotalNutrition = totalNutrition.toFixed(2).toString().replace('.', ',') + 'KJ';
    document.getElementById('totalValues').innerHTML = `Your Fruitbowl contains ${formatedTotalSugar} Sugar and got ${formatedTotalNutrition}`
}

function FillTable(formatedSugar, formatedCalories, element) {
    let nameCell = document.createElement('td');
        nameCell.innerHTML = `${element.name}`;
        let gramsCell = document.createElement('td');
        gramsCell.innerHTML = `${element.gram}g`; 
        let caloriesCell = document.createElement('td');
        caloriesCell.innerHTML = `${formatedCalories}`;
        let sugarCell = document.createElement('td');
        sugarCell.innerHTML = `${formatedSugar}`;
        return [nameCell, gramsCell, sugarCell, caloriesCell];
}

function tableHeaderHTML() {
    return `
        <tr>
            <th>Fruchtname</th>
            <th>Gewicht (g)</th>
            <th>Zucker (g)</th>
            <th>Brennwert (KJ)</th>
        </tr>
    `;
}






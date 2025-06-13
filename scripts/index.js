// fetch
const loadData = async () => {
    const collection = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(res => res.json())
        .then(data => data.drinks);

    // parent layout
    const drinksLayout = document.getElementById('drinks-layout');

    collection.forEach(drink => {

        //child card
        const singleDrinkCard = document.createElement('div');
        singleDrinkCard.className = 'col-md-4';

        singleDrinkCard.innerHTML = `
            <div class="card h-100">
                <img id="thumbnail" src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="mb-4">
                        <h5 class="card-title text-start">${drink.strDrink}</h5>
                        <p class="text-start text-black-50">${drink.strCategory}</p>
                        <p class="card-text text-start">${drink.strInstructions.slice(0, 15)}...</p>
                    </div>

        

                    <div class="d-flex justify-content-between">
                        <button onclick="handleAddToCart('${drink.idDrink}', this)" class="btn btn-success">Add to Cart</button>
                        <button class="btn btn-outline-success">Details</button>
                    </div>
                </div>
            </div>
        `;

        drinksLayout.appendChild(singleDrinkCard);
    });
}

loadData();







let count = 0;

const handleAddToCart = async (id, button) => {
    if (count > 5) {
        alert('Max limit of cart reached!!!');
        return;
    }

    const collection = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(res => res.json())
        .then(data => data.drinks);

    const singleDrinkData = collection.find(drink => drink.idDrink === id);

    const cartParentLayout = document.getElementById('cart-parent-layout');

    const singleRow = document.createElement('tr');
    singleRow.innerHTML = `
        <td>${count + 1}</td>
        <td><img class="cart-image" src="${singleDrinkData.strDrinkThumb}" alt="Drink" /></td>
        <td>${singleDrinkData.strDrink}</td>
    `;

    cartParentLayout.appendChild(singleRow);

    // Increment count
    count++;
    document.getElementById('cart-len').innerText = count;

    // Disable the clicked button
    button.classList.add('disabled');
    button.classList.remove('btn-success');
    button.classList.add('btn-outline-warning');
    button.innerText = "Added";
    button.disabled = true;
};
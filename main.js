const candyList = document.getElementById("candyList");
const addCandyButton = document.getElementById("addCandy");

// Load candies from local storage when the page loads
window.addEventListener("load", function () {
    const savedCandies = JSON.parse(localStorage.getItem("candies")) || [];
    savedCandies.forEach(function (candy) {
        createCandyListItem(candy);
    });
});

addCandyButton.addEventListener("click", function () {
    const candyName = document.getElementById("candyName").value;
    const candyDescription = document.getElementById("candyDescription").value;
    const candyPrice = parseFloat(document.getElementById("candyPrice").value);
    const candyQuantity = parseInt(document.getElementById("candyQuantity").value);

    if (candyName && candyPrice >= 0 && candyQuantity >= 0) {
        const candy = {
            name: candyName,
            description: candyDescription,
            price: candyPrice,
            quantity: candyQuantity,
        };

        createCandyListItem(candy);

        // Save the candy to local storage
        saveCandyToLocalStorage(candy);

        document.getElementById("candyName").value = "";
        document.getElementById("candyDescription").value = "";
        document.getElementById("candyPrice").value = "";
        document.getElementById("candyQuantity").value = "";
    }
});

function createCandyListItem(candy) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${candy.name} - ${candy.description}, Price: Rs.${candy.price}, Quantity: ${candy.quantity}
    <button class="buy" data-amount="1">Buy One</button>
    <button class="buy" data-amount="2">Buy Two</button>
    <button class="buy" data-amount="3">Buy Three</button>`;
    candyList.appendChild(listItem);

    const buyButtons = listItem.getElementsByClassName("buy");
    for (const button of buyButtons) {
        button.addEventListener("click", function () {
            const amount = parseInt(button.getAttribute("data-amount"));
            candy.quantity -= amount;
            if (candy.quantity < 0) {
                candy.quantity = 0;
            }
            // Update the listItem's innerHTML with the new quantity
            listItem.innerHTML = `${candy.name} - ${candy.description}, Price: Rs.${candy.price}, Quantity: ${candy.quantity}
            <button class="buy" data-amount="1">Buy One</button>
            <button class="buy" data-amount="2">Buy Two</button>
            <button class="buy" data-amount="3">Buy Three</button>`;

            // Update the candy in local storage
            updateCandyInLocalStorage(candy);
        });
    }
}

function saveCandyToLocalStorage(candy) {
    const savedCandies = JSON.parse(localStorage.getItem("candies")) || [];
    savedCandies.push(candy);
    localStorage.setItem("candies", JSON.stringify(savedCandies));
}

function updateCandyInLocalStorage(candy) {
    const savedCandies = JSON.parse(localStorage.getItem("candies")) || [];
    const index = savedCandies.findIndex((c) => c.name === candy.name);
    if (index !== -1) {
        savedCandies[index] = candy;
        localStorage.setItem("candies", JSON.stringify(savedCandies));
    }
}









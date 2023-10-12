const candyList = document.getElementById("candyList");
const addCandyButton = document.getElementById("addCandy");

addCandyButton.addEventListener("click", function () {
    const candyName = document.getElementById("candyName").value;
    const candyDescription = document.getElementById("candyDescription").value;
    const candyPrice = parseFloat(document.getElementById("candyPrice").value);
    let candyQuantity = parseInt(document.getElementById("candyQuantity").value); // Declare candyQuantity here

    if (candyName && candyPrice >= 0 && candyQuantity >= 0) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${candyName} - ${candyDescription}, Price: Rs.${candyPrice}, Quantity: ${candyQuantity}
        <button class="buy" data-amount="1">Buy One</button>
        <button class="buy" data-amount="2">Buy Two</button>
        <button class="buy" data-amount="3">Buy Three</button>`;
        candyList.appendChild(listItem);

        const buyButtons = listItem.getElementsByClassName("buy");
        for (const button of buyButtons) {
            button.addEventListener("click", function () {
                const amount = parseInt(button.getAttribute("data-amount"));
                candyQuantity -= amount;
                if (candyQuantity < 0) {
                    candyQuantity = 0;
                }
                // Update the listItem's innerHTML with the new quantity
                listItem.innerHTML = `${candyName} - ${candyDescription}, Price: Rs.${candyPrice}, Quantity: ${candyQuantity}
                <button class="buy" data-amount="1">Buy One</button>
                <button class="buy" data-amount="2">Buy Two</button>
                <button class="buy" data-amount="3">Buy Three</button>`;
            });
        }

        document.getElementById("candyName").value = "";
        document.getElementById("candyDescription").value = "";
        document.getElementById("candyPrice").value = "";
        document.getElementById("candyQuantity").value = "";
    }
});









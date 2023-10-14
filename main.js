const candyList = document.getElementById("candyList");
const addCandyButton = document.getElementById("addCandy");




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

        axios.post('https://crudcrud.com/api/377db030f3004ff18ce1f423c03445d4/candyshop', candy)
            .then(response => {
               
                console.log('Candy item created:', response.data);
                createCandyListItem(response.data); 
            })
            .catch(error => {
                console.error('Error creating candy item:', error);
            });

        

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

           
        });
    }
}









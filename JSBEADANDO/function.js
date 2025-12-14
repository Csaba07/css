let products = {};
let editingName = null;

function addOrUpdateProduct() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    if (name === "" || price === "" || quantity === "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    if (editingName === null) {
        if (products[name]) {
            alert("Ez a termék már létezik!");
            return;
        }
        products[name] = {
            price: Number(price),
            quantity: Number(quantity)
        };
    } else {
        products[editingName].price = Number(price);
        products[editingName].quantity = Number(quantity);
        editingName = null;
        nameInput.disabled = false;
    }

    clearInputs();
    renderTable();
}

function renderTable() {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    for (let name in products) {
        table.innerHTML += `
            <tr>
                <td>${name}</td>
                <td>${products[name].price}</td>
                <td>${products[name].quantity}</td>
                <td>
                    <button class="edit" onclick="editProduct('${name}')">Módosít</button>
                    <button class="delete" onclick="deleteProduct('${name}')">Töröl</button>
                </td>
            </tr>
        `;
    }
}

function editProduct(name) {
    document.getElementById("name").value = name;
    document.getElementById("price").value = products[name].price;
    document.getElementById("quantity").value = products[name].quantity;
    document.getElementById("name").disabled = true;
    editingName = name;
}

function deleteProduct(name) {
    delete products[name];
    renderTable();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("name").disabled = false;
}

const API = "https://surveys-5jvt.onrender.com/api/cars";

function loadCars() {
    fetch(API)
        .then(res => res.json())
        .then(cars => {
            let html = "";
            cars.forEach((car, index) => {
                html += `
                    <div class="card">
                        <h3>${car.model}</h3>
                        <button class="view" onclick="getCar(${car.id})">Megtekintés</button>
                        ${index >= 4 ? `
                            <button class="edit" onclick="editCar(${car.id})">Szerkesztés</button>
                            <button class="delete" onclick="deleteCar(${car.id})">Törlés</button>
                        ` : ""}
                    </div>
                `;
            });
            document.getElementById("cars").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("error").innerText = "Nem sikerült az autók betöltése.";
        });
}

loadCars();

function getCar(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(car => {
            if (!car.model || !car.brand || !car.year) {
                document.getElementById("details").style.display = "none";
                document.getElementById("details").innerHTML = "";
                return;
            }

            const details = document.getElementById("details");
            details.style.display = "block";

            details.innerHTML = `
                <h2>Autó részletei</h2>
                <p><b>Model:</b> ${car.model}</p>
                <p><b>Brand:</b> ${car.brand}</p>
                <p><b>Year:</b> ${car.year}</p>
            `;
        })
        .catch(() => {
            document.getElementById("details").style.display = "none";
        });
}

document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newCar = {
        model: model.value,
        brand: brand.value,
        year: Number(year.value)
    };

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar)
    })
    .then(res => res.json())
    .then(car => {
        loadCars();
        getCar(car.id);
        e.target.reset();
    })
    .catch(() => {
        document.getElementById("error").innerText = "Nem sikerült az autó mentése!";
    });
});

function editCar(id) {
    const model = prompt("Új modell:");
    const brand = prompt("Új márka:");
    const year = prompt("Új év:");

    if (!model || !brand || !year) return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, brand, year: Number(year) })
    })
    .then(() => {
        loadCars();
        getCar(id);
    })
    .catch(() => {
        alert("Hiba a módosítás során!");
    });
}

function deleteCar(id) {
    if (!confirm("Biztosan törlöd?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
    .then(() => {
        loadCars();

        const details = document.getElementById("details");
        details.style.display = "none";
        details.innerHTML = "";
    })
    .catch(() => {
        alert("Hiba a törlés során!");
    });
}

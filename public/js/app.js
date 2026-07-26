const button = document.getElementById("search");
const weather = document.getElementById("weather");
const cityInput = document.getElementById("city");
const body = document.body;

cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        button.click();

    }

});

button.addEventListener("click", async () => {

    const city = cityInput.value;

    try {
        weather.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Loading weather...</span>
            </div>
`;

        const response = await fetch(`/weather?city=${city}`);

        const data = await response.json();

        console.log(data);

        if (data.error) {

            weather.innerHTML = `<span class="errorMessage">${data.error}</span>`;
            return

        }

        const body = document.body;

        switch (data.weatherCode) {

            case 113:
                body.style.background = "linear-gradient(135deg,#f6d365,#fda085)";
                break;

            case 116:
                body.style.background = "linear-gradient(135deg,#89f7fe,#66a6ff)";
                break;

            case 119:
                body.style.background = "linear-gradient(135deg,#757F9A,#D7DDE8)";
                break;

            default:
                body.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)";
        }

        weather.innerHTML = `

            <div class="weather-info">

                <div class="main-info">
                    <img class="weather-icon"
                        src="${data.icon}"
                        alt="Weather">

                    <h1>${data.temperature}°C</h1>

                    <h2>${data.description}</h2>

                    <h3>📍 ${data.city}</h3>

                    <p>${data.region}, ${data.country}</p>
                </div>

                <div class="details">

                    <div class="detail">
                        <span><img src="../Images/alta-temperatura.png" alt="sensacion termica" width="30" height="30" /></span>
                        <h4>${data.feelsLike}°C</h4>
                        <small>Sensación Térmica</small>
                    </div>

                    <div class="detail">
                        <span><img src="../Images/gota.png" alt="Humedad" width="30" height="30" /></span>
                        <h4>${data.humidity}%</h4>
                        <small>Humedad</small>
                    </div>

                    <div class="detail">
                        <span><img src="../Images/viento.png" alt="Viento" width="30" height="30" /></span>
                        <h4>${data.wind} km/h</h4>
                        <small>Viento</small>
                    </div>

                    <div class="detail">
                        <span><img src="../Images/presion.png" alt="Presion" width="30" height="30" /></span>
                        <h4>${data.pressure}</h4>
                        <small>Presión</small>
                    </div>

                    <div class="detail">
                        <span><img src="../Images/vision.png" alt="Visibilidad" width="30" height="30" /></span>
                        <h4>${data.visibility} km</h4>
                        <small>Visibilidad</small>
                    </div>

                    <div class="detail">
                        <span><img src="../Images/reloj.png" alt="Hora Local" width="30" height="30" /></span>
                        <h4>${data.localtime}</h4>
                        <small>Hora Local</small>
                    </div>

                </div>

            </div>

            `;

    } catch (error) {
        if (error.status === 400) {
            weather.innerHTML = `<p>${error.message}</p>`;
        }
        weather.innerHTML = `<p> UNEXPECTED ERROR: ${error}</p>`;
    }


});
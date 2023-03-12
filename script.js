(function () {
    const apiKey = "0b5c4e1ee65c9d1f4784d4777599a993";
    const input = document.querySelector("input");
    const weatherInfo = document.querySelector("#weather-info");

    input.onkeyup = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${apiKey}`)
                .then((response) => response.json())
                .then((json) => updateUISuccess(json))
                .catch(() => updateUIFailure());

            e.target.value = "";
        }
    };

    function updateUISuccess(json) {
        let temp = Math.floor(json.main.temp - 272.15);
        const cityName = document.createElement("h1");
        const cityTemp = document.createElement("div");
        const weatherCondition = document.createElement("div");
        cityName.id = "city-name";
        cityTemp.id = "city-temp";
        weatherCondition.id = "temperary"
        cityName.innerHTML = `${json.name}<sup>${json.sys.country}</sup>`;
        cityTemp.innerHTML = `${temp}<sup>°C</sup>`;
        weatherInfo.innerHTML = "";
        weatherInfo.style.display = 'block';

        weatherCondition.innerHTML = `
            <img id="weather-icon" src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" />
            <p id="weather-desc">${(json.weather[0].description).toUpperCase()}</p>
        `

        weatherInfo.append(cityName, cityTemp, weatherCondition);
    }

    function updateUIFailure() {
        weatherInfo.innerHTML = "<h1>City not found</h1>";
        weatherInfo.style.display = 'block';
    }
})();

function main() {
  const baseUrl = "https://covid19.mathdro.id/api";

  const getGlobalCases = () => {
    fetch(`${baseUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderGlobalConfirmed(responseJson.confirmed.value);
          renderGlobalRecovered(responseJson.recovered.value);
          renderGlobalDeaths(responseJson.deaths.value);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const getCountryCases = () => {
      fetch(`${baseUrl}/countries`)
      .then((response) => {
          return response.json();
      })
      .then((responseJson) => {
          if (responseJson.error) {
              showResponseMessage(responseJson.message);
          } else {
              renderCountries(responseJson.countries);
          }
      })
  }

  const getDetailCountry = (iso2) => {
    fetch(`${baseUrl}/countries/${iso2}/confirmed`)
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            return responseJson[0].countryRegion;
        }
    })
}

  const renderCountries = (countries) => {
    const listCountries = document.querySelector("#listCountry");
    listCountries.innerHTML = "";

    countries.forEach((country) => {
        let countryName = getDetailCountry(country.iso2);

        listCountries.innerHTML +=
        `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card">
            <div class="card-body">
                <h5><img src="https://www.countryflags.io/${country.iso2}/shiny/64.png"> ${countryName}</h5>
                <p>123.456.789 <span>confirmed cases</span></p>
                <p>23.456.789 <span>recovered</span></p>
                <p>3.456.789 <span>deaths</span></p>
            </div>
        </div>
    </div>`
    })
  }

  const renderGlobalConfirmed = (confirmed) => {
    const data = confirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const listGlobalCases = document.querySelector("#listGlobalCases");
    listGlobalCases.innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
        <div class="card-body">
            <div class="content">
                <h5>Confirmed</h5>
                <p>${data}<br><span>confirmed cases</span></p>
            </div>
            <div class="icon">
                <i class="fa fa-plus"></i>
            </div>
        </div>
    </div>
</div>`;
  };

  const renderGlobalRecovered= (recovered) => {
    const data = recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const listGlobalCases = document.querySelector("#listGlobalCases");
    listGlobalCases.innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
        <div class="card-body">
            <div class="content">
                <h5>Recovered</h5>
                <p>${data}<br><span>recovered cases</span></p>
            </div>
            <div class="icon">
                <i class="fa fa-heart"></i>
            </div>
        </div>
    </div>
</div>`;
  };

  const renderGlobalDeaths = (deaths) => {
    const data = deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const listGlobalCases = document.querySelector("#listGlobalCases");
    listGlobalCases.innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
        <div class="card-body">
            <div class="content">
                <h5>Deaths</h5>
                <p>${data}<br><span>death cases</span></p>
            </div>
            <div class="icon">
                <i class="fa fa-minus"></i>
            </div>
        </div>
    </div>
</div>`;
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    getGlobalCases();
    getCountryCases();
  });
}

export default main;

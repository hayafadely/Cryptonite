function handleList(event) {
    event.preventDefault();
    document.getElementById("child").innerHTML = '';
    setTimeout(() => {
        document.getElementById("child").innerHTML = `<div class="loading"><div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div>
            <div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div>
            <div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div></div>`
    }, 1)
    setTimeout(() => {
        document.getElementById("child").innerHTML = '';
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
            success: response => {
                for (let index = 0; index < response.length; index++) {
                    document.getElementById("child")
                        .innerHTML += `<div id="${response[index].symbol}" class="card" style="width: 18rem;">
                <div class="card-body">
                <div class="custom-control custom-switch">
                <h5 class="card-title"> <img src="${response[index].image}}" />${response[index].symbol}</h5>
                <input type="checkbox" value="${response[index].symbol}" class="custom-control-input ${response[index].symbol}" id="${response[index].id}" onclick="myEvent(event)" ${(localStorage.getItem(response[index].symbol) != null) && 'checked'} > 
                <label class="custom-control-label" for="${response[index].id}"></label>
              </div>
                  <p class="card-text">${response[index].name}</p>
                  <button id="${response[index].id}" class="btn btn-primary" onclick="handleMoreInfo(event)" type="button" 
                  data-toggle="collapse" data-target="#${response[index].id + response[index].id}" aria-expanded="false"
                   aria-controls="collapseExample"> More info</button>
                  <p class="collapse .loading-price text-danger" id="${response[index].id + response[index].id}">
                 </p>
                </div>
              </div>`


                }
            },
            error: err => alert(err.status)
        });
    }, 3100);

}

function handleMoreInfo(event) {
    event.preventDefault();
    document.getElementById(event.target.id + event.target.id).innerHTML = `<div class="loading-price">
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
  `
    setTimeout(() => {

        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/" + event.target.id,
            success: response => {
                document.getElementById(event.target.id + event.target.id)
                    .innerHTML = `${response.market_data.current_price.usd} $ <br>
                                  ${response.market_data.current_price.eur} € <br>
                                  ${response.market_data.current_price.ils} ₪`
            }
        });
    }, 1000)

}
function handleAboutPage(event) {
    event.preventDefault();
    document.getElementById("child").innerHTML = `<h1>Welcome in About Page</h1>`;

}

function myEvent(event) {
    if (event.target.checked === false) {
        localStorage.removeItem(event.target.value);
    } else {
        localStorage.setItem(event.target.value, event.target.value);
    }
}


function search(event) {
    event.preventDefault();
    var input = document.getElementById("Search");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('card')

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "inline-block";
        } else {
            nodes[i].style.display = "none";
        }
    }
}

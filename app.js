const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json"
const dropdowns = document.querySelectorAll(".dropdown select")
const msg = document.querySelector(".msg")

// for(let code in countryList){
//     console.log(code, countryList[code])
// }

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerHTML = currCode
        newOption.value = currCode
        if(select.name=="from" && currCode=="USD"){
            newOption.selected = "selected"
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt)
    })
}

const updateFlag = (evt) => {
    let currCode = evt.target.value; // Get selected currency code
    let countryCode = countryList[currCode];

    if (countryCode) {
        let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

        // Select the correct image inside the same select-container
        let selectContainer = evt.target.closest(".select-container"); 
        let img = selectContainer.querySelector(".flag-logo");
        
        if (img) {
            img.src = newsrc;
        } else {
            console.error("Flag image not found in the select-container");
        }
    } else {
        console.error("Country code not found for:", currCode);
    }
}; 

const fetchData = async (fromCountry)=> {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCountry.toUpperCase()}`;
    let response = await fetch(url)
    let data = await response.json()
    return data.rates
}

const convertCurrency = async () => {
    let amount = document.querySelector(".amount input").value
    let fromCountry = document.querySelector(".from select").value
    let toCountry = document.querySelector(".to select").value
    console.log(fromCountry,toCountry)

    let rates = await fetchData(fromCountry)
    console.log(rates)

    console.log(rates[toCountry]*amount)
    const ans = rates[toCountry]*amount
    msg.innerText = `${amount} ${fromCountry} = ${ans} ${toCountry}`
    
}

let exchangeBtn = document.querySelector("button")
exchangeBtn.addEventListener("click", (event)=> {
    event.preventDefault(); //prevents from reloading the page
    convertCurrency()
})




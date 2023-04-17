let searchButton = document.querySelector('#searchDigimon')
let digimonsCard = document.querySelector('#digimonCard')
let digimonChoice = document.querySelector('#digimonChoice')
console.log(digimonChoice)

let clearButton = document.getElementById('clear-history')

//History Digimon
let selectedDigimons = []
let storedDigimons = JSON.parse(localStorage.getItem('history'))
console.log(storedDigimons)

function displayHistoryDigimons () {
    if(localStorage.getItem('history').length > 0)
    storedDigimons.forEach(storedDigimon => {
        digimonChoice.insertAdjacentHTML("beforeend", storedDigimon)
    })
}


function displayDigimons () {
    digimonsCard.innerHTML = ''
    fetch('http://127.0.0.1:3000/digimons')
    .then(response => response.json())
    .then((data) => {
        data.forEach((digimons) => {
            digimonsCard.insertAdjacentHTML(
                "beforeend",
                `
            <article class ="digimons">    
                <div class="card-container">
                    <div class="card" style="width: 18rem;">
                        <img src="${digimons.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${digimons.name}</h5>
                        <p class="card-text">Type: ${digimons.type}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Level: ${digimons.level}</li>
                        <li class="list-group-item">Attribute: ${digimons.attribute}</li>
                        </ul>
                        
                        <button class="btn btn-primary" id="add">Add Digimon</button>
                    
                    </div>
                </div>
            </article>
            `
            );
            
        });
    })
    .then(() => {
        let addButtons = document.querySelectorAll('#add')
        addButtons.forEach(addButton => {
            addButton.addEventListener('click', (event)=> {
                let digimonElement = event.target.parentElement.outerHTML
                console.log(digimonElement)
                digimonChoice.insertAdjacentHTML("beforeend", digimonElement)
                selectedDigimons.push(digimonElement)
                localStorage.setItem('history', JSON.stringify(selectedDigimons))
            });
        });
    });
}

clearButton.addEventListener('click', () => {
    selectedDigimons = []
    digimonChoice.innerHTML = ''
    localStorage.setItem('history', JSON.stringify(selectedDigimons))
})

searchButton.addEventListener('click', function () {
    displayDigimons('searchDigimon')
})

displayDigimons()
displayHistoryDigimons()





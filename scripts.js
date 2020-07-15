
//we are going to attempt to code an app that will pull pokemon information based on a request in an input field.

/*
TODO:
code fetch function for the pokeapi
code display function for pokedata
set code to accept an input from user
    return correct data for input 
        display poke name, picture, ability
*/

let searchterm;
let resultArea = document.getElementById('results');

let displayPoke = (data) => {
    resultArea.textContent = undefined;
    //img, p, p
    let pokeImage = document.createElement('img');
    let name = document.createElement('h2');
    
    pokeImage.src = data.sprites.front_default;
    name.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    // I want to pull all listed types for a pokemon, but I want them displayed displayed as a string on one line 
    // let pokeType = document.createElement('p');
    // let typeObj = ""
    // // I need a for loop to pull all the type name
    // for (i = 0; i < data.types.length; i++) {
    //     typeObj = typeObj + data.type[i] + '/';
    //     pokeType = typeObj
    // }

    // resultArea.appendChild(pokeType);
    

    let height = document.createElement('p');
    let weight = document.createElement('p');
    
    height.innerText = "Height: " + data.height + "m"
    weight.innerText = "Weight: " + data.weight + "kg"

    //let descriptionContainer = document.querySelector('descriptionContainer')

    resultArea.appendChild(pokeImage);
    resultArea.appendChild(name);
    resultArea.appendChild(height);
    resultArea.appendChild(weight);


    let abilityHead = document.createElement('h4')
    abilityHead.innerText = "Abilities:"
    resultArea.appendChild(abilityHead);

    let abilityList = document.createElement('ul');
   
    for (abilityObj of data.abilities) {
        abilityElement = document.createElement('li');
        abilityElement.innerText = abilityObj.ability.name;
        abilityList.appendChild(abilityElement);
    }

    resultArea.appendChild(abilityList);

    let moveHead = document.createElement('h4')
    moveHead.innerText = "Moves:"
    resultArea.appendChild(moveHead);

    let moveList = document.createElement('ul');

    for (moveObj of data.moves) {
        moveElement = document.createElement('li');
        moveElement.innerText = moveObj.move.name;
        moveList.appendChild(moveElement);
    }

    resultArea.appendChild(moveList);

}

let getPoke = async (pokeName) => {
    try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokeName.toLowerCase() }/`);
    let data = await response.json();
    console.log(data);
    displayPoke(data);
    } catch {
        console.error('D\'oh!');
    }
}


document.getElementById('search').addEventListener('keyup', (event) => {
    searchterm = event.target.value
    console.log(searchterm);
});

document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();
    getPoke(searchterm)
});
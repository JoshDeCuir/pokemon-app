var pokemonRepository = (function (){
    var pokemonList = [
        {name:"Bulbasaur", height: 0.7, type: ['Grass , Poison']},
        {name:"Charmander", height: 0.6, type: 'Fire'},
        {name:"Charizard", height: 1.7, type: ['Flying , Fire']},
        {name:"Squirtle", height: 0.5, type: 'Water'}
    ];
    
    function addListItem(pokemon){
        var pokemonList = document.querySelector(".pokemon-list");
        var listPokemon = document.createElement("li");
        var button = document.createElement("button");
        button.addEventListener("click", function(){
            showDetails(pokemon.name);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }
    function showDetails(pokemon){
        console.log(pokemon);
    }
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})();

        pokemonRepository.add({name: "Evee", height: 0.2, type: 'Normal'});

        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
            document.createElement('button');
        
    });


var pokemonRepository = (function (){
    var pokemonList = [];
    var pokemonAPI ="https://pokeapi.co/api/v2/pokemon/?limit=150";

    function addListItem(pokemon){
        var button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn");
        button.classList.add("button-class");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#modal-container");
        button.addEventListener("click", function(event){
            showDetails(pokemon);
        });
        
        var listPokemon = document.createElement("li");
        listPokemon.classList.add("list-item");
        listPokemon.classList.add("col-md-4");
        listPokemon.appendChild(button);
        
        var pokemonList = document.querySelector("#pokemon-list");
        pokemonList.appendChild(listPokemon);
    }

    function add(pokemon){
        if(typeof pokemon === "object" && 'name' in pokemon)
        {
            pokemonList.push(pokemon);
        }
        else
        {
            console.log('Pokemon is not correct.')
        }
    }

    function loadList() {
        return fetch(pokemonAPI).then(function (response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                var pokemon ={
                    name: item.name,
                    detailsURL: item.url
                };
                add (pokemon);
            });
        }).catch(function(e){
            console.error(e);
        });
    }

    function loadDetails (item){
        var url = item.detailsURL;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.type = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item){
        loadDetails(item).then(function() 
        {
            // Add Pokemon Details
            $("#pokemon-name").prop("innerText", item.name);
            $("#pokemon-height").prop("innerText", "Height: " + item.height);
            $("#pokemon-type").prop("innerText", "Type: " + item.type.map(function (x) { return x.type.name; }));
            $("#pokemon-img").prop("src", item.imageUrl);
        });
    }

    function getAll(){
        return pokemonList;
    }
    
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

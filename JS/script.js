var pokemonRepository = (function (){
    var pokemonList = [];
    var pokemonAPI ="https://pokeapi.co/api/v2/pokemon/?limit=150";
    var modalContainer = document.querySelector("#modal-container");
    
    function addListItem(pokemon){
        var button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener("click", function(event){
            showDetails(pokemon);
        });
        
        var listPokemon = document.createElement("li");
        listPokemon.appendChild(button);
        
        var pokemonList = document.querySelector(".pokemon-list");
        pokemonList.appendChild(listPokemon);
    }

    function add(pokemon){
        if(
            typeof pokemon === "object" &&
            'name' in pokemon
        ){
            pokemonList.push(pokemon);
        } else{
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item){
        loadDetails(item).then(function() 
        {
            showModal(item);
        });
    }

    function showModal(item){
        // Create modal div
        var modal = document.createElement("div");
        modal.classList.add("modal");

        // Create Close Button
        var closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click" , hideModal);
        modal.appendChild(closeButtonElement);
        
        // Add Pokemon Details
        var titleElement = document.createElement("h1");
        titleElement.innerText = item.name;
        modal.appendChild(titleElement);
        var contentElement = document.createElement("p");
        contentElement.innerText = "Height: " + item.height;
        modal.appendChild(contentElement);
        var imageElement = document.createElement("img");
        imageElement.src = item.imageUrl;
        modal.appendChild(imageElement);

        // Add Modal To Container
        modalContainer.appendChild(modal);
        modalContainer.classList.add("is-visible");
    }

    function hideModal(){;
        modalContainer.innerHTML = "";
        modalContainer.classList.remove("is-visible");
    }

    window.addEventListener("keydown", (e) =>{
        if (e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")){
            hideModal();
        }
    });
    
    modalContainer.addEventListener("click" , (e) =>{
        //Since this is also triggered when clicking INSIDE the modal
        //We only want to close if the user clicks directly on the overlay
        var target = e.target;
        if(target === modalContainer){
            hideModal();
        }
    });

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

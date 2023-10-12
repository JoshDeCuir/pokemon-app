var pokemonRepository = (function (){
var modalContainer = document.querySelector
    ("#modal-container");
    var pokemonList = [];
    var pokemonAPI ="https://pokeapi.co/api/v2/pokemon/?limit=150";
    
    function showModal(title, text){
        var modalContainer = document.querySelector("#modal-container");
        modalContainer.innerHTML = "";
            var modal = document.createElement("div");
                modal.classList.add("modal");
            var closeButtonElement = document.createElement
            ("button");
                closeButtonElement.classList.add("modal-close");
                closeButtonElement.innerText = "Close";
                closeButtonElement.addEventListener("click" , hideModal);
            var titleElement = document.createElement("h1");
                titleElement.innerText = title;
            var contentElement = document.createElement("p");
                contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add("is-visible");
    }
    function hideModal(){
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

    document.querySelector("#show-modal").addEventListener
    ("click", () =>{
        showModal("Modal title", "This is the modal content!");
    });

    function addListItem(pokemon){
        var pokemonList = document.querySelector(".pokemon-list");
        var listPokemon = document.createElement("li");
        var button = document.createElement("button");
        button.addEventListener("click", function(){
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener("click", function(event){
            showDetails(pokemon);
        });
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
            item.imageUrl = details.sprites.font_dafult;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item){
    loadDetails(item).then(function() 
        {
            console.log(item);
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

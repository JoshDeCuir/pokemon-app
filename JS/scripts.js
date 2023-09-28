var pokemonRepository = (function (){
    var pokemonList = [
        {name:"Bulbasaur", height: 0.7, type: ['Grass , Poison']},
        {name:"Charmander", height: 0.6, type: 'Fire'},
        {name:"Charizard", height: 1.7, type: ['Flying , Fire']},
        {name:"Squirtle", height: 0.5, type: 'Water'}
    ];
    return{
        add: function(pokemon){
            pokemonList.push(pokemon);
        },
        getAll: function(){
            return pokemonList;
        }
    };
})();

//Define the height threshold 
//var bigPokemon = 1.5;

//for(var i = 0; i < pokemonList.length; i++){
    //var pokemon = pokemonList[i];
    //var output = pokemon.name + " (height: " + pokemon.height + ")";
    
    //if(pokemon.height > bigPokemon){
        //output += 'Wow, thats big!';
    //}
     // Display the Pokémon information with the special label
    //document.write("<p>" + output + "</p>");
    
    //document.getElementById("output").innerHTML += `Name: ${pokemon.name}, Height: ${pokemon.height}, Type: ${pokemon.type}<br>`;
//}
pokemonRepository.add({name: "Evee", height: 0.2, type: 'Normal'});

pokemonRepository.getAll().forEach(function(pokemon){
    document.getElementById("output").innerHTML += 'Name:' + pokemon.name + ' , Height:' + pokemon.height + ' , Type:' + pokemon.type + '<br>';
});

var pokemonList = [
    {name:"Bulbasaur", height: 0.7, type: ['Grass , Poison']},
    {name:"Charmander", height: 0.6, type: 'Fire'},
    {name:"Charizard", height: 1.7, type: ['Flying , Fire']},
    {name:"Squirtle", height: 0.5, type: 'Water'}
];
//Define the height threshold 
var bigPokemon = 1.5;

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
pokemonList.forEach(function(pokemon){
    document.getElementById("output").innerHTML += 'Name:' + pokemon.name + ' , Height:' + pokemon.height + ' , Type:' + pokemon.type + '<br>'
    
});

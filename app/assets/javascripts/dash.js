var dashcode = (function() {
    var attachNewDeckHandler = function() {
        var el = document.getElementById("create-deck-button");
        el.addEventListener('click', createNewDeck, false);
    };

    var createNewDeck = function(e) {
        e.preventDefault();
        var el = document.getElementById("deck-name");
        var deckName = el.value;
        console.log("deck name: " + deckName);
        var data = {name: deckName};

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200) {
                var deck = xhr.responseText;
                displayNewDeck(deck);
            } else {
                var resp = "Status code: " + xhr.statusText;
            }
        };
        xhr.open('POST', '/decks', true);
        // xhr.send(data);
        xhr.send(JSON.stringify(data));
    };

    var displayNewDeck = function(deck) {
        //  parse response, concatenate it
        console.log(deck.name);
    };

    var start = function() {
        attachNewDeckHandler();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    dashcode.start();
});
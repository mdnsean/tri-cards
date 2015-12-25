var Dash = (function() {
    var attachNewDeckHandler = function() {
        var el = document.getElementById("new-deck-button");
        el.addEventListener('click', createNewDeck, false);
    };

    var createNewDeck = function() {
        var xhr = new XMLHttpRequest();
        // toggle new deck form modal
        xhr.open('POST', '/decks', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var deck = JSON.parse(xhr.responseText);
                displayNewDeck(deck);
            } else {
                var resp = "Status code: " + JSON.parse(xhr.statusText);
            }
        };
    };

    var displayNewDeck = function(deck) {
        //  parse response, concatenate it
        console.log(deck);
    };

    var start = function() {
        attachNewDeckHandler();
    };

    return {
        start: start
    };
})();
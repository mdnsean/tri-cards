var dashcode = (function() {

    var attachSelectDeckHandler = function() {
        var elems = document.getElementsByClassName("select-deck");
        for (el in elems) {
            el.addEventListener('click', function() {
                selectDeck(parseInt(el.name));
            }, false);
        }
    }

    var selectDeck = function(id) {
        var cards = document.getElementById("cards");

    }

    var attachNewDeckHandler = function() {
        var el = document.getElementById("create-deck-button");
        el.addEventListener('click', createNewDeck, false);
    };

    var createNewDeck = function(e) {
        e.preventDefault();
        document.getElementById("close-nd-modal").click();
        var el = document.getElementById("deck-name");
        var deckName = el.value;

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200) {
                var deck = xhr.responseText;
                displayNewDeck(JSON.parse(deck).name);
            } else {
                var resp = "Status code: " + xhr.statusText;
            }
        };

        xhr.open('POST', '/decks', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Data-Type', 'json');
        xhr.send(JSON.stringify({
            name: deckName
        }));
    };

    var displayNewDeck = function(name) {
        var newEl = document.createElement("button");
        var deckName = document.createTextNode(name);
        newEl.appendChild(deckName);
        newEl.className += " select-deck";
        document.getElementById("deck-list").appendChild(newEl);
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
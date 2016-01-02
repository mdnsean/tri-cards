var dashcode = (function() {

    var attachNewDeckHandler = function() {
        var el = document.getElementById("create-deck-button");
        el.addEventListener('click', createNewDeck, false);
    };

    var attachSelectDeckHandler = function() {
        var elems = document.getElementsByClassName("select-deck");
        console.log(elems);
        for (var i = 0; i < elems.length; i++) {
        // for (var el in elems) {
            var el = elems[i];
            el.addEventListener('click', function() {
                selectDeck(parseInt(el.name));
            }, false);
        }
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

    var selectDeck = function(id) {
        // var cards = document.getElementById("cards");
        console.log("selected button for deck id: " + id);
        var addCardButton = document.getElementById("add-card-" + id);
        console.log("+ butt classname: " + addCardButton.className);
        addCardButton.classList.remove("hidden");
        console.log("+ butt classname: " + addCardButton.className);
    };

    var start = function() {
        attachNewDeckHandler();
        attachSelectDeckHandler();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    dashcode.start();
});
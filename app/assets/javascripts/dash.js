var dashcode = (function() {

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
    
    var attachSelectDeckHandler = function() {
        var parent = document.getElementById("deck-list");
        parent.addEventListener('click', selectDeck, false);
    };

    var selectDeck = function(e) {
        if (e.target !== e.currentTarget) {
            var deckName = e.target.textContent;
            var butt = document.getElementById("add-card-button");
            var nameLabel = document.getElementById("deck-name-label");            
            var leftLabel = document.getElementById("deck-left-label");
            var rightLabel = document.getElementById("deck-right-label");
            
            butt.textContent = "Selected deck: " + deckName;
            nameLabel.textContent = deckName + ": Add Card";
        }
        e.stopPropagation();
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
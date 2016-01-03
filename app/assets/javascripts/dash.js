var dashcode = (function() {

    var makeAjaxRequest = function(method, url, data, onload) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            onload(xhr);
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Data-Type', 'json');
        xhr.send(JSON.stringify(data));
    };

    var attachNewDeckHandler = function() {
        var el = document.getElementById("create-deck-button");
        el.addEventListener('click', createNewDeck, false);
    };

    var createNewDeck = function(e) {
        e.preventDefault();
        document.getElementById("close-nd-modal").click();
        var deckName = document.getElementById("deck-name").value;
        var left = document.getElementById("deck-left-input").value;
        var right = document.getElementById("deck-right-input").value;
        var data = {
            name: deckName;
            left: left;
            right: right;
        };

        var onload = function(xhr) {
            if (xhr.status === 200) {
                var deck = xhr.responseText;
                displayNewDeck(JSON.parse(deck).name);
            } else {
                var resp = "Status code: " + xhr.statusText;
            }
        };
        makeAjaxRequest('POST', '/decks', data, onload);
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
            var deckId = e.target.name;
            var nameLabel = document.getElementById("deck-name-label");            
            var leftLabel = document.getElementById("deck-left-label");
            var rightLabel = document.getElementById("deck-right-label");
            
            nameLabel.textContent = deckName + ": Add Card";
            
        }
        e.stopPropagation();
    };

    // var getCards = function(deckId) {
    //     var data = {
    //         id: deckId;
    //     };
    //     var onload = function() {
    //         if (xhr.status === 200) {

    //         } else {
    //             flash[:info] = "Status code: " + xhr.statusText;
    //         }
    //     };
    //     makeAjaxRequest('GET', '/decks/' + , data, onload);
    // // var makeAjaxRequest = function(method, url, data, onload)
    // };

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
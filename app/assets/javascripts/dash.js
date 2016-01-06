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
            name: deckName,
            left: left,
            right: right
        };

        var onload = function(xhr) {
            if (xhr.status === 200) {
                var deck = xhr.responseText;
                displayNewDeck(JSON.parse(deck));
            } else {
                console.log("Status code: " + xhr.statusText);
            }
        };
        makeAjaxRequest('POST', '/decks', data, onload);
    };

    var displayNewDeck = function(deck) {        
        var newDiv = document.createElement("div");
        var newButton = document.createElement("button");
        var deckName = document.createTextNode(deck.name);
        
        newDiv.className += " select-deck";
        newButton.setAttribute("name", deck.id);
        newButton.appendChild(deckName);
        newDiv.appendChild(newButton);
        document.getElementById("deck-list").appendChild(newDiv);
    };
    
    var attachSelectDeckHandler = function() {
        var parent = document.getElementById("deck-list");
        parent.addEventListener('click', selectDeck, false);
    };

    var selectDeck = function(e) {
        if (e.target !== e.currentTarget) {
            var curDeck = document.getElementById("current-deck");
            if (curDeck.textContent === e.target.textContent) {
                return; // do nothing if this deck already selected
            }
            var deckId = e.target.name;
            var data = {
                id: deckId
            };
            var onload = function(xhr) {
                if (xhr.status === 200) {
                    var resp = (JSON.parse(xhr.responseText));
                    getAddCardForm(resp.deck);
                    showCards(resp.deck, resp.cards);
                } else {
                    console.log("Status code: " + xhr.statusText);
                }
            };
            makeAjaxRequest('GET', '/decks/' + deckId, data, onload);
        }
        e.stopPropagation();
    };

    var getAddCardForm = function(deck) {
            var nameLabel = document.getElementById("deck-name-label");            
            var leftLabel = document.getElementById("deck-left-label");
            var rightLabel = document.getElementById("deck-right-label");
            var id = document.getElementById("deck-id-input");

            nameLabel.textContent = deck.name + ": Add Card";
            leftLabel.textContent = deck.left;
            rightLabel.textContent = deck.right;
            id.value = deck.id;
    };

    var showCards = function(deck, cards) {
        var curDeck = document.getElementById("current-deck");
        curDeck.textContent = deck.name;
        var cardList = document.getElementById("card-list");
        cardList.innerHTML = "";
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            cardList.innerHTML += "<div id='build-card' class='select-card'>\
<button class='card-name'></button>\
<div class='hidden-later'>\
<div class='card-left'></div>\
<div class='card-right'></div>\
</div>\
</div>";
            var buildCard = document.getElementById("build-card");
            var cName = buildCard.childNodes[0];
            var cHidden = buildCard.childNodes[1];
            var cLeft = cHidden.childNodes[0];
            var cRight = cHidden.childNodes[1];

            buildCard.setAttribute("name", card.id);
            cName.textContent = card.name;
            cLeft.textContent = card.left;
            cRight.textContent = card.right;

            attachSelectCardHandler(buildCard);
            buildCard.setAttribute("id", "");
            cHidden.setAttribute("class", "hidden");
        }
    };

    var attachSelectCardHandler = function(card) {
        card.addEventListener('click', selectCard, false);
    };

    var selectCard = function(e) {
        if (e.target !== e.currentTarget) {
            var hiddens = e.currentTarget.childNodes[1];
            hiddens.classList.toggle("hidden");
        }
        e.stopPropagation();
    };
    
    var attachNewCardHandler = function() {
        var el = document.getElementById("create-card-button");
        el.addEventListener('click', createNewCard, false);
    };

    var createNewCard = function(e) {
        e.preventDefault();
        document.getElementById("close-card-modal").click();
        var cardName = document.getElementById("card-name").value;
        var left = document.getElementById("card-left-input").value;
        var right = document.getElementById("card-right-input").value;
        var deckId = document.getElementById("deck-id-input").value;
        var data = {
            name: cardName,
            left: left,
            right: right,
            deck_id: deckId
        };

        var onload = function(xhr) {
            if (xhr.status === 200) {
                var card = xhr.responseText;
                displayNewCard(JSON.parse(card));
            } else {
                console.log("Status code: " + xhr.statusText);
            }
        };
        makeAjaxRequest('POST', '/cards', data, onload);
    };
    
    var displayNewCard = function(card) {        
        // var newDiv = document.createElement("div");
        // var newButton = document.createElement("button");
        // var cardName = document.createTextNode(card.name)
        
        // newDiv.className += " select-deck";
        // newButton.setAttribute("name", deck.id);
        // newButton.appendChild(deckName);
        // newDiv.appendChild(newButton);
        // document.getElementById("deck-list").appendChild(newDiv);
    };

    var start = function() {
        attachNewDeckHandler();
        attachSelectDeckHandler();
        attachNewCardHandler();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    dashcode.start();
});
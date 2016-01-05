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
        var cardList = document.getElementById("card-list");
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var cardName = card.name;
            var cardLeft = card.left;
            var cardRight = card.right;
            var cardId = card.id;

            var outerDiv = document.createElement("div");
            var cardButton = document.createElement("button");
            var hiddens = document.createElement("div");
            var leftDiv = document.createElement("div");
            var rightDiv = document.createElement("div");

            var leftText = document.createTextNode(cardLeft);
            var rightText = document.createTextNode(cardRight);
            leftDiv.appendChild(leftText);
            rightDiv.appendChild(rightText);            
            hiddens.appendChild(leftDiv);
            hiddens.appendChild(rightDiv);


            newDiv.className += " select-card";
        }
        //     <div class="select-card">
        //       <button name="<%= c.id %>"><%= c.name %></button>
        //       <div class="hidden">
        //         <div class="card-left"><%= c.left %></div>
        //         <div class="card-right"><%= c.right %></div>
        //       </div>
        //     </div>
        //   <% end %>
        // </div>
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
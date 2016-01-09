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
            var sidebar = document.getElementById("sidebar");
            var curDeck = document.getElementById("current-deck");
            sidebar.classList.add("hidden");
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
        var cardList = document.getElementById("squares-container");
        cardList.innerHTML = "";
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            cardList.innerHTML += "<div class='square'>\
                <div class='card-cell'>\
                <div class='table'>\
                <div id='build-card' class='select-card table-cell'>\
                <button class='card-name'></button>\
                <div class='card-left-q hidden'></div>\
                <div class='card-left-a hidden'></div>\
                <div class='card-right-q hidden'></div>\
                <div class='card-right-a hidden'></div>\
                </div></div></div></div>";

            var buildCard = document.getElementById("build-card");
            buildCard.children[0].textContent = card.name;
            buildCard.children[1].textContent = deck.left;
            buildCard.children[2].textContent = card.left;
            buildCard.children[3].textContent = deck.right;
            buildCard.children[4].textContent = card.right;
            
            buildCard.setAttribute("name", card.id);
            buildCard.setAttribute("id", "");
        }
        attachSelectCardHandler(cardList);
    };

    var attachSelectCardHandler = function(card) {
        card.addEventListener('click', selectCard, false);
    };

    var selectCard = function(e) {
        if (e.target !== e.currentTarget) {
            var data = e.target.parentNode.children; //name,LQ,LA,RQ,RA
            console.log(e.target.parentNode.outerHTML);
            var midCard = document.getElementById("tri-card-mid");
            var leftCard = document.getElementById("tri-card-left");
            var rightCard = document.getElementById("tri-card-right");

            midCard.children[0].textContent = data[0].textContent;
            leftCard.children[0].textContent = data[1].textContent;
            leftCard.children[3].textContent = data[2].textContent;
            rightCard.children[0].textContent = data[3].textContent;
            rightCard.children[3].textContent = data[4].textContent;
            location.href = "#tri-card-modal"
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

    var attachSidebarTriggers = function() {
        var button = document.getElementById("sidebar-trigger");
        var sidebar = document.getElementById("sidebar");
        button.addEventListener('click', sidebarToggle, false);
        sidebar.addEventListener('mouseleave', sidebarOff, false);
    };

    var sidebarToggle = function(e) {
        var el = document.getElementById("sidebar");
        el.classList.toggle("hidden");
    }
    
    var sidebarOff = function(e) {
        var el = document.getElementById("sidebar");
        el.classList.add("hidden");
    }

    var start = function() {
        attachNewDeckHandler();
        attachSelectDeckHandler();
        attachNewCardHandler();
        attachSidebarTriggers();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    dashcode.start();
});
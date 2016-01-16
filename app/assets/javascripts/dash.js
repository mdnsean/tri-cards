var dashcode = (function() {

    // create and display decks

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
        newButton.click();
    };
    
    var attachSelectDeckHandler = function() {
        var parent = document.getElementById("deck-list");
        parent.addEventListener('click', selectDeck, false);
    };

    var selectDeck = function(e) {
        if (e.target !== e.currentTarget) {
            var sidebar = document.getElementById("sidebar");
            var curDeck = document.getElementById("current-deck");
            var addCardLink = document.getElementById("add-card-link");
            addCardLink.classList.remove("hidden");
            sidebar.classList.add("hidden");
            curDeck.textContent = e.target.textContent;
            attachEditDeleteDeckHandlers(e.target.getAttribute("name"));
            
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

    // edit and delete decks

    var attachEditDeleteDeckHandlers = function(id) {
        console.log("deck id delete handler added: " + id);
        var del = document.getElementById("delete-deck-button");
        del.classList.remove("hidden");
        if (typeof deleteDeckId !== "undefined") {
            del.removeEventListener("click", deleteDeckId, false);
        }
        deleteDeckId = function() {
            deleteDeck(id);
        };
        del.addEventListener("click", deleteDeckId, false);
    };

    var deleteDeck = function(id) {
        console.log("delete deck actually called on deck: " + id);
        var data = {
            id: id
        };
        var onload = function(xhr) {
            if (xhr.status === 200) {
                var delId = JSON.parse(xhr.responseText);
                console.log("successfully deleted deck id = " + delId);
                window.location.href = "/";
            } else {
                console.log(xhr.statusText);
            }
        };
        makeAjaxRequest('DELETE', '/decks/' + id, data, onload);
    };

    // create and display cards

    var refreshCards = function() {
        var curDeck = document.getElementById("current-deck");
        var deckList = document.getElementById("deck-list").children;
        for (var j = 0; j < deckList.length; j++) {
            if (deckList[j].children[0].textContent == curDeck.textContent) {
                deckList[j].children[0].click();
                break;
            }
        }
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
                // var card = xhr.responseText;
                // displayNewCard(JSON.parse(card));
                refreshCards();
            } else {
                console.log("Status code: " + xhr.statusText);
            }
        };
        makeAjaxRequest('POST', '/cards', data, onload);
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
        var cardList = document.getElementById("squares-container");
        cardList.innerHTML = "";
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            cardList.innerHTML += "<div class='square'>\
<div class='card-cell'>\
<div class='table'>\
<div id='build-card' class='select-card table-cell' name=''>\
<button class='card-name'></button>\
<div class='card-left-q hidden'></div>\
<div class='card-left-a hidden'></div>\
<div class='card-right-q hidden'></div>\
<div class='card-right-a hidden'></div>\
<button class='edit-card-button hidden'>Edit</button>\
<button class='delete-card-button hidden'>Delete</button>\
<button class='slash-button'>Slash</button>\
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
        attachAllCardHandlers(cardList);
    };

    // card behaviors: select, slash, edit, delete

    var attachAllCardHandlers = function(cardList) {
        cardList.addEventListener('click', clickCard, false);
        cardList.addEventListener('mouseover', cardHoverOn, false);
        cardList.addEventListener('mouseout', cardHoverOff, false);

        var triCards = document.getElementById("tri-card-container");
        triCards.addEventListener('click', slashTriCard, false);
    };

    var clickCard = function(e) {
        var data = e.target.parentNode.children; //name,LQ,LA,RQ,RA
        var id = e.target.parentNode.getAttribute("name");

        // select (open tri-card)
        if (e.target.classList.contains("card-name")) {
            var midCard = document.getElementById("tri-card-mid");
            var leftCard = document.getElementById("tri-card-left");
            var rightCard = document.getElementById("tri-card-right");

            // customize, then open tri-card-modal
            midCard.setAttribute("name", id);
            midCard.children[0].textContent = data[0].textContent;
            leftCard.children[0].textContent = data[1].textContent;
            leftCard.children[3].textContent = data[2].textContent;
            rightCard.children[0].textContent = data[3].textContent;
            rightCard.children[3].textContent = data[4].textContent;
            location.href = "#tri-card-modal";

        } else if (e.target.classList.contains("slash-button")) {
            console.log("slash card ID = " + id);
            slashCard(id);
        } else if (e.target.classList.contains("delete-card-button")) {
            deleteCard(id);     
        }
        e.stopPropagation();
    };

    var slashTriCard = function(e) {
        if (e.target.classList.contains("slash-button")) {
            var id = e.target.parentNode.getAttribute("name");
            var cardList = document.getElementsByClassName("select-card");
            for (var i = 0; i < cardList.length; i++) {
                if (cardList[i].getAttribute("name") == id) {
                    cardList[i].children[7].click();
                    document.getElementById("close-tri-modal").click();
                    break;
                }
            }
        }
        e.stopPropagation();
    };

    var slashCard = function(id) {
        var data = {
            id: id
        };
        var onload = function(xhr) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                if (xhr.responseText == "true") {
                    console.log("isSlashed = true");
                }
            } else {
                console.log("Status code: " + xhr.statusText);
            }
        };
        makeAjaxRequest('POST', '/cards/' + id + '/slash', data, onload);
    };
    
    var deleteCard = function(id) {
        var data = {
            id: id
        };
        var onload = function(xhr) {
            if (xhr.status === 200) {
                var delId = JSON.parse(xhr.responseText);
                console.log("successfully deleted card id = " + delId);
                refreshCards();
            } else {
                console.log("Status code: " + xhr.statusText);
            }
        };
        makeAjaxRequest('DELETE', '/cards/' + id, data, onload);
    };

    var cardHoverOn = function(e) {
        if (e.target.classList.contains("card-name")) {
            var edit = e.target.parentNode.children[5];
            var del = e.target.parentNode.children[6];
            // edit.classList.remove("hidden");
            del.classList.remove("hidden"); 
        }
    };

    var cardHoverOff = function(e) {
        if (e.target.classList.contains("card-name")) {
            var edit = e.target.parentNode.children[5];
            var del = e.target.parentNode.children[6];
            edit.classList.add("hidden");
            del.classList.add("hidden"); 
        }
    };

    // sidebar behaviors

    var attachSidebarTriggers = function() {
        var button = document.getElementById("current-deck");
        var sidebar = document.getElementById("sidebar");
        button.addEventListener('click', sidebarToggle, false);
        sidebar.addEventListener('mouseleave', sidebarOff, false);
    };

    var sidebarToggle = function(e) {
        var el = document.getElementById("sidebar");
        el.classList.toggle("hidden");
    };
    
    var sidebarOff = function(e) {
        var el = document.getElementById("sidebar");
        el.classList.add("hidden");
    };

    //  tri-card behaviors

    var attachToggleAnswers = function() {
        var parent = document.getElementById("tri-card-container");
        parent.addEventListener("click", toggleAnswers, false);
    };

    var toggleAnswers = function(e) {
        if (e.target.classList.contains("toggle-answer")) {
            e.target.nextElementSibling.classList.toggle("hidden");
        }
    };

    // splash screen

    var attachSplashScreenHandlers = function() {
        // on hover title, on click title
        var title = document.getElementById("splash-title");
        title.addEventListener('click', slashFront, false);
    };

    var slashFront = function() {
        var bg = document.getElementById("splash-bg");
        var slash = document.getElementById("slash-container");
        bg.style.backgroundColor = "black";
        slash.classList.remove("hidden");
        bg.classList.add("splash-out");
        setTimeout(function() {
            bg.classList.add("hidden");
            bg.classList.remove("splash-out");
            slash.classList.add("hidden");
        }, 1000);
    };

    // execution

    var start = function() {
        attachSplashScreenHandlers();

        attachNewDeckHandler();
        attachSelectDeckHandler();
        attachNewCardHandler();

        attachSidebarTriggers();
        attachToggleAnswers();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    dashcode.start();
});
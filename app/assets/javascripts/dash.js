var dash = (function() {

    var attachNewDeckHandler = function() {
        var el = getElementById('new-deck-button');
        el.addEventListener('click', createNewDeck, false);
    };

    var start = function() {
        attachNewDeckHandler();
    };

    var createNewDeck = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/decks/new', true);
        // display new deck form
        displayNewDeck();
    };

    var displayNewDeck = function() {
        // add html of new deck
    };

    return {
        start: start;
    };
})();
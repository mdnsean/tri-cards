class PagesController < ApplicationController
    def dashboard
        @decks = Deck.all
    end
end

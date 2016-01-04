class PagesController < ApplicationController
    def dashboard
        @decks = Deck.all
        @decks.each do |d|
            instance_variable_set("@deck#{d.id}", d)
        end
    end
end

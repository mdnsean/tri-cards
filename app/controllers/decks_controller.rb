class DecksController < ApplicationController
    def create
        @deck = Deck.new(deck_params)
        if @deck.save
            render json: @deck
        else
            return
        end
    end

    private
        def deck_params
            params.require(:deck).permit(:name)
        end
end

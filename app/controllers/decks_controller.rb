class DecksController < ApplicationController
    def create
        @deck = Deck.new(deck_params)
        if @deck.save
            render json: @deck
        else
            return
        end
    end

    def show
        @deck = Deck.find(params[:id])
        @cards = @deck.cards
        render json: {deck: @deck, cards: @cards}
    end
    
    private
        def deck_params
            params.require(:deck).permit(:name, :left, :right)
        end
end

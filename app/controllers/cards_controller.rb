class CardsController < ApplicationController
    def create
        @card = Card.new(card_params)
        if @card.save
            render json: @card
        else
            return
        end
    end

    private
        def deck_params
            params.require(:card).permit(:name, :left, :right)
        end
end

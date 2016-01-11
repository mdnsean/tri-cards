class CardsController < ApplicationController
    def create
        @card = Card.new(card_params)
        if @card.save
            render json: @card
        else
            return
        end
    end

    def slash
        @card = Card.find(params[:id])
        if @card
            @card.slash
            render json: @card.slashed
        else
            return
        end
    end

    private
        def card_params
            params.require(:card).permit(:name, :left, :right, :deck_id)
        end
end

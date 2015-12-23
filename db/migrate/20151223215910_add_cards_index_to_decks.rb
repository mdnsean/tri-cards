class AddCardsIndexToDecks < ActiveRecord::Migration
  def change
    add_index :cards, :deck_id
  end
end

class AddLeftRightToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :left, :string
    add_column :decks, :right, :string
    remove_column :cards, :left_side, :text
    remove_column :cards, :right_side, :text
    add_column :cards, :left, :text
    add_column :cards, :right, :text
  end
end

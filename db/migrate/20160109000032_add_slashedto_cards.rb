class AddSlashedtoCards < ActiveRecord::Migration
  def change
    add_column :cards, :slashed, :boolean, default: false
  end
end

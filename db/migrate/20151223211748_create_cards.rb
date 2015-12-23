class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.text :left_side
      t.text :right_side
      t.integer :deck_id

      t.timestamps null: false
    end
  end
end

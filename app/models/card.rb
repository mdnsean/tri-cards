class Card < ActiveRecord::Base
    belongs_to :deck
    validates :name, presence: true
    validates :deck_id, presence: true
end

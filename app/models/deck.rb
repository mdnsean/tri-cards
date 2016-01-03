class Deck < ActiveRecord::Base
    has_many :cards
    validates :name, presence: true, uniqueness: true
    validates :left, presence: true
    validates :right, presence: true
end

class Game < ApplicationRecord
  has_many :plays
  has_many :players, through: :plays, foreign_key: :player_id, class_name: :User
end

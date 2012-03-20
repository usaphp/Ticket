class Country < ActiveRecord::Base
  has_many :cities
  validates :name, :uniqueness => true
end
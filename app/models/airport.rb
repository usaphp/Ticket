class Airport < ActiveRecord::Base
  belongs_to :country
  belongs_to :city
  validates :name, :uniqueness => {:scope => :city_id}
end

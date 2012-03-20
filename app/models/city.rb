class City < ActiveRecord::Base
  belongs_to :country
  validates :name, :uniqueness => {:scope => :country_id}
end

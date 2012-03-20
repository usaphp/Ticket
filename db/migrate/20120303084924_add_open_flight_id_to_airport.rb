class AddOpenFlightIdToAirport < ActiveRecord::Migration
  def change
    add_column :airports, :open_flight_id, :integer
  end
end

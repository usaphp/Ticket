class CreateAirports < ActiveRecord::Migration
  def change
    create_table :airports do |t|
      t.string :name
      t.integer :city_id
      t.integer :country_id
      t.string :code_faa_iata
      t.string :code_icao
      t.string :latitude
      t.string :longitude
      t.string :altitude
      t.decimal :utc_offset
      t.string :dst

      t.timestamps
    end
  end
end

class DataController < ApplicationController
  
  def load_airports
    # puts "Open Flight ID: " + airport[0].sub('"', '')
    # puts "Airport Name: " + airport[1].sub('"', '')
    # puts "City Name: " + airport[2].sub('"', '')
    # puts "Country Name: " + airport[3].sub('"', '')
    # puts "IATA/FAA: " + airport[4].sub('"', '')
    # puts "ICAO: " + airport[5].sub('"', '')
    # puts "Lat: " + airport[6].sub('"', '')
    # puts "Lng: " + airport[7].sub('"', '')
    # puts "Alt: " + airport[8].sub('"', '')
    # puts "UTC Offset: " + airport[9].sub('"', '')
    # puts "DST: " + airport[10].sub('"', '')
    
    @airports_arr = IO.readlines("/var/www/ticket/data/airports.dat.txt")
    @airports_arr.each do |airport|
      airport = airport.split(',')
      city_name = ActiveSupport::Inflector.transliterate(airport[2].gsub(/"/, '').strip)
      country_name = ActiveSupport::Inflector.transliterate(airport[3].gsub(/"/, '').strip)
      
      open_flight_id  = airport[0].gsub(/"/, '').strip
      airport_name    = ActiveSupport::Inflector.transliterate(airport[1].gsub(/"/, '').strip)
      iata_faa        = airport[4].gsub(/"/, '').strip
      icao            = airport[5].gsub(/"/, '').strip
      lat             = airport[6].gsub(/"/, '').strip
      lng             = airport[7].gsub(/"/, '').strip
      alt             = airport[8].gsub(/"/, '').strip
      utc_offset      = airport[9].gsub(/"/, '').strip
      dst             = airport[10].gsub(/"/, '').strip
      unless country_name.blank? || city_name.blank?
        country = Country.where(:name => country_name).first
        city = City.where(:name => city_name, :country_id => country.id).first
        Airport.create(:name => airport_name, 
                        :city_id => city.id,
                        :country_id => country.id,
                        :code_faa_iata => iata_faa,
                        :code_icao => icao,
                        :latitude => lat,
                        :longitude => lng,
                        :altitude => alt,
                        :utc_offset => utc_offset,
                        :dst => dst,
                        :open_flight_id => open_flight_id)
      end
    end
  end
  
  def load_cities
    @airports_arr = IO.readlines("/var/www/ticket/data/airports.dat.txt")
    @airports_arr.each do |airport|
      airport = airport.split(',')
      city = ActiveSupport::Inflector.transliterate(airport[2].gsub(/"/, '').strip)
      country_name = ActiveSupport::Inflector.transliterate(airport[3].gsub(/"/, '').strip)
      unless country_name.blank? || city.blank?
        country = Country.where(:name => country_name).first
        City.create(:name => city, :country_id => country.id)
      end
    end
  end

  def load_countries
    I18n.locale = :en
    @airports_arr = IO.readlines("/var/www/ticket/data/airports.dat.txt")
    @airports_arr.each do |airport|
      airport = airport.split(',')
      country_name = ActiveSupport::Inflector.transliterate(airport[3].gsub(/"/, '').strip)
      unless country_name.blank?
        country = Country.create(:name => country_name)
      end
    end
  end
end
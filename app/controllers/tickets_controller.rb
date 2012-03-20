class TicketsController < ApplicationController
  def index
    @months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    @from_date = Date.today.beginning_of_month
    @to_date = Date.today.end_of_month + 1.year
    
    @js_class = "Ticket"
    @js_functions = ["tickets_init()"]
  end
  
  
end

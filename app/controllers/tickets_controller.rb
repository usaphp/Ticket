class TicketsController < ApplicationController
  def index
    @months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    @js_class = "Ticket"
    @js_functions = ["tickets_init()"]
  end

end

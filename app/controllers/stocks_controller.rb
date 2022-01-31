class StocksController < ApplicationController
  skip_before_action :authenticate_user!

  def search
    # check if the get param stock is defined
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock])
      # check if it found the stock in the api
      if @stock
        # define a can be added method for stock, also defined in stock model
        @stock.can_be_added = current_user.can_track_stock?(@stock.ticker)
        render json: @stock, methods: [:can_be_added]
      else
        render status: 404, json: { response: 'No stock exists for this symbol.' }
      end
    else
      render status: 404, json: { response: 'Please enter a symbol to search' }
    end

  end # search
end

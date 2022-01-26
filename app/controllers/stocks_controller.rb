class StocksController < ApplicationController
  skip_before_action :authenticate_user!

  def search
    # check if the get param stock is defined
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock])
      # check if it found the stock in the api
      if @stock
        render json: @stock
      else
        render status: 404, json: { response: 'No stock exists for this symbol.' }
      end
    else
      render status: 404, json: { response: 'Please enter a symbol to search' }
    end

  end # search
end

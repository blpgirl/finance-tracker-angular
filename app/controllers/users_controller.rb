class UsersController < ApplicationController

  def my_portfolio
    # defferent than in alpha_blog with devise gem the current_user is already defined
    @user = current_user
    @tracked_stocks = current_user.stocks
    respond_to do |format|
        format.html { render :my_portfolio }
        format.js   { render partial: 'stocks/list.html' }
    end
  end

  def show
    @user = User.find(params[:id])
    @tracked_stocks = @user.stocks
  end

  def my_friends
    @friends = current_user.friends
  end

  def search
   if params[:search_param].present?
     # calls the search method in the model
     @friends = User.search(params[:search_param])
     # from the friends list remove the current logged in user (i can't friend myself)
     @friends = current_user.except_current_user(@friends)
     # the format.js is to handle the search result with javascript for ajax
     if @friends
       # respond_to do |format|
         # format.js { render partial: 'users/friend_result' }
       # end
       @friends.map! do |user|
            user.profile_path = user_path(user)
            user.friends_already = current_user.friends_with?(user.id)
            user.name = user.full_name
            user
        end
        render json: @friends, methods: [:profile_path, :friends_already, :name]
     else
       respond_to do |format|
         flash.now[:alert] = "No users match this search criteria"
         render status: 404, json: { response: 'No users match this search criteria.' }
         # format.js { render partial: 'users/friend_result' }
       end
     end
   else
     respond_to do |format|
       flash.now[:alert] = "Please enter a friend name or email to search"
       render status: 404, json: { response: 'Please enter a friend name or email to search' }
       # format.js { render partial: 'users/friend_result' }
     end # else
   end # if present
 end # search
end

class FriendshipsController < ApplicationController
  protect_from_forgery with: :exception, unless: -> { request.format.json? }
  
  def create
    friend = User.find(params[:friend])
    current_user.friendships.build(friend_id: friend.id)
    if current_user.save
      flash[:notice] = "Following friend"
      render json: { response: flash[:notice] }, status: :ok
    else
      flash[:alert] = "There was something wrong with the tracking request"
      render json: { response: flash[:alert] }, status: 422
    end
  end

  def destroy
    friendship = current_user.friendships.where(friend_id: params[:id]).first
    friendship.destroy
    flash[:notice] = "Stopped following"
    redirect_to my_friends_path
  end
end

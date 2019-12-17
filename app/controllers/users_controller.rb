class UsersController < ApplicationController
    # before_action :authenticate_user!, only: [:show, :create, :destroy, :update]

    def updatetags
        # commented out current_user for postman..postman unable to autheticate_user so used lines 7-9 in its place
        # current_user.update_attributes(user_params)
        user = User.find_by_id(params[:id])
        user.tags = params[:tags]
        user.save
        render json: user, status: 201
    end

    private
    def user_params
        params.require(:user).permit(:id, :email, :created_at, :updated_at, :provider, :uid, :access_token, :strategy, :followers_url, :following_url, :tags)
    end

end
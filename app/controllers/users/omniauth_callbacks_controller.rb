require 'httparty'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def github
        # You need to implement the method below in your model (e.g. app/models/user.rb)
        @user = User.from_omniauth(request.env["omniauth.auth"])
        
        access_token = request.env['omniauth.auth']['credentials'].token
        @user.update(access_token: access_token, strategy: "github")
        if @user.persisted?
          sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
          set_flash_message(:notice, :success, kind: "GitHub") if is_navigational_format?
        else
          session["devise.github_data"] = request.env["omniauth.auth"].except("extra")
          redirect_to new_user_registration_url
        end
    end

    def failure
        redirect_to root_path
    end

end

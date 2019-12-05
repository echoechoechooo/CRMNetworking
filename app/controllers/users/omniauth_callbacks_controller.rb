require 'httparty'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def linkedin
        # You need to implement the method below in your model (e.g. app/models/user.rb)
        @user = User.from_omniauth(request.env["omniauth.auth"])
        query = {
            code: params[:code],
            client_id: Rails.application.credentials.linkedin[:client_id],
            client_secret: Rails.application.credentials.linkedin[:client_secret],
            redirect_uri: 'http://localhost:3000/users/auth/linkedin/callback',
            grant_type: 'authorization_code'
        }
        headers = {
            'Content-Type' => 'application/x-www-form-urlencoded'
        }
        response = HTTParty.post('https://www.linkedin.com/oauth/v2/accessToken', query: query, headers: headers)
        p response
        if @user.persisted?
          sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
          set_flash_message(:notice, :success, kind: "LinkedIn") if is_navigational_format?
        else
          session["devise.linkedin_data"] = request.env["omniauth.auth"].except("extra")
          redirect_to new_user_registration_url
        end
    end

    def failure
        redirect_to root_path
    end

end

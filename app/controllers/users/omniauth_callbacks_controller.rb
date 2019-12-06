require 'httparty'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def github
        # You need to implement the method below in your model (e.g. app/models/user.rb)
        @user = User.from_omniauth(request.env["omniauth.auth"])
        query = {
            code: params[:code],
            client_id: Rails.application.credentials.github[:client_id],
            client_secret: Rails.application.credentials.github[:client_secret],
            redirect_uri: 'https://b1fb713da65e4c218e822f5e7e7c27fd.vfs.cloud9.us-east-2.amazonaws.com/callback',
            grant_type: 'authorization_code'
        }
        headers = {
            'Content-Type' => 'application/x-www-form-urlencoded'
        }
        access_token = request.env['omniauth.auth']['credentials'].token
        p access_token
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
    
    # get '/callback' do
    #     # get temporary GitHub code...
    #     session_code = request.env['rack.request.query_hash']['code']
        
    #     # ... and POST it back to GitHub
    #     result = RestClient.post('https://github.com/login/oauth/access_token',
    #                           {:client_id => Rails.application.credentials.github[:client_id],
    #                           :client_secret => Rails.application.credentials.github[:client_secret],
    #                           :code => params[:code]},
    #                           :accept => :json)
        
    #     # extract the token and granted scopes
    #     access_token = JSON.parse(result)['access_token']
    # end

end

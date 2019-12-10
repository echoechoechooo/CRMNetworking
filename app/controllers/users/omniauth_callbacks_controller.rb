require 'httparty'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def github
        # Sign-in via Github & update user table
        @user = User.from_omniauth(request.env["omniauth.auth"])
        
        
        access_token = request.env['omniauth.auth']['credentials'].token
        followers = request.env['omniauth.auth']['extra']['raw_info'].followers_url
        following = request.env['omniauth.auth']['extra']['raw_info'].following_url.delete_suffix('{/other_user}')
        
        @user.update(access_token: access_token, strategy: "github", followers_url: followers, following_url: following)
        
        # get for followers_url to input into Contacts
        contacts = Contact.all
        p response_followers = HTTParty.get(@user.followers_url)
        response_followers.each do |attributes| 
            contact = @user.contacts.where(github_id:attributes["id"]).first_or_create
            contact.update(login:attributes["login"],avatar_url:attributes["avatar_url"], url:attributes["url"])
            p contact
        end
        
        # get following_url data from Github
        p response_following = HTTParty.get(@user.following_url)
        response_following.each do |attributes| 
            contact = @user.contacts.where(github_id:attributes["id"]).first_or_create
            contact.update(login:attributes["login"], avatar_url:attributes["avatar_url"], url:attributes["url"])
            p contact
        end
        
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

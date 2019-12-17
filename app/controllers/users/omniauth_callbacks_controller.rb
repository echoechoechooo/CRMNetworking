require 'httparty'

class GithubContacts
    def initialize(user)
       @user = user
    end
   
    def followers
       HTTParty.get(@user.followers_url)
    end
   
    def following
       HTTParty.get(@user.following_url)
    end
end

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def github
        # Sign-in via Github & update user table
        @user = User.from_omniauth(request.env["omniauth.auth"])
        @github_contacts = GithubContacts.new(@user)
        
        
        access_token = request.env['omniauth.auth']['credentials'].token
        followers = request.env['omniauth.auth']['extra']['raw_info'].followers_url
        following = request.env['omniauth.auth']['extra']['raw_info'].following_url.delete_suffix('{/other_user}')
        
        @user.update(access_token: access_token, strategy: "github", followers_url: followers, following_url: following)
        
        update_contacts(@github_contacts.following)
        update_contacts(@github_contacts.followers)
        
        if @user.persisted?
          sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
          set_flash_message(:notice, :success, kind: "GitHub") if is_navigational_format?
        else
          session["devise.github_data"] = request.env["omniauth.auth"].except("extra")
          redirect_to new_user_registration_url
        end
    end
    
    def update_contacts(contacts)
        contacts.each do |github_contact| 
            contact = @user.contacts.where(github_id:github_contact["id"]).first_or_create
            response_contact = HTTParty.get(github_contact["url"])
            contact.update(login:response_contact["login"], avatar_url:response_contact["avatar_url"], url:response_contact["url"])
            
            if contact["location"].blank? # contact["location"].blank? contact["location"].present? contact["location"].presence 
                contact.update(location:response_contact["location"])
            end
            
            if contact["first_name"].blank? && response_contact["name"].present?
                contact.update(first_name:response_contact["name"].split(' ').first)
            end
            
            if contact["last_name"].blank? && response_contact["name"].present? && response_contact["name"].split(' ').length > 1
                contact.update(last_name:response_contact["name"].split(' ').last)
            end
        end
    end

    def failure
        redirect_to root_path
    end

end

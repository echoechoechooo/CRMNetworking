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
        response_follower = HTTParty.get(@user.followers_url)
        response_follower.each do |follower|
            contact = @user.contacts.where(github_id:follower["id"]).first_or_create
            response_follower = HTTParty.get(follower["url"])
            contact.update(login:response_follower["login"], avatar_url:response_follower["avatar_url"], url:response_follower["url"])
            if contact["location"]==nil || contact["location"].length == 0
                contact.update(location:response_follower["location"])
            end
            if (contact["first_name"]==nil || contact["first_name"].length == 0) && response_follower["name"] != nil
                contact.update(first_name:response_follower["name"].split(' ').first)
            end
            if (contact["last_name"]==nil || contact["last_name"].length == 0) && (response_follower["name"] != nil && response_follower["name"].split(' ').length > 1)
                contact.update(last_name:response_follower["name"].split(' ').last)
            end
        end
        
        # get following_url data from Github
        response_following = HTTParty.get(@user.following_url)
        response_following.each do |following| 
            contact = @user.contacts.where(github_id:following["id"]).first_or_create
            # contact.update(login:attributes["login"], avatar_url:attributes["avatar_url"], url:attributes["url"])
            response_following = HTTParty.get(following["url"])
            # p response_following
            
            contact.update(login:response_following["login"], avatar_url:response_following["avatar_url"], url:response_following["url"])
            if contact["location"]==nil || contact["location"].length == 0
                contact.update(location:response_following["location"])
            end
            if (contact["first_name"]==nil || contact["first_name"].length == 0) && response_following["name"] != nil
                contact.update(first_name:response_following["name"].split(' ').first)
            end
            if (contact["last_name"]==nil || contact["last_name"].length == 0) && (response_following["name"] != nil && response_following["name"].split(' ').length > 1)
                contact.update(last_name:response_following["name"].split(' ').last)
            end
            # p response_following["name"]
        end
        # p contacts
        # sorting contacts alphabetically
        # sort_alpha = HTTParty.get(@user.following_url)
        # if (contacts["first_name"])
        # contacts.sort_by! { |contact| contact["first_name"].downcase}
        # end
        # contacts.order()
        
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

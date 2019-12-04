class ContactsController < ApplicationController
    before_action :authenticate_user!, only: [:show, :create, :destroy, :edit, :update]
    
    def index
        @contacts = contact.all
    end
    
    def show
    end
    
    def new
        @contact = contact.new
    end
    
    def edit
        @contact = current_user.contacts.find params [:id]
        render json: contact
    end
    
    def create
        @contact = current_user.contacts.new(contact_params)
        render json: contact, status:201
    end
    
    def update
        @contact = current_user.contacts.find params [:id]
        contact.update_attributes(contact_params)
        render json: contact, status: 201
    end
    
    def destroy
        @contact = current_user.contacts.find params[:id]
        if contact.destroy
            render json: contact
        else
            render json: {error: 'could not delete'}, status: 400
        end
    end  
    
    private
    def contact_params
        params.require(:contact).permit(:first_name, :last_name, :location, :industry, :email_address, :phone_number, :notes)
    end
end

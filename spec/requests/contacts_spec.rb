require 'rails_helper'

RSpec.describe "Contacts", type: :request do
  let!(:user) {User.create!(email: "Joe@yahoo.com", password: "123456")}
  describe "GET /contacts" do
    it "works! (now write some real specs)" do
      sign_in user
      get contacts_path
      expect(response).to have_http_status(200)
    end
  end
  
  context 'POST #create' do
    it "creates a new contact for a logged in user" do
      sign_in user
      params = {
        first_name: "Christi",
        last_name: "Rogers",
        location: "San Diego",
        industry: "software development",
        email: "Christi@yahoo",
        phone_number: "925-867-5309",
        notes: "super awesome lady met at Ruby meetup, likes dogs",
        login: "ChristiGithub"
      }
      expect {post(contacts_path,params: {contact:params} )}.to change(Contact, :count).by(1)
    end
  end
  
  context 'PUT #update' do
    it "updates a contact for a logged in user" do
      sign_in user
      
      contact = Contact.create!(first_name: "Christi", user: user)
      params = {
        first_name: "Pilar",
        last_name: "Rogers",
        location: "San Diego",
        industry: "software development",
        email_address: "Christi@yahoo",
        phone_number: "925-867-5309",
        notes: "super awesome lady met at Ruby meetup, likes dogs",
        login: "ChristiGithub"
      }
      patch contact_path(contact.id), params: { contact: params }
      contact.reload
      params.keys.each do |key|
        expect(contact.attributes[key.to_s]).to eq params[key]
       end
    end
  end
  
  context 'DELETE #destroy' do
    it "deletes a contact for a logged in user" do
      sign_in user
      
      contact = Contact.create!(first_name:"Joe", user: user)
      expect {delete(contact_path(contact.id))}.to change(Contact, :count).by(-1)
    end
  end
end

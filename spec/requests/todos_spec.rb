require 'rails_helper'

RSpec.describe "Todos", type: :request do
  describe "GET /todos" do
    it "works! (now write some real specs)" do
      user = User.create!(email: "Yumi@yahoo.com", password: "123456")
      sign_in user
      get todos_path
      expect(response).to have_http_status(200)
    end
  end
  
  context 'POST #create' do
    it "creates a new todo for a logged in user" do
      user = User.create!(email: "Joe@yahoo.com", password: "123456")
      sign_in user
      params = {
        title: 'Todo1',
        description: "tests todo1"
      }
      expect {post(todos_path,params: {todo:params} )}.to change(Todo, :count).by(1)
    end
  end
end

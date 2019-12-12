require 'rails_helper'

RSpec.describe "Todos", type: :request do
  let!(:user) {User.create!(email: "Joe@yahoo.com", password: "123456")}
  describe "GET /todos" do
    it "works! (now write some real specs)" do
      sign_in user
      get todos_path
      expect(response).to have_http_status(200)
    end
  end
  
  context 'POST #create' do
    it "creates a new todo for a logged in user" do
      sign_in user
      params = {
        title: 'Todo1',
        description: "tests todo1",
        due_date: nil,
        is_done: false
      }
      expect {post(todos_path,params: {todo:params} )}.to change(Todo, :count).by(1)
    end
  end
  
  context 'PUT #update' do
    it "updates a todo for a logged in user" do
      sign_in user
      
      todo = Todo.create!(title:"lets change", user: user)
      params = {
        title: 'updated Todo1',
        description: "tests todo1",
        due_date: nil,
        is_done: false
      }
      patch todo_path(todo.id), params: { todo: params }
      todo.reload
      params.keys.each do |key|
        expect(todo.attributes[key.to_s]).to eq params[key]
       end
    end
  end
  
  context 'DELETE #destroy' do
    it "deletes a todo for a logged in user" do
      sign_in user
      
      todo = Todo.create!(title:"lets change", user: user)
      expect {delete(todo_path(todo.id))}.to change(Todo, :count).by(-1)
    end
  end
  
end

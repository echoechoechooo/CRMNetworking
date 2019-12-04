class TodosController < ApplicationController
    before_action :authenticate_user!, only: [:show, :create, :destroy, :edit, :update]
    
    def index
        @todos = Todo.all
    end
    
    def show
    end
    
    def new
        @todo = Todo.new
    end
    
    def edit
        @todo = current_user.todos.find params [:id]
        render json: todo
    end
    
    def create
        @todo = current_user.todos.new(todo_params)
        render json: todo, status:201
    end
    
    def update
        @todo = current_user.todos.find params [:id]
        todo.update_attributes(todo_params)
        render json: todo, status: 201
    end
    
    def destroy
        @todo = current_user.todos.find params[:id]
        if todo.destroy
            render json: todo
        else
            render json: {error: 'could not delete'}, status: 400
        end
    end  
    
    private
    def todo_params
        params.require(:todo).permit(:due_date, :is_done, :title, :description)
    end
end

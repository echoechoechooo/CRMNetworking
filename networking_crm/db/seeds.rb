# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



user = User.where(email:"joe@yahoo.com").first_or_create do |user|
    user.update ({password:"Password"})
end

todo_data = [
    {
        due_date: nil,
        is_done: false,
        title: "Test",
        description:"Testing the Seed Data"
    },
    {
        due_date: nil,
        is_done: false,
        title: "Test2",
        description:"2Testing the Seed Data"
    },
    ]
    
todo_data.each do |attributes|
    user.todos.where(title:attributes[:title]).first_or_create do |todo|
        todo.update(attributes)
    end
end
    
    
    
    
    
    
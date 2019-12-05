# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

userAll = User.all

user_data = [
    {
        email:"joe@yahoo.com",
        password:"Password"
    },
    {
        email:"christi@yahoo.com",
        password:"Password2"
    },
    {
        email:"mryzyzyzm@yahoo.com",
        password:"mryzyzmm"
    }
]

user_data.each do |attributes|
    userAll.where(email:attributes[:email]).first_or_create do |user|
        user.update (attributes)
    end
end

todo_data1 = [
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

user1 = userAll[0]

todo_data1.each do |attributes|
    user1.todos.where(title:attributes[:title]).first_or_create do |todo|
        todo.update(attributes)
    end
end



todo_data2 = [
    {
        due_date: nil,
        is_done: false,
        title: "Test2",
        description:"Testing seeds aguunnn"
    },
    {
        due_date: nil,
        is_done: false,
        title: "Testing yall",
        description:"2ing the Seed Data"
    },
]

user2 = userAll[1]

todo_data2.each do |attributes|
    user2.todos.where(title:attributes[:title]).first_or_create do |todo|
        todo.update(attributes)
    end
end



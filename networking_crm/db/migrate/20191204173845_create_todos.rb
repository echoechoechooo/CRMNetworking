class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.datetime :due_date
      t.boolean :is_done
      t.string :title
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end

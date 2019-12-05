class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :location
      t.string :industry
      t.string :email_address
      t.string :phone_number
      t.text :notes
      t.integer :user_id

      t.timestamps
    end
  end
end

class AddFollowerUrlToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :followers_url, :string
  end
end

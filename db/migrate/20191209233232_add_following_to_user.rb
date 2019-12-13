class AddFollowingToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :following_url, :string
  end
end

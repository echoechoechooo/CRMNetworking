class ChangeUrlDataTypeUser < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :followers_url, :text
    change_column :users, :following_url, :text
  end
end

class AddOAuthTokenSourceToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :strategy, :string
  end
end

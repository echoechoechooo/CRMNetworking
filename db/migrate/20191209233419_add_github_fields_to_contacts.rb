class AddGithubFieldsToContacts < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :login, :string
    add_column :contacts, :avatar_url, :string
    add_column :contacts, :url, :string
  end
end

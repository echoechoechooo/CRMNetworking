class AddGithubIDtoContacts < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :github_id, :integer
  end
end

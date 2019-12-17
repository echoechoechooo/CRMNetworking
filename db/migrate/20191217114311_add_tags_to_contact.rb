class AddTagsToContact < ActiveRecord::Migration[6.0]
  def change
    add_column :contacts, :tags, :string, array: true, default: []
  end
end

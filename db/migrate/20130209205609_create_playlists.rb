class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :name
      t.string :link_id
      t.integer :user_id

      t.timestamps
    end
  end
end

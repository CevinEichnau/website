class CreatePlaylistLinks < ActiveRecord::Migration
  def change
    create_table :playlist_links do |t|
      t.references :link
      t.references :playlist

      t.timestamps
    end
    add_index :playlist_links, :link_id
    add_index :playlist_links, :playlist_id
  end
end

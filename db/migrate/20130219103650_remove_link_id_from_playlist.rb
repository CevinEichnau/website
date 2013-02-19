class RemoveLinkIdFromPlaylist < ActiveRecord::Migration
  def up
    remove_column :playlists, :link_id
  end

  def down
    add_column :playlists, :link_id, :string
  end
end

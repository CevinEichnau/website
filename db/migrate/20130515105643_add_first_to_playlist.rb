class AddFirstToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :first, :string
  
  end
end

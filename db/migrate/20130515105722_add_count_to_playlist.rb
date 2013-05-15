class AddCountToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :count, :string
    
  end
end

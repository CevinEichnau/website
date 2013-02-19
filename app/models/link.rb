class Link < ActiveRecord::Base
  attr_accessor	:playlist_id 
  has_many :playlist_links
  has_many :playlists, :through => :playlist_links
  attr_accessible :title, :video_id, :playlist_id

  def playlist_id

  end

end

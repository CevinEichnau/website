class Link < ActiveRecord::Base
  has_many :playlist_links
  has_many :playlists, :through => :playlist_links
  attr_accessible :title, :video_id
end

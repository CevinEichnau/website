class Link < ActiveRecord::Base
  acts_as_api
  include WebsiteAPI::V1::Templates::Link
  attr_accessor	:playlist_id 
  has_many :playlist_links
  has_many :playlists, :through => :playlist_links
  attr_accessible :title, :video_id, :playlist_id

  def playlist_id

  end

end

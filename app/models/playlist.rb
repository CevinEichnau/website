class Playlist < ActiveRecord::Base
  has_many :playlist_links
  has_many :links, :through => :playlist_links
  belongs_to :user
  attr_accessible :name, :user_id
end

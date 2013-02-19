class PlaylistLink < ActiveRecord::Base
  belongs_to :link
  belongs_to :playlist
  # attr_accessible :title, :body
end

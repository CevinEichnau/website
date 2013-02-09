class Playlist < ActiveRecord::Base
  attr_accessible :link_id, :name, :user_id
end

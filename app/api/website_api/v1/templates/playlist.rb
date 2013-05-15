module WebsiteAPI::V1::Templates::Playlist
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_playlist_simple do |t|
      t.add :id
      t.add :name
      t.add :user_id
      t.add :links, :template => :v1_link_simple
    end
    
    api_accessible :v1_playlist, :extend => :v1_playlist_simple do |t|
      
     
    end

    api_accessible :v1_playlist_simple_only do |t|
      t.add :id
      t.add :name
      t.add :user_id
    end
    
    api_accessible :v1_playlist_only, :extend => :v1_playlist_simple_only do |t|
      
     
    end

  end
end
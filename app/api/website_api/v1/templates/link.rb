module WebsiteAPI::V1::Templates::Link
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_link_simple do |t|
      t.add :id
      t.add :title
      t.add :video_id
    end
    
    api_accessible :v1_link, :extend => :v1_link_simple do |t|
      
     
    end

  end
end
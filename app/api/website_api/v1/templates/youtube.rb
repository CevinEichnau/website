module WebsiteAPI::V1::Templates::Yt
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_yt_simple do |t|
      t.add :title
    end
    
    api_accessible :v1_yt, :extend => :v1_yt_simple do |t|
      
     
    end

  end
end
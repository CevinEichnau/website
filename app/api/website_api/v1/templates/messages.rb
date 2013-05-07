module WebsiteAPI::V1::Templates::Notification
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_msg_simple do |t|
      t.add :id
      t.add :body
    end
    
    api_accessible :v1_msg, :extend => :v1_msg_simple do |t|
      
     
    end

  end
end
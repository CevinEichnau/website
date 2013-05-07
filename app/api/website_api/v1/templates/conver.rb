module WebsiteAPI::V1::Templates::Conversation
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_conver_simple do |t|
      t.add :id
      t.add :subject
      t.add :user_id
      t.add :friend_id
    end
    
    api_accessible :v1_conver, :extend => :v1_conver_simple do |t|
      
     
    end


    api_accessible :v1_msg_simple do |t|
      t.add :id
      t.add :body
    end
    
    api_accessible :v1_msg, :extend => :v1_msg_simple do |t|
      
     
    end

  end
end
module WebsiteAPI::V1::Templates::Notification
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_msgssimple do |t|
      t.add :id
      t.add :body
    end
    
    api_accessible :v1_msgs, :extend => :v1_msg_simple do |t|
      t.add :global
      t.add :username
     
    end

  end
end
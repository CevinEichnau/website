module WebsiteAPI::V1::Templates::User
  extend ActiveSupport::Concern
  included do

    api_accessible :v1_user_simple do |t|
      t.add :id
      t.add :username
      t.add :facebook_img
      t.add :email
      t.add :authentication_token
    end
    
    api_accessible :v1_user, :extend => :v1_user_simple do |t|
      
     
    end

  end
end

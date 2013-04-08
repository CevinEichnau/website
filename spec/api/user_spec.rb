require 'spec_helper'

describe WebsiteAPI::V1::Users do
    
    include Helpers
 
    before(:each) do
      @user1 = create :user
      @user2 = create :user
    end

    def sign_in user
      post "/api/v1/users/login", {:email => user.email, :password => user.password} 
    end
    
    def user_response_to_string user
      user.as_api_response(:v1_user).except(:updated_at).to_s.chomp("}")
    end
 
    describe "GET login" do
      it "returns user if successful" do
        sign_in @user1   
        response.body.should include user_response_to_string @user1
      end
      
      it "returns error if not successful" do
        post "/api/v1/users/login", {:email => @user1.email, :password => "wrong_pass"}
        response.status.should eq 400
        response.body.should_not include @user1.as_api_response(:v1_user).to_s
      end
    end
    
    describe "GET profile" do
      it "returns profile if successful" do
        sign_in @user1 
        get "/api/v1/users/"+@user1.id.to_s
        response.body.should include user_response_to_string @user1
      end
      
      it "returns error if not authorized" do
        sign_in @user1  
        get "/api/v1/users/"+@user2.id.to_s
        response.status.should eq 401
        response.body.should_not include @user1.as_api_response(:v1_user).to_s
      end
    end
    
    describe "GET logout" do
      it "returns OK if logged in" do
        sign_in @user1
        post "/api/v1/users/logout"  
        response.body.should include "ok"
      end
      
      it "returns error/unauthorized if not logged in" do
        post "/api/v1/users/logout"
        response.status.should eq 401
        response.body.should include "error"
      end
    end
    
end
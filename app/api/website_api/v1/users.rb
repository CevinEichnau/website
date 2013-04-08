module WebsiteAPI::V1 
  class Users < Grape::API
    
    version 'v1', :using => :path, :format => :json, :cascade => false
    
    helpers do
      include WebsiteAPI::Helper
       
      def logger
        Users.logger
      end
    end
    
    Warden::Strategies.add(:api_auth) do 
      def valid?
        params[:email] && params[:password]        
      end
  
      def authenticate!
        user = User.find_by_email(params[:email])       
        if !user.nil? && user.valid_password?(params[:password])
          success!(user)     
        end
      end      
    end
    
    resource :users do
    
      desc "GET profile X"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      get ":id" do
        authenticate!
        
        result = User.find_by_id(params[:id]) 
        authorize! :show, result
        respond_with_success(result, :v1_user)
      end
      
      desc "Login"
      params do
        requires :email, :type => String, :desc => "Email"
        requires :password, :type => String, :desc => "Password"
      end  
      post :login do
        auth = warden.authenticate(:api_auth)
        if auth.nil?
          respond_with_error("Invalid password or login.")          
        else
          auth.ensure_authentication_token!
          respond_with_success(auth, :v1_user, {:meta => { :auth_token => auth.authentication_token }})
        end 
      end
      
      desc "Logout"        
      post :logout do
        authenticate!
        current_user.reset_authentication_token!
        logout!
        respond_with_success("You have been logged out!")
      end

    end
 
  end
end
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
       # user = User.find_for_facebook_oauth(env["omniauth.auth"], current_user)        
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
      get do
        authenticate!
        
        result = User.find_by_id(params[:id]) 
        authorize! :show, result
        respond_with_success(result, :v1_user)
      end

      desc "GET Friend"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      get "friends" do
        @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])

        result = @user.friends
        
        respond_with_success(result)
      end

      desc "Change Deatails"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      post "details" do
        @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])
        @details = Detail.find_by_user_id(@user.id)
        
        if @details

        else
          @details = Detail.new
          @details.user_id = @user.id
          @details.save
        end  
        
        
        respond_with_success(@details)
      end

     

      desc "GET Friends request"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      get "friends_request" do
        @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])
        result = @user.pending_invited_by
        
        respond_with_success(result)
      end

      desc "Accept Friends request"
      params do
        requires :fid, :type => Integer, :desc => "friend id."
        requires :id, :type => Integer, :desc => "user id."
      end  
      post "friends_accept" do
        @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])
        @new_friend =  User.find(:first, :conditions => ["id = ? OR uid = ?", params[:fid].to_i, params[:fid].to_i])
        @friend = @user.approve @new_friend
        result = @friend
        respond_with_success(result)
      end

      desc "Send Friend request"
      params do
        requires :fid, :type => Integer, :desc => "friend id."
        requires :uid, :type => Integer, :desc => "user id."
      end
      post "send_friend_request" do
        @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])
        @new_friend = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:fid].to_i, params[:fid].to_i])
        @friend = @user.invite @new_friend
        respond_with_success(@friend)
      end 

      desc "Search friends"
      params do
        requires :name, :type => String, :desc => "name."
      end
      post "search_friend" do

        @users = User.find_by_sql "SELECT users.id, users.username, users.facebook_img FROM `users` WHERE (LOWER(users.username) LIKE '"+params[:name]+"%' OR LOWER(users.email) LIKE '"+params[:name]+"%'  ) ORDER BY users.username ASC LIMIT 100"
        respond_with_success(@users)
      end  

      desc "User loged in?" 
      get "user" do
        
        result = {:logged_in => !current_user.nil?}
       # result = {logged_in:true} if current_user
        
        return result.to_json
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


      desc "Login with Facebook"
      params do
        
        requires :ac_token, :type => String, :desc => "Auth-Token"
      end  
      post :login_facebook do
        json_object = JSON.parse(open("https://graph.facebook.com/me?access_token="+params[:ac_token]).read)
       

          @user = User.find_for_facebook_api(json_object)
          
        #helpers.facebook_android(@user)
        #foo(params[:ac_token])
        #respond_with_error("user nicht gespeichert") if User.find(@user.id) != nil
        if @user.playlists != nil
          result = @user.playlists.each do |p|
            id = p.links.each.first.video_id if p.links.each.first != nil
            p.first = id
            p.count = p.links.length
          end  
        end  
        respond_with_success(result, :v1_playlist_only)
        #@user.save
        #sign_in(:user, @user)
      end

      desc "Register"
      params do
        requires :email, :type => String, :desc => "email"
        requires :name, :type => String, :desc => "name"
        requires :pw, :type => String, :desc => "pw"
      end          
      post do
        respond_with_error("Email already registed") if User.find_by_email(params[:email])
        user = User.new
        user.username = params[:name]       
        user.email = params[:email]
        user.password = params[:pw]
        user.save
        result = user.playlists.each do |p|
          id = p.links.each.first.video_id if p.links.each.first != nil
          p.first = id
          p.count = p.links.length
        end  
        respond_with_success(result, :v1_playlist_only)
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
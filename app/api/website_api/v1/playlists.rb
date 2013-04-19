module WebsiteAPI::V1 
  class Playlists < Grape::API
    
    version 'v1', :using => :path, :format => :json, :cascade => false

    helpers do
      include WebsiteAPI::Helper
    end

    resource :playlists do
    
      desc "GET playlist"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      get ":id" do
        authenticate!
        
        result = Playlist.find_by_id(params[:id]) 
        authorize! :show, result
        respond_with_success(result, :v1_playlist)
      end

      desc "GET all Playlist"
      get do
        authenticate!
        
        result = current_user.playlists
       # authorize! :show, result
        respond_with_success(result, :v1_playlist)
      end 

      desc "Create New Playlist"
      params do
        requires :name, :type => String, :desc => "name."
        requires :id, :type => String, :desc => "id."
      end
      post do
        current_user = User.find(params[:id].to_i)
        if !current_user
          current_user = User.find_by_uid(params[:id].to_i)
        end  

        @playlist = Playlist.new
        @playlist.name = params[:name]
        @playlist.user_id = current_user.id
        @playlist.user = current_user
        @playlist.save
        
        result = @playlist
       # authorize! :show, result
        respond_with_success(result, :v1_playlist)
      end  
    end
   
 
  end
end
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
    end
   
 
  end
end
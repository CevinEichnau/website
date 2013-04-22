module WebsiteAPI::V1 
  class Links < Grape::API
    
    version 'v1', :using => :path, :format => :json, :cascade => false

    helpers do
      include WebsiteAPI::Helper
    end

    resource :links do
    
      desc "GET links"
      params do
        requires :id, :type => Integer, :desc => "id."
      end  
      get ":id" do
        authenticate!
        
        result = Link.find_by_id(params[:id]) 
        authorize! :show, result
        respond_with_success(result, :v1_link)
      end

      desc "Search Links"
      params do
        requires :name, :type => String, :desc => "name."
      end
      get do
        #TODO SEACR LINKS
        client = YouTubeIt::Client.new
        @links = client.videos_by(:query => params[:name])
        respond_with_success(@links.videos)
      end


      desc "Create Link"
      params do
        requires :playlist_id, :type => Integer, :desc => "playlist_id."
        requires :video_id, :type => String, :desc => "video_id."
        requires :title, :type => String, :desc => "title."
      end
      post do 
        @playlist = Playlist.find_by_id(params[:playlist_id])
        @link = Link.new
        @link.title = params[:title]
        @link.video_id = params[:video_id]
        if @link.save
          @playlist.links << @link
          respond_with_success(@playlist, :v1_playlist)
        end 
      end  
    end
  end
end
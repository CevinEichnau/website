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
    end
   
 
  end
end
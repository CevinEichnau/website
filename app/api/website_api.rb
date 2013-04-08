module WebsiteAPI

  class Root < Grape::API

    mount WebsiteAPI::V1::Users

    if !Rails.env.production?  
    
      add_swagger_documentation :api_version => "v1",
                                :base_path => "http://#{Rails.configuration.default_host}/api",
                                :hide_documentation_path => true
    end                          
                            
    rescue_from :all do |exception|
      send_exception_email(exception)
      respond_with_exception(exception)
    end
  end
  
end

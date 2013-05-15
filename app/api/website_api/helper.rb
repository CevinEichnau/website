module WebsiteAPI::Helper  

  def send_exception_email(exception)
    ExceptionNotifier::Notifier.exception_notification(request.env, exception, :data => {
      :user => (current_user and current_user.email or "guest")
    }).deliver
  end

  def foo(user)
     #Users::OmniauthCallbacksController.facebook_android(user)
    
    #redirect_to "/users/auth/facebook"
  end  
  
  # Helper that gives you the template name according to template name and api version
  def api_template(version = :v1, template = :id_only)
    "#{version.to_s}_#{template.to_s}".to_sym
  end
  
  def errors
    env['warden'].errors
  end
  
  def warden
    env['warden']
  end
   
  def current_user
    warden.user
  end
  
  def current_ability
    Ability.new(current_user)
  end
  
  def authorize!(*args)
    error!(respond_with_not_authorized, 401) unless current_ability.can?(*args)
  end
    
  def authenticate!
    error!(respond_with_not_authorized, 401) unless current_user
  end

  def logout!
    warden.logout
  end
  
  def respond_with_success(result, template = nil, options={})
    meta = { :status => :ok }
      .merge(options.fetch(:meta, {}))
      .merge({:result => template.nil? ? result : result.as_api_response(template) })
  end
  
  def respond_with_error(errors)
    errors = errors.full_messages if errors.respond_to?(:full_messages)

    error_response = {
      :status => :error,
      :error => {
        :type => :form_error,
        :short => "Invalid data submitted",
        :longs => Array(errors).map(&:to_s),
        :debug => []
      }
    }
    error!(error_response, 400)
  end
     
  def respond_with_not_authorized
    {
      :status => :error,
      :error => {
        :type => :not_authorized,
        :short => "Access denied",
        :long => ["You are not authorized for this action"],
        :debug => []
      }
    }
  end

  def respond_with_not_found
    error_response = {
      :status => :error,
      :error => {
        :type => :not_found,
        :short => "Resource not found",
        :long => [""],
        :debug => []
      }
    }
    error!(error_response, 404)
  end
  
  def respond_with_exception(exception) 
    error_response = {
      :status => :error,
      :error => {
        :type => :exception,
        :short => "Sorry, but something went wrong",
        :long => ["We're sorry, but something went wrong. We have been notified about this issue."],
        :debug => [exception.message] + exception.backtrace
      }
    }
    error!(error_response, 500)
  end
  

  
end
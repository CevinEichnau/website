# encoding: utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_locale

  #before_filter :authenticate_user!

   def after_sign_in_path_for(resource)
    "/play_on" 
  end

  def after_sign_up_path_for(resource)
    "/play_on" 
  end

  def after_sign_out_path_for(resource)
    "/play_on" 
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end


  def default_url_options(options={})
  	logger.debug "default_url_options is passed options: #{options.inspect}\n"
  	{ :locale => I18n.locale }
  end

  def index
  	flash[:notice] = t(:bt_home)
  	flash[:notice] = t(:bt_cont)
  	flash[:notice] = t(:bt_blog)
  	flash[:notice] = t(:bt_wall)
    flash[:notice] = t(:bt_piano)
  end

  protected
    def authenticate
      authenticate_or_request_with_http_basic do |username, password|
        username == "cevin" && password == "freakyceviin"
      end
    end
end

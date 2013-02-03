class HomeController < ApplicationController
  def index
  	flash[:notice] = t(:abou_me_0)
  	flash[:notice] = t(:abou_me_1)
  	flash[:notice] = t(:abou_me_2)
  	flash[:notice] = t(:abou_me_3)
  	flash[:notice] = t(:abou_me_4)
  	flash[:notice] = t(:abou_me_5)
  	flash[:notice] = t(:abou_me_6)
  	flash[:notice] = t(:abou_me_7)
  	flash[:notice] = t(:abou_me_8)
  	flash[:notice] = t(:abou_me_9)

  	flash[:notice] = t(:more_about_0)
  	flash[:notice] = t(:more_about_1)
  	flash[:notice] = t(:more_about_2)
  	flash[:notice] = t(:more_about_3)
  	flash[:notice] = t(:more_about_4)
  	flash[:notice] = t(:more_about_5)
  end
end

class ContactController < ApplicationController
  def index
  	flash[:notice] = t(:contact_0)
  	flash[:notice] = t(:contact_1)
  	flash[:notice] = t(:contact_2)
  	flash[:notice] = t(:contact_3)
  end
end

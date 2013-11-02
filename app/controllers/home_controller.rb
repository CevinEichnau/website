class HomeController < ApplicationController
  def index
  	return "x"
  end

  def show
  	if params[:id] == "3"
  		render "page3" 
  	elsif params[:id] == "2"
  		render "show"
    elsif params[:id] == "staging"
      render "pagenew"
  	else
  		render "index" 
  	end

  end

  def page3

  end
end

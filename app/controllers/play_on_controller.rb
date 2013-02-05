class PlayOnController < ApplicationController
	def index
		flash[:notice] = t(:create_play_on)
	end	
end

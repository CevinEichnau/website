class PlayOnController < ApplicationController
	#before_filter :authenticate_user!

	def index
		flash[:notice] = t(:create_play_on)
	end

end
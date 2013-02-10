class PlayOnController < ApplicationController
	#before_filter :authenticate_user!

	def index
		flash[:notice] = t(:create_play_on)
	end

	def new
		@playlist = Playlist.find_by_user_id(3)
		
		@user = Playlist.new
		create
	end	

	def create
		@user.name = params[:name]
		@user.link_id = params[:link_id]
		@user.user_id = params[:current_user_id]
		@user.save

		#redirect_to show
	end	

	def show

	end	

end
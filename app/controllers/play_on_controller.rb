class PlayOnController < ApplicationController
	#before_filter :authenticate_user!

	#def index
	#	@playlist = Playlist.new
	#	flash[:notice] = t(:create_play_on)
	#	render :template => 'play_on/show'
	#end

	def show
		@link = Link.new
		@playlist = Playlist.new
		render :layout => "playon"
	end


end
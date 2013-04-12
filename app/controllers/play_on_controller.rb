class PlayOnController < ApplicationController
	#before_filter :authenticate_user!
	#autocomplete :username
	#def index
	#	@playlist = Playlist.new
	#	flash[:notice] = t(:create_play_on)
	#	render :template => 'play_on/show'
	#end

	def show
		if user_signed_in?
			@friends = current_user.friends
			@invited = current_user.pending_invited_by
		end
		@link = Link.new
		@playlist = Playlist.new
		@users = User.new
		#@user = User.find_by_username(params[:term])

		if user_signed_in?
			@playlists = Playlist.find_all_by_user_id(current_user.id)
		end	
		render :layout => "playon"
	end

	def autocomplete_username
		@user = User.find_all_by_username(params[:term])
		
	end	

	


end
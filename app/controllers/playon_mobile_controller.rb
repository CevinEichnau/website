class PlayonMobileController < ApplicationController	
	def show
		@link = Link.new
		@playlist = Playlist.new
		if user_signed_in?
			@playlists = Playlist.find_all_by_user_id(current_user.id)
		end	
		render :layout => "mobile"
	end

end	
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
			@foo = '/playon'+current_user.id.to_s
			@friends = current_user.friends
			@invited = current_user.pending_invited_by
			@receipts = Receipt.find_all_by_receiver_id(current_user.id)
			@messages = []
			@conversations = Conversation.find(:all, :conditions => ["user_id = ? OR friend_id = ?", current_user.id, current_user.id])
			@receipts.each do |r|
				n = Notification.find(r.notification_id)
				@messages << n if r.mailbox_type == "inbox" and r.is_read == 0
			end	
			@new_messages = "Nachrichten" if @messages.size == 0
			@new_messages = "Nachrichten("+@messages.size.to_s+")" if @messages.size < 0
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
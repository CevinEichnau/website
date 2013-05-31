class UsersController < ApplicationController
	autocomplete :user, :username
	def show
		#@user = User.find(params[:id])
		#User.find_all_by_username(params[:term])
		@user = User.find(params[:id]) if params[:id] != "sign_in"
		
		d = Detail.find_by_user_id(@user.id) if params[:id] != "sign_in"

		if d != nil
			@details = d
		else
			@details = Detail.new
			@details.user_id = @user.id
			@details.save
		end	
	end	


	def autocomplete_username
		User.find_all_by_username(params[:term])
	end	

	def accept
		@current_user = current_user
		@new_friend = User.find(params[:id])
		@friend = @current_user.approve @new_friend

		respond_to do |format|
	      if @friend
	        format.html { redirect_to "/play_on", notice: 'Du hast einen neuen Freund' }
	        format.json { head :no_content }
	      else
	        format.html { redirect_to "/play_on", notice: 'sry' }
	        format.json { head :no_content }
	      end

    	end
	end	


	def share
  		@graph = Koala::Facebook::GraphAPI.new
  		@graph.put_wall_post("hey, i'm learning koala")
  	end	

	def save_message
		@friend = User.find(params[:user_id])
		@name = current_user.username
		@conver = Conversation.find(params[:cid])
		if @conver 
			current_user.reply_to_conversation(@conver, params[:message])
		else
			@receipt = current_user.send_message(@friend, params[:message], @name)
			@notify = Notification.find(@receipt.notification_id)
			@message = Conversation.find(@notify.conversation_id)
			@message.user_id = current_user.id
			@message.friend_id = @friend.id
			@message.save
		end	
		respond_to do |format|
	      if @friend
	        format.html { redirect_to "/play_on", notice: 'Succefull send' }
	        format.json { head :no_content }
	      else
	        format.html { redirect_to "/play_on", notice: 'Failure send' }
	        format.json { head :no_content }
	      end
	    end 
	end	

	def send_message
		@friend = User.find(params[:id])
		@name = current_user.username

		#con = Conversation.find_by_subject(@friend.username)
		@conver = Conversation.find_by_user_id_and_friend_id(@friend.id, current_user.id)
		@conversation = Conversation.find_by_user_id_and_friend_id(current_user.id, @friend.id)
		if @conver 
			current_user.reply_to_conversation(@conver, params[:friend][:message])
		else	
			if @conversation
				current_user.reply_to_conversation(@conversation, params[:friend][:message])
			else
				@receipt = current_user.send_message(@friend, params[:friend][:message], @name)
				@notify = Notification.find(@receipt.notification_id)
				@message = Conversation.find(@notify.conversation_id)
				@message.user_id = current_user.id
				@message.friend_id = @friend.id
				@message.save
			end	
		end

		respond_to do |format|
	      if @friend
	        format.html { redirect_to "/play_on", notice: 'Succefull send' }
	        format.json { head :no_content }
	      else
	        format.html { redirect_to "/play_on", notice: 'Failure send' }
	        format.json { head :no_content }
	      end
	    end  
	end	

	def add_friend
		@current_user = current_user
		@new_friend = User.find(params[:id])
		@friend = @current_user.invite @new_friend

		respond_to do |format|
	      if @friend
	        format.html { redirect_to "/play_on", notice: 'Friend is addet' }
	        format.json { head :no_content }
	      else
	        format.html { redirect_to "/play_on", notice: 'Friend is not addet' }
	        format.json { head :no_content }
	      end

    	end


	end	
end
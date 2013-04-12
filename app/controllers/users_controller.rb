class UsersController < ApplicationController
	autocomplete :user, :username
	def show
		#@user = User.find(params[:id])
		User.find_all_by_username(params[:term])
		@user = User.find(params[:id])
		
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

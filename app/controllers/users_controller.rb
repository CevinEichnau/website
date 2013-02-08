class UsersController < ApplicationController
   # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  attr_accessor :password
  # attr_accessible :title, :body
  #before_filter :authenticate_user!

  def index
    @user = User.find(params[:id])
  end  

  def show
    @user = User.find(params[:id])
  end

end

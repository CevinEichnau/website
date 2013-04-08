module Helpers
  
  def create role
    user = FactoryGirl.create :user
    user
  end
  
  def create_booking_between user, trainer, coach_module
    booking = user.build_booking({:coach_module_id => coach_module.id, :trainer_id => trainer.id})
    booking.save!
    booking
  end
  
  def prepare_users
    @user1 = create :user
    @user2 = create :user
    @admin = create :admin
  end

  
  def prepare_all
   
    prepare_users
    
  end
  

  
end
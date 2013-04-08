# Read about factories at https://github.com/thoughtbot/factory_girl
# Defines a new sequence
FactoryGirl.define do
  sequence :username do |n|
    "person#{n}"
  end
 
  sequence :email do |n|
    "person#{n}@example.com"
  end
end


FactoryGirl.define do
  factory :user do
    username 
    email 
    password 'please'
    password_confirmation 'please'
    # required if the Devise Confirmable module is used
  end
end
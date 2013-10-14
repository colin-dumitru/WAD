class User < ActiveRecord::Base
  has_many :boards
  has_many :posts
end

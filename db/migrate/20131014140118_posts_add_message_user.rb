class PostsAddMessageUser < ActiveRecord::Migration
  def change
    add_column :posts, :message, :string
    add_column :posts, :user_id, :integer
  end
end

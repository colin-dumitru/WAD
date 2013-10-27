require 'json'

class PostsController < ActionController::Base
  include ActionController::Live

  def stream
    ActiveRecord::Base.uncached do

      posted = []
      response.headers['Content-Type'] = 'text/event-stream'

      600.times {
        posts = getBoard(params[:name]).posts

        difference = posts - posted
        response.stream.write difference.to_json
        posted = posts.dup

        sleep 1
      }

      response.stream.close
    end
  end

  def getBoard(name)
    board = Board.find_by name: name

    if board == nil
      board = User.find(session[:user]).boards.create(name: params[:name])
      board.save
    end

    board
  end
end

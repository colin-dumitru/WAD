class BoardsController < ActionController::Base
  before_action :check_login, :only => [:create, :postMessage, :destroy]

  def check_login
    unless session[:user]
      respond_to do |format|
        format.json { render :json => 'Please use /session/start/<name> to start a new session', :status => :unauthorized }
      end
      return false
    end
  end


  def index
    @boards = Board.all

    respond_to do |format|
      format.json { render :json => @boards.map {
          |board|
        {
            board: board,
            links: [
                {type: 'post_message', url: "/board/#{board.id}/post"},
                {type: 'delete_board', url: "/board/#{board.id}"}
            ]
        }
      } }
    end
  end

  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render :json => @board.posts }
    end
  end

  def destroy
    @board = Board.find(params[:id])
    status = 'Fail'

    if @board.user_id == session[:user]
      @board.destroy
      status = 'Success'
    end

    respond_to do |format|
      format.json { render :json => {
          links: [
              {type: 'list_boards', url: '/boards.json'}
          ],
          status: status
      } }
    end
  end

  def create
    board = User.find(session[:user]).boards.create(name: params[:name])
    board.save

    respond_to do |format|
      format.json { render :json => {
          links: [
              {type: 'post_message', url: "/board/#{board.id}/post"},
              {type: 'list_boards', url: '/boards.json'}
          ],
          board: board
      } }
    end
  end

  def postMessage
    post = Board.find(params[:id]).posts.create(message: params[:message], user_id: session[:user])
    post.save

    respond_to do |format|
      format.json { render :json => {
          links: [
              {type: 'list_message', url: "/board/#{params[:id]}.json"}
          ],
          post: post
      } }
    end
  end
end

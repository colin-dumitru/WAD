class BoardsController < ActionController::Base
  def index
    @boards = Board.all

    respond_to do |format|
      format.json { render :json => @boards }
    end
  end

  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render :json => @board }
    end
  end
end

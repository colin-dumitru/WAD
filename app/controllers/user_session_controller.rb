class UserSessionController < ActionController::Base
  def start

    @user = User.find_by name: params[:name]

    if @user == nil
      @user = User.new(:name => params[:name])
      @user.save
    end

    session[:user] = @user

    respond_to do |format|
      format.html { render :json => "Session started for user #{@user.name}"}
    end

  end

  def stop

  end
end

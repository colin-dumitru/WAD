class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def show
    render template: 'home.erb'
  end

  def stream
    render template: 'stream.erb'
  end

end

class AjaxController < ApplicationController
  def show
    render template: 'ajax.erb'
  end
end

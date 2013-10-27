WAD::Application.routes.draw do
  resources :boards
  resources :posts

  get '/session/start/:name' => 'user_session#start'
  get '/session/end' => 'user_session#stop'
  post '/board/:id/post' => 'boards#postMessage'
  post '/board/:name/post_by_name' => 'boards#postMessageByName'

  get '/board/:name/stream' => 'posts#stream'

  get '/ajax' => 'ajax#show'
  get '/stream' => 'application#stream'

  root :to => 'application#show'
end

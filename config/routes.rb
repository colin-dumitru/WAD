WAD::Application.routes.draw do
  resources :boards
  resources :posts

  get '/session/start/:name' => 'user_session#start'
  get '/session/end' => 'user_session#stop'
  post '/board/:id/post' => 'boards#postMessage'

  root :to => 'application#show'
end

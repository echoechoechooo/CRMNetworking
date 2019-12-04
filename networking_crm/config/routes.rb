Rails.application.routes.draw do
  resources :todos
    get '/auth/:provider/callback', to: 'sessions#create'
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
    root to: 'pages#index'
end

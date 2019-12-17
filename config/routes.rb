Rails.application.routes.draw do
    get '/callback', to: 'sessions#create'
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    devise_scope :user do
      authenticated :user do
        root 'pages#index', as: :authenticated_root
      end

      unauthenticated do
        root 'devise/sessions#new', as: :unauthenticated_root
      end
    end
    get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
    resources :contacts
    resources :todos
    put '/updateusertags', to: 'users#updatetags'
    root to: 'pages#index'
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    resources :artists
    resources :albums
    resources :songs
  end

  match '*path' => 'home#index', via: :get

end

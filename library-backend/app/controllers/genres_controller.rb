class GenresController < ApplicationController

  def index
    genres = Genre.all
    render json: genres, except: [:created_at, :updated_at], include: {books: {except: [:created_at, :updated_at]}}
  end

  def show
    genre = Genre.find(params[:id])
    render json: genre
  end

  def create
    genre = Genre.new(genre_params)
   
    if genre.save
      render json: genre, except: [:created_at, :updated_at], status: :created, location: genre
    else
      render json: genre.errors, status: :unprocessable_entity
    end
  end

  def destroy
    genre = Genre.find(params[:id])
    genre.destroy
  end

  private
    def genre_params
      params.require(:genre).permit(:name)
    end
    
end

class BookSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :author, :description, :genre_id
  belongs_to :genre
end
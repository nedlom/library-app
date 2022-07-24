class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.text :description
      t.belongs_to :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end

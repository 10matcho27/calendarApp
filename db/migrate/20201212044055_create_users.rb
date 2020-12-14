class AddColumnToDates < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.boolean :dates, array: true default: []
    end
  end
end
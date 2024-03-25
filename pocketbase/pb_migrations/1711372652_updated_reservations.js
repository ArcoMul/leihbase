/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  collection.createRule = "@request.auth.id = @request.data.user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  collection.createRule = null

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  collection.createRule = "(@request.auth.id = @request.data.user || (@collection.location.id ?= location && @collection.location.users ?~ @request.auth.id)) && @request.data.end > @request.data.start"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  collection.createRule = "@request.auth.id = @request.data.user && @request.data.end > @request.data.start"

  return dao.saveCollection(collection)
})

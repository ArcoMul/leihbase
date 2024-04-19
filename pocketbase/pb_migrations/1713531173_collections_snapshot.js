/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2024-03-15 12:37:34.808Z",
      "updated": "2024-03-15 20:15:52.174Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": true
      }
    },
    {
      "id": "oxgh1la125efx04",
      "created": "2024-03-15 12:41:14.103Z",
      "updated": "2024-04-17 20:04:57.072Z",
      "name": "products",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jvh1us5t",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "iht7wddv",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "2zarsrph",
          "name": "location",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "nkbfankqkyubdu9",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "u3csmld8",
          "name": "categories",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "eq4iy7753ga1h1m",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "nqyuzri6",
          "name": "images",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [],
            "thumbs": [
              "600x0",
              "1200x0"
            ],
            "maxSelect": 99,
            "maxSize": 5242880,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "3mnrztyl",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "nkbfankqkyubdu9",
      "created": "2024-03-15 12:42:01.803Z",
      "updated": "2024-03-15 18:49:35.272Z",
      "name": "location",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "0tkcrxxu",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "owkywjes",
          "name": "address",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jmtu17co",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "sq4yk2iw",
          "name": "users",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "jfnytcre",
          "name": "slug",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "h7plyphsy0mgjpf",
      "created": "2024-03-15 13:04:32.667Z",
      "updated": "2024-03-25 14:32:14.980Z",
      "name": "reservations",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "vrveuxdv",
          "name": "user",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "glvplwbk",
          "name": "product",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "oxgh1la125efx04",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "p3lnaxtn",
          "name": "start",
          "type": "date",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "gyc56szl",
          "name": "end",
          "type": "date",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "kv779sxd",
          "name": "note",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.id = user",
      "viewRule": null,
      "createRule": "@request.auth.id = @request.data.user && @request.data.end > @request.data.start && @request.data.start >= @todayStart  && @request.data.end >= @todayStart",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "qqus3eo9ya7bars",
      "created": "2024-03-23 12:24:02.998Z",
      "updated": "2024-03-25 13:17:53.891Z",
      "name": "public_reservations",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ekoavaef",
          "name": "product",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "oxgh1la125efx04",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "nageet85",
          "name": "start",
          "type": "date",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "1uenpxqn",
          "name": "end",
          "type": "date",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "SELECT id, product, start, end FROM reservations"
      }
    },
    {
      "id": "eq4iy7753ga1h1m",
      "created": "2024-04-01 19:55:47.861Z",
      "updated": "2024-04-01 19:58:26.355Z",
      "name": "categories",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "2jkk89vg",
          "name": "name_de",
          "type": "text",
          "required": true,
          "presentable": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "m1c5dm4h",
          "name": "name_en",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_7uhrwww` ON `categories` (`name_de`)",
        "CREATE UNIQUE INDEX `idx_D3rTwd7` ON `categories` (`name_en`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "23lng9rcyhwckvp",
      "created": "2024-04-13 20:23:30.594Z",
      "updated": "2024-04-17 20:04:57.077Z",
      "name": "public_products",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "x0zicsne",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "hgpvqhry",
          "name": "location",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "nkbfankqkyubdu9",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "aq0f63ov",
          "name": "categories",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "eq4iy7753ga1h1m",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "pwoq431j",
          "name": "images",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [],
            "thumbs": [
              "600x0",
              "1200x0"
            ],
            "maxSelect": 99,
            "maxSize": 5242880,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "bpnbualh",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "hblqkkdh",
          "name": "ongoingReservation",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "h7plyphsy0mgjpf",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {
        "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, reservations.id AS ongoingReservation FROM products LEFT JOIN reservations ON products.id = reservations.product AND DATE(reservations.start) <= DATE('now') AND DATE(reservations.end) > DATE('now')"
      }
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})

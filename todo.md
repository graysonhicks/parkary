Parkary
==========
# Router

## Routes
/parks
/parks/:id/
/parks/:id/reviews
/parks/:city/

/users/:id

# Models
## Park Model
### Properties
* lat
* lng
* address:
* size:
* dateFounded:
* website:
* amenities: [] (pointer)
* reviews: [] (pointer)
* name
* images: [] (pointer)
* description

# Collections

# Parse Classes
## Parks  
* lat
* lng
* address:
* size:
* dateFounded:
* website:
* amenities: [] (pointer)
* reviews: [] (pointer)
* name
* images: [] (pointer)
* description
### Properties
## Images
### Properties
* parkId
## Users
### Properties
* username  
* email
* password (hashed)
* favorites: [] (pointer)
* reviews [] (pointer)

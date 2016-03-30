METHODS
===========

### Sign Up Screen
* new Parse User
* User.set()
* .signUp()
* Possibly FacebookUtils

### Login Screen
* .login(username, password)
* Possibly FacebookUtils

### Search Screen
* allow search for everyone, this is real home page
* should somehow save search term (if not, go to main search blank screen)
* on button click or form submit
  * get value from search bar
* use link state to set search bar value as search term in state of global app
* search term should be location (using google) geopoint
* navigate to results route

### Main Header
* login
  * on click, go to login screen
* search
  * on click, go to search screen
* Parkary
  * on click, go to search
* add account link that shows dropdown (only on LOGGED IN)
  * include logout link

### Main Search Header
* login
  * on click, go to login screen
* search
  * on click, go to search screen
* Parkary
  * on click, go to search
* Filter
  * on click, show drop down
  * on filters click
    * new query with updated filters
* Sort By
  * on click, show drop down
  * on sort click
    * new query with updated filters (ascending, descending, etc)
* add account link that shows dropdown (only on LOGGED IN)
  * include logout link

### List Results Screen
* get search term from state of global app
* query Parse based on geopoint search term
* use parse-react to get query of results
* render should have map of query this.data.results
* need onClick function that
  * sets state of current objectid
  * passes it to other component and
  * navigates to single park route

### Map Results Screen
* get search term from state of global app
* query Parse based on geopoint search term
* GOOGLE MAPS
  * get points based on lat, lng, props of objects returned in query
  * set markers
* display query in a list on right side
* need onClick function that
  * sets state of current objectid
  * passes it to other component and
  * navigates to single park route

### Single Park
* get current park object id from props
* query using .get to get single object back from parse-react
* return method that returns to results screen (see note on search for saving term)
* test properties for displaying amenities
* favorite method that maybe adds pointer or relation between user and park (only on LOGGED IN)
* share buttons
* need google map to display single marker of park, static map
* button to go to images screen or carousel through photos

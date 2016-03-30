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

### List Results Screen
* get search term from state of global app
* query Parse based on geopoint search term
* use parse-react to get query of results
* render should have map of query this.data.results
* need onClick function that
  * sets state of current objectid
  * passes it to other component and
  * navigates to single park route

### Single Park
* get current park object id from props
* query using .get to get single object back from parse-react
* return method that returns to results screen (see note on search for saving term)
* favorite method that maybe adds pointer or relation between user and park
* share buttons
* need google map to display single marker of park, static map

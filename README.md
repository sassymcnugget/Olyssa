# Olyssa

Olyssa is a travel app which holds the collections of trips and sightseeings associated with a particular coordinates on the map. Users have access to manage(add and delete) sightseeings within desired destinations.The interface of trip`s landing pages is complemented by Google Maps API functionality where more than 150 million places can be discovered  with Google API. 

https://fierce-hamlet-84545.herokuapp.com/trips/

## Technologies Used

* Express
* Node.js
* Mongoose
* MongoDB
* Google Maps API
* Bootstrap
* CSS
* HTML

## Existing Features

1.  Olyssa supports user authentication: 
  * Features to delete and add sightseeings are available with UI elements and Google Map`s autocomplete functionality 
  * Unauthenticated user has access to review trips and sightseeings but can't add and delete sightseeings 
  
2. Trips collection is available through homepage scrollable panel: 
  * User can click on the Trip and will be redirected to landing page with associated sightseeings 
  
3. Landing page is supported by Google Map UI interface:
  * Google Map displays based on coordinates associated with Trip 
  * Sightseeings display as pins on the map, located by coordinates saved in MongoDB


## Planned Features

1. On page refresh Google map zooms to show all sightseeings pins 
2. Add logo to every page 
3. Create an about page 
4. Update sightseeings with information pulled from Google
5. User is kept on the same page when logs in 
6. Add the functionality to create new trip by geocoding the address to geographical coordinates 
7. Display errors when incorrect information provided during registration (name exists, not give name or password)
---

Homepage 
![homepage](/static/images/homepage.png?raw=true)
Landing page 
![homepage](/static/images/landing-page.png?raw=true)
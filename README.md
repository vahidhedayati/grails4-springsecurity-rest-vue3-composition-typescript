## This is a new project based on https://github.com/vahidhedayati/grails-vue-springsecurity-demo

##### It has been upgraded from grails 3 to Grails 4 and is using Vue 3 with composition API as well as typescript

###### Backend is a copy of grails 3 site all the core work is going to be front end changes So far authentication works and profile loads up - will be working on getting similar functionality as the older project



To run this application
```
./gradlew bootRun --parallel
``` 

I run each manually 

Client  (Written with `Vue 3` not that it matters for running below)
```
cd client;
npm run serve
```

-----


Server : (written with `Grails 4.0.9` - if you use grails run-app you will need to install / configure grails 4.0.9)
```
cd server;
grails run-app
```

You will not need grails pre-installed if you run or start server using below from the main folder of this application
```
./gradlew bootRun 
```


This will launch both apps and access url via 

`http://localhost:3000`

### Authentication Details

```
username: susan, password: password1 
username: pedro, password: password2
```


With above information you will be accesing url running on port `3000` this is the front end application in vue which redirects your authentication to backend grails app started on port `8080` 

All further url requests such as `/profile` or accessing `/country` CRUD are passed back to backend app with `provided authentication JWT token` 


### Grails command to create a dual site

```
grails create-app myapp --profile=vue

```


I then used vue and subsequent options to configure a vue 3 app with router / vuex typescript enabled 
```
vue create client
````

The client of grails created app was then replaced with custom made vue site

## This is a new project based on https://github.com/vahidhedayati/grails-vue-springsecurity-demo

##### It has been upgraded from grails 3 to Grails 4 and is using Vue 3 with composition API as well as typescript

###### Backend is a copy of grails 3 site all the core work is going to be front end changes So far authentication works and profile loads up - will be working on getting similar functionality as the older project


###[Youtube video](https://www.youtube.com/watch?v=jnftiOPsrFg)

To run this application
```
./gradlew bootRun --parallel
``` 

I run each manually 

Client 
```
npm run serve

```

Server :
```
grails run-app
```



This will launch both apps and access url via 

http://localhost:3000

Youtube
--------
grails create-app myapp --profile=vue

```

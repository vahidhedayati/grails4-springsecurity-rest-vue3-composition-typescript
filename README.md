## This is a new project based on https://github.com/vahidhedayati/grails-vue-springsecurity-demo

##### It has been upgraded from grails 3 to Grails 4 and is using Vue 3 with composition API as well as typescript

###### Backend is a copy of grails 3 site all the core work is going to be front end changes So far authentication works and profile loads up - will be working on getting similar functionality as the older project


### Side note - similar / related projects
- [micronaut-vuejs-cqrs](https://github.com/vahidhedayati/micronaut-vuejs-cqrs)

- [micronaut-vuejs-crud](https://github.com/vahidhedayati/micronaut-vuejs-crud)

- [grails-vue-springsecurity-demo (this)](https://github.com/vahidhedayati/grails-vue-springsecurity-demo)

- [micronaut-ms micronaut beer serving app](https://github.com/vahidhedayati/micronaut-ms)


To run this application
```
./gradlew bootRun --parallel
``` 


This will launch both apps and access url via 

http://localhost:3000

Youtube
--------
[Part1 running through authentication](https://www.youtube.com/watch?v=dawm5DNSi9w)

[Part2 Custom rest listing/ search / file streaming](https://www.youtube.com/watch?v=3otWzgbSg_U)

[Part 3 - pagination / single item reload + issues arisen from it/backend error validation](https://www.youtube.com/watch?v=AWtqLsQHakA)

[Part 4 - Complete Country walk through](https://www.youtube.com/watch?v=VPhzh3h8Ls8)


Taken from :
----
[Official guide can be found here ](http://guides.grails.org/building-a-vue-app/guide/index.html)  
```
git clone https://github.com/grails-guides/building-a-vue-app.git
```


The first thing to consider when setting up a vue app is to disable esLint.

In the `client/config/index.js` 

```
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
```

Otherwise it will complain about very specific spacing etc.

I have been working on a fairly simple edit/save function of a given specific vehicle. The process appears to be a little easier than using reactjs. Please review [this push](https://github.com/vahidhedayati/experiments/commit/5fefca620e7766012cb6d8a8e07bd348490bb673)




Creating a brand new app vuejs app
-----


To create a grails 3  vue application run the following:  

```
grails create-app myapp --profile=vue

```

package com.test.grails4.vue3


import grails.validation.Validateable

class CountrySearchBean  extends DefaultSearchBean implements  Validateable{

    Long id
    String name

    static constraints = {
        id(nullable:true)
        name(nullable: true)
    }

}

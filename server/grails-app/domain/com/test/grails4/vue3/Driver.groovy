package com.test.grails4.vue3


import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@GrailsCompileStatic
@Secured(['ROLE_DRIVER'])
@Resource(uri = '/api/driver')
class Driver extends RentalDriver {


    static hasMany = [ vehicles: Vehicle ]

    static constraints = {
        vehicles nullable: true
    }

    String toString() {

        return """ 
            Driver name: ${name} -  Username: ${username} 
        """
    }
}

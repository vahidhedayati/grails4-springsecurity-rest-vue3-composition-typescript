package com.test.grails4.vue3


import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

import java.text.DateFormat
import java.text.SimpleDateFormat

@Secured(['ROLE_DRIVER'])
@Resource(uri = '/api/contract')
class VehicleContract {

    String contractName

    VehicleHire vehicle

    Date fromDate
    Date toDate

    RentalDriver driver

    Date dateCreated
    Date lastUpdated

    Date returnDate

    static constraints = {
        contractName nullable: false, unique: true
        returnDate(nullable:true)
    }

    String toString() {
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy")
        return """
           Contract ${contractName}
            Leased by ${driver.name}
            For car: ${vehicle.name}
            For period: ${dateFormat.format(fromDate)} - ${dateFormat.format(toDate)}
        """
    }


}

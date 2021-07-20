package com.test.grails4.vue3

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

import java.text.DateFormat
import java.text.SimpleDateFormat

@Secured(['ROLE_DRIVER'])
@Resource(uri = '/api/history')
class VehicleHistory {
    VehicleContract contract
    Date returnDate
    User checkedOutBy
    User checkedInBy


    String toString() {
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy")
        return """
        History record for 
           Contract ${contract.contractName}
                Driver: ${contract.driver.name}
                Vehicle: ${contract.vehicle.name}
            Checked out by: ${checkedOutBy.username}
            Checked in by: ${checkedInBy.username}
            Returned: ${dateFormat.format(returnDate)} 
        """
    }
}

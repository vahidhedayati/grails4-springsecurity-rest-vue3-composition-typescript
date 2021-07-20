package com.test.grails4.vue3

import grails.gorm.services.Service

@Service(Driver)
interface DriverDataService {
    Driver save(String name)
}
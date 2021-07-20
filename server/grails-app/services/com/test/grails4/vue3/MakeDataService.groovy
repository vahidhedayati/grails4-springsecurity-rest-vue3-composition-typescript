package com.test.grails4.vue3

import grails.gorm.services.Service

@Service(Make)
interface MakeDataService {
    Make save(String name)
}
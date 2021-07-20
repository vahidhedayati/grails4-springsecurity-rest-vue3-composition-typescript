package com.test.grails4.vue3

import grails.gorm.services.Service

@Service(Model)
interface ModelDataService {
    Model save(String name)
}
package com.test.grails4.vue3

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import groovy.transform.CompileStatic

@CompileStatic
@Secured(['ROLE_DRIVER'])
@Resource(uri = '/api/model')
class Model {

    String name

    static constraints = {
    }

    String toString() {
        return "Model name: ${name}"
    }
}

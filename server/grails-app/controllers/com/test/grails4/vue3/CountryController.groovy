package com.test.grails4.vue3

import grails.converters.JSON
import grails.web.databinding.DataBindingUtils
import org.springframework.context.MessageSource

/**
 *
 * Customised rest controller - defined in UrlMappings.groovy
 * and application.groovy in conf to override security
 *
 */

class CountryController {

    def countryService

    def utilService


    MessageSource messageSource

    def index(){
        CountrySearchBean bean = new CountrySearchBean()
        //println "country/index = search --->-- params = ${params} vs ${request.JSON}"
        DataBindingUtils.bindObjectToInstance(bean, params)
        bean.validate()
        if (!bean.hasErrors()) {
            def results = countryService.search(bean)
            results.numberOfPages=(results.instanceTotal/bean.max).intValue()+1
            //println " number of pages =  ${results.numberOfPages} ${results.instanceTotal} vs ${results.max} "
            render results as JSON
            //return
        }
    }


    def patch() {
        println "patching"
        save()

    }
    private def internalSearch(CountrySearchBean bean) {
        def jsonResponse = countryService.search(bean)
        render jsonResponse as JSON
    }

    def update() {
        save()
    }

    def show() {
        println "we are in show"
        Country c = Country.load(params.id as Long)
        if (c) {
            render c.loadCountry() as JSON
        }
    }

    def save() {
        println " $params.id is id in question ${params}"
        def jsonParams = request.JSON
           println " $jsonParams.id is id in question ${jsonParams}"
        
        CountryBean bean = new CountryBean()
        DataBindingUtils.bindObjectToInstance(bean, jsonParams)
        if (!bean.code) {
            bean.code=utilService.mapCode(Country.class.simpleName,2,bean.name)
        }
        if (!bean.updateUser) {
            bean.updateUser=utilService.adminUser
        }
        bean.validate()
        try {
            if (!bean.hasErrors()) {
                println "-- saving country"
                def c  = countryService.save(bean)
                if (c) {
                    println "aved it"
                    CountrySearchBean bean1 = new CountrySearchBean()
                    bean1.id=jsonParams.id
                    return internalSearch(bean1)
                }
            }
        } catch (Throwable e ){

        }
        def errors = [error: bean.errors.fieldErrors.collect{messageSource.getMessage(it, request.locale)}]
        render errors as JSON, status: 409
    }

    def delete() {
        println "delete params = $params"
        def deleted = countryService.deleteRecord(params.id as Long)
        if (!deleted) {
            //throw error
            def errors = [error: message(code:'deleteFailed.label')]
            render errors as JSON, status: 409
        } else {
            def success = [success:true]
            render success as JSON, status: response.SC_OK
        }
    }
}

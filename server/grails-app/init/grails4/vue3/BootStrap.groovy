package grails4.vue3

class BootStrap {

    def bootService
    
    def init = { servletContext ->

        bootService.bootup()

    }



    def destroy = {
    }
}

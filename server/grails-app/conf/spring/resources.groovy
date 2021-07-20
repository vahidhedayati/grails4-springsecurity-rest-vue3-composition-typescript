import com.test.grails4.vue3.CorsFilter
import com.test.grails4.vue3.CustomAppRestAuthTokenJsonRenderer
import com.test.grails4.vue3.CustomSecurityEventListener
import com.test.grails4.vue3.UserPasswordEncoderListener
// Place your Spring DSL code here
beans = {
    userPasswordEncoderListener(UserPasswordEncoderListener)
    corsFilterTest(CorsFilter)
    accessTokenJsonRenderer(CustomAppRestAuthTokenJsonRenderer)
    customerSecurityEventListener(CustomSecurityEventListener)
}

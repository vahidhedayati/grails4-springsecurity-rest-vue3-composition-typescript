
grails.plugin.springsecurity.rest.token.storage.useJwt=true
grails.plugin.springsecurity.rest.token.storage.jwt.useSignedJwt=true
grails.plugin.springsecurity.rest.token.storage.jwt.secret='qrD6h8K6S9503Q06Y6Rfk21TErImPYqa'
grails.plugin.springsecurity.rest.token.storage.jwt.expiration=3600
//grails.plugin.springsecurity.rest.token.storage.jwt.expiration=3

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.test.grails4.vue3.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.test.grails4.vue3.UserRole'
grails.plugin.springsecurity.authority.className = 'com.test.grails4.vue3.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/h2-console/**',      access: ['permitAll']],
	[pattern: '/h2-console',      access: ['permitAll']],

	//Anything starting with /guest will bypass spring security checks - non authenticated access
	[pattern: '/guest/**',       access: ['permitAll']],
	[pattern: '/api/login',          access: ['permitAll']],
	[pattern: '/api/logout',        access: ['isFullyAuthenticated()']],
	[pattern: '/oauth/access_token',    access: ['permitAll']],


	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]
grails.plugin.springsecurity.filterChain.chainMap = [
		//Stateless chain
		[
				pattern: '/api/**',
				filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
		],
		[pattern: '/assets/**',      filters: 'none'],
		[pattern: '/**/js/**',       filters: 'none'],
		[pattern: '/**/css/**',      filters: 'none'],
		[pattern: '/**/images/**',   filters: 'none'],
		[pattern: '/**/favicon.ico', filters: 'none'],
		[pattern: '/vehicle/export', filters: 'none'],
		[pattern: '/oauth/access_token', filters: 'none'],
		[pattern: '/h2-console/**', filters: 'none'],
		[pattern: '/h2-console', filters: 'none'],

		[pattern: '/guest/**', filters: 'none'],

		//[pattern: '/guest/hireVehicle', filters: 'none'],
		//[pattern: '/guest/availableHires', filters: 'none'],
		//[pattern: '/guest/rental', filters: 'none'],
		//[pattern: '/guest/returnRental', filters: 'none'],
		//[pattern: '/guest/countries', filters: 'none'],
		//[pattern: '/guest/deleteCountry', filters: 'none'],
		//Traditional chain
		//[
		//		pattern: '/**',
		//		filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'
		//]
		[
				pattern: '/**',
				filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
		]
//filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
]

grails.plugin.springsecurity.rest.logout.endpointUrl='/api/logout'
grails.plugin.springsecurity.rest.token.validation.headerName='X-Auth-Token'

//grails.plugin.springsecurity.rest.token.rendering.usernamePropertyName='id'

/*
//gorm
grails.plugin.springsecurity.rest.token.storage.useGorm = true
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName = 'org.sali.Rest.AuthenticationToken'
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'token'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'username'


//login
grails.plugin.springsecurity.rest.login.active=true
grails.plugin.springsecurity.rest.login.useJsonCredentials = true
grails.plugin.springsecurity.rest.login.failureStatusCode = 401
grails.plugin.springsecurity.rest.login.usernamePropertyName = 'username'
grails.plugin.springsecurity.rest.login.passwordPropertyName='password'
grails.plugin.springsecurity.rest.login.endpointUrl='/api/login'
grails.plugin.springsecurity.rest.login.useRequestParamsCredentials = false

//logout
grails.plugin.springsecurity.rest.logout.endpointUrl='/api/logout'

//token generation
grails.plugin.springsecurity.rest.token.generation.useUUID=false
grails.plugin.springsecurity.rest.token.generation.useSecureRandom=true

//token rendering
grails.plugin.springsecurity.rest.token.rendering.usernamePropertyName='username'
grails.plugin.springsecurity.rest.token.rendering.authoritiesPropertyName='roles'
grails.plugin.springsecurity.rest.token.rendering.tokenPropertyName='token'

//token validate
grails.plugin.springsecurity.rest.token.validation.useBearerToken = true

//if disable 'Bearer', you can configure a custom header.
//grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
//grails.plugin.springsecurity.rest.token.rendering.tokenPropertyName   access_token
//grails.plugin.springsecurity.rest.token.validation.headerName = 'x-auth-token'
grails.plugin.springsecurity.rest.token.validation.active=true
grails.plugin.springsecurity.rest.token.validation.endpointUrl='/api/validate'



//grails.plugin.springsecurity.rest.token.validation.headerName = 'X-Auth-Token'
//grails.plugin.springsecurity.rest.token.validation.useBearerToken = false

//grails.plugin.springsecurity.password.algorithm = 'SHA-256'
//grails.plugin.springsecurity.password.hash.iterations = 1

//cors

cors.enabled=true
cors.url.pattern = '/api/ * '
cors.headers=[
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'origin, authorization, accept, content-type, x-requested-with,X-Auth-Token',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS',
		'Access-Control-Max-Age': 3600
]
*/
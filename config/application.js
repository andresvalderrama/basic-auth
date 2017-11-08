// config.time_zone = 'Central Time (US & Canada)'

/**
config.public_file_server.enabled configures Rails to serve static files from the public directory. This option defaults to true, but in the production environment it is set to false because the server software (e.g. NGINX or Apache) used to run the application should serve static files instead. If you are running or testing your app in production mode using WEBrick (it is not recommended to use WEBrick in production) set the option to true. Otherwise, you won't be able to use page caching and request for files that exist under the public directory.
*/
// config.public_file_server.enabled = public

/**
config.session_store specifies what class to use to store the session. Possible values are :cookie_store which is the default, :mem_cache_store, and :disabled. The last one tells Rails not to deal with sessions. Defaults to a cookie store with application name as the session key. Custom session stores can also be specified:
 */
// config.session_store :my_custom_store

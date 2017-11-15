/**
 * Internationalization / Localization Settings
 *
 * If your app will touch people from all over the world, i18n (or internationalization)
 * may be an important part of your international strategy.
 *
 * For a complete list of i18n options, see:
 * https://github.com/mashpie/i18n-node#list-of-configuration-options
 *
 */

module.exports = {
  /***************************************************************************
  *
  * Which locales are supported?
  *
  ***************************************************************************/
  locales: ['es', 'en'],

  /***************************************************************************
  *
  * What is the default locale for the site? Note that this setting will be
  * overridden for any request that sends an "Accept-Language" header (i.e.
  * most browsers), but it's still useful if you need to localize the response
  * for requests made by non-browser clients (e.g. cURL).
  *
  ***************************************************************************/
  defaultLocale: 'es',

  /***************************************************************************
  *
  * Sets a custom cookie name to parse locale settings from, by default
  * this cookie is null if it is not defined.
  *
  ***************************************************************************/
  cookie: 'locale',

  /***************************************************************************
  *
  * Query parameter to switch locale (ie. /home?locale=en) - defaults to
  * NULL. When this param is passed in a url the the current locale is
  * updated in the application.
  *
  ***************************************************************************/
  queryParameter: 'locale',

  /***************************************************************************
  *
  * Where will store all locale json files - defaults to './locales'. Path
  * is relative to app root.
  *
  ***************************************************************************/
  directory: './locale',

  /****************************************************************************
  *
  * Automatically add new keys to locale (translation) files when they are
  * encountered during a request?
  *
  ****************************************************************************/
  updateFiles: false,

  /****************************************************************************
  *
  * Supports hierarchical translation catalogs in locale .json files
  * (ei.greeting.formal)
  *
  ****************************************************************************/
  objectNotation: true
}

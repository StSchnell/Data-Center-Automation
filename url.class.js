/**
 * Mock-up of the URL class from VMware Aria Automation.
 * Usable object to put/get http requests.
 *
 * Hint: The properties are accessed using getter and setter methods.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.3.0
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine release 1.7.14 or higher.
 *
 * Checked with Rhino engine version 1.7.14 and 1.7.15
 *
 * @function URL
 * @param {object} url
 * @returns {object}
 *
 * @example
 * var urlObject = new URL("http://localhost/index.php");
 * System.log(urlObject.getClassName());
 */

var URL = function(url) {

  // The use of sun.net.www.protocol.http.HttpURLConnection is only
  // possible from release 1.7.14.
  var rhinoVersion = System.getRhinoVersion();
  if (System.compareVersionNumber("1.7.13", rhinoVersion) === 1) {
    throw new Error("This class can only be used with Rhino release 1.7.14");
  }

  this._url = null;

  if (
    typeof url === "undefined" ||
    url === null ||
    String(url).trim() === ""
  ) {
    throw new Error("url argument can not be undefined or null");
  }
  try {
    if (typeof url === "string") {
      this._url = java.net.URI(url.toString()).toURL();
    } else {
      this._url = java.net.URI("http://localhost/").toURL();
    }
  } catch (exception) {
    throw new Error(exception.message);
  }

  this._contentType = "application/x-www-form-urlencoded";
  this._datas = null;
  this._host = this._url.getHost();
  this._port = this._url.getPort;
  this._requestType = "GET";
  this._receivedBuffer = null;
  this._header = [];
  this._authorization = this._url.getAuthority();
  this._responseCode = 0;
  this._responseMessage = null;

};

URL.prototype = {

  /**
   * Adds additional information to the HTTP header.<br>
   * Hint: This method is not available in standard.
   *
   * @function addToHeader
   * @param {string} key - The name of the key to add
   * @param (string} value - The value of the key
   */
  addToHeader : function(key, value) {
    var obj = {};
    obj[key] = value;
    this._header.push(obj);
  },

  /**
   * Adds a parameter (query) at the end of the URL.
   *
   * @function addParameter
   * @param {object} key - The key of the parameter
   * @param (object} value - The value of the parameter
   *
   * @example
   * var urlObject = new URL("http://localhost/index.php");
   * urlObject.addParameter("test", "test")
   * System.log(urlObject.getUrl());
   * // http://localhost/index.php?test=test
   */
  addParameter : function(key, value) {
    if (
      typeof key === "undefined" ||
      key === null ||
      String(key).trim() === ""
    ) {
      throw new Error("key argument can not be undefined or null");
    }
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    try {
      var uri = this._url.toURI();
      var scheme = uri.getScheme();
      var userInfo = uri.getUserInfo();
      var host = uri.getHost();
      var port = uri.getPort();
      var path = uri.getPath();
      var query = uri.getQuery();
      var fragment = uri.getFragment();
      if (query === null) {
        query = String(value) + "=" + String(key);
      } else {
        query += "&" + String(value) + "=" + String(key);
      }
      this._url = new java.net.URI(
        scheme, userInfo, host, port, path, query, fragment
      ).toURL();
    } catch (exception) {
      throw new Error("Error at URL.addParameter: " + exception.message);
    }
  },

  /**
   * Adds a path to the URL.<br>
   * Hint: This method behaves differently from the standard.<br> The
   * path is actually added and not just appended to the end of the URL.
   *
   * @function addPath
   * @param {object} value - The path
   *
   * @example
   * var urlObject = new URL("http://localhost");
   * urlObject.addPath("/index.php");
   * System.log(urlObject.getUrl());
   * // http://localhost/index.php
   */
  addPath : function(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    try {
      var uri = this._url.toURI();
      var scheme = uri.getScheme();
      var userInfo = uri.getUserInfo();
      var host = uri.getHost();
      var port = uri.getPort();
      var path = uri.getPath();
      var query = uri.getQuery();
      var fragment = uri.getFragment();
      if (path === null) {
        path = String(value);
      } else {
        if (value.substring(0, 1) === "/") {
          path += String(value);
        } else {
          path += "/" + String(value);
        }
      }
      this._url = new java.net.URI(
        scheme, userInfo, host, port, path, query, fragment
      ).toURL();
    } catch (exception) {
      throw new Error("Error at URL.addPath: " + exception.message);
    }
  },

  /**
   * Clears the HTTP header.<br>
   * Hint: This method is not available in standard.
   *
   * @function clearHeader
   */
  clearHeader : function() {
    this._header = [];
  },

  /**
   * Deletes a key from the HTTP header.<br>
   * Hint: This method is not available in standard.
   *
   * @function deleteFromHeader
   * @param {string} key - The name of the key to delete
   */
  deleteFromHeader : function(key) {
    this._header.splice(this._header.indexOf(key), 1);
  },

  /**
   * Escapes the host if this is needed. Usually you need to escape<br>
   * IPv6 numeric addresses using brackets. If this host does not need<br>
   * to be escaped then the original is returned.
   *
   * @function escapeHost
   * @param {string} ipAddress
   * @returns {string} - the host so it can be used in URL
   *
   * @example
   * var urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.escapeHost("127.0.0.1"));
   * // [127.0.0.1]
   */
  escapeHost : function(ipAddress) {
    if (
      ipAddress.substring(0, 1) !== "[" &&
      ipAddress.substring(ipAddress.length - 1) !== "]"
    ) {
      return "[" + ipAddress + "]";
    }
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @function getClassName
   * @returns {string}
   *
   * @example
   * var urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.getClassName());
   * // URL
   */
  getClassName : function() {
    return "URL";
  },

  /**
   * Returns the content of the URL
   *
   * @function getContent
   * @returns {string}
   *
   * @example
   * var urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.getContent());
   * // <!DOCTYPE html PUBLIC ...
   */
  getContent : function() {
    return this.postContent(null);
  },

  /**
   * Gets the authority part of the URL.<br>
   * Hint: This method is not available in standard.
   *
   * @function getAuthorization
   */
  getAuthorization : function() {
    return String(this._authorization);
  },

  /**
   * Gets the content type.<br>
   * Hint: This is a getter method to the property contentType<br>
   * which is not available in standard.
   *
   * @function getContentType
   */
  getContentType : function() {
    return this._contentType;
  },

  /**
   * Gets the datas (content).<br>
   * Hint: This is a getter method to the property datas<br>
   * which is not available in standard.
   *
   * @function getDatas
   */
  getDatas : function() {
    return this._datas;
  },

  /**
   * Returns the host.<br>
   * Hint: This is a getter method to the property host<br>
   * which is not available in standard.
   *
   * @function getHost
   */
  getHost : function() {
    if (this._host !== null) {
      return this._host;
    }
  },

  /**
   * Return the regex pattern string that matches any valid host name
   * or IP address.
   *
   * @function getHostnameOrIPAddressPatternStr
   * @returns {string} - String that is regular expression pattern that<br>
   *                     matches valid host name or IP address.
   */
  getHostnameOrIPAddressPatternStr : function() {
    return "(?:(?:[\\p{L}\\d](?:[\\p{L}\\d_-]{0,61}[\\p{L}\\d])?\\.)*[\\p{L}\\d](?:[\\p{L}\\d_-]{0,61}[\\p{L}\\d])?)|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?i:(((?=(?>.*?::)(?!.*::)))(::)?([0-9A-F]{1,4}::?){0,5}|([0-9A-F]{1,4}:){6})(\\2([0-9A-F]{1,4}(::?|((%.+)?$))){0,2}|((25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])(\\.|((%.+)?$))){4}|[0-9A-F]{1,4}:[0-9A-F]{1,4})(?<![^:]:)(?<!\\.))(%.+)?";
  },

  /**
   * Return the regex pattern string that matches any valid host name.
   *
   * @function getHostnamePatternStr
   * @returns {string} - String that is regular expression pattern that<br>
   *                     matches valid host name.
   */
  getHostnamePatternStr : function() {
    return "(?:(?:[\\p{L}\\d](?:[\\p{L}\\d_-]{0,61}[\\p{L}\\d])?\\.)*[\\p{L}\\d](?:[\\p{L}\\d_-]{0,61}[\\p{L}\\d])?)";
  },

  /**
   * String that is regular expression pattern that matches valid<br>
   * IP address.
   *
   * @function getIPAddressPatternStr
   * @returns {string} - String that is regular expression pattern that<br>
   *                     matches valid IP address.
   */
  getIPAddressPatternStr : function() {
    return "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?i:(((?=(?>.*?::)(?!.*::)))(::)?([0-9A-F]{1,4}::?){0,5}|([0-9A-F]{1,4}:){6})(\\2([0-9A-F]{1,4}(::?|((%.+)?$))){0,2}|((25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])(\\.|((%.+)?$))){4}|[0-9A-F]{1,4}:[0-9A-F]{1,4})(?<![^:]:)(?<!\\.))(%.+)?";
  },

  /**
   * Return the regex pattern string that matches any valid IPv4 address.
   *
   * @function getIPv4AddressPatternStr
   * @returns {string} - String that is regular expression pattern that<br>
   *                     matches valid IPv4 address.
   */
  getIPv4AddressPatternStr : function() {
    return "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  },

  /**
   * Return the regex pattern string that matches any valid IPv6 address.
   *
   * @function getIPv6AddressPatternStr
   * @returns {string} - String that is regular expression pattern that<br>
   *                     matches valid IPv6 address.
   */
  getIPv6AddressPatternStr : function() {
    return "(?i:(((?=(?>.*?::)(?!.*::)))(::)?([0-9A-F]{1,4}::?){0,5}|([0-9A-F]{1,4}:){6})(\\2([0-9A-F]{1,4}(::?|((%.+)?$))){0,2}|((25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])(\\.|((%.+)?$))){4}|[0-9A-F]{1,4}:[0-9A-F]{1,4})(?<![^:]:)(?<!\\.))(%.+)?";
  },

  /**
   * Returns the port.<br>
   * Hint: This is a getter method to the property port<br>
   * which is not available in standard.
   *
   * @function getPort
   */
  getPort : function() {
    if (this._port !== null) {
      return this._port;
    }
  },

  /**
   * Returns the response code of the last http request.<br>
   * Hint: This method is not available in standard.
   *
   * @function getResponseCode
   */
  getResponseCode : function() {
    return this._responseCode;
  },

  /**
   * Returns the response message of the last http request.<br>
   * Hint: This method is not available in standard.
   *
   * @function getResponseMessage
   */
  getResponseMessage : function() {
    return this._responseMessage;
  },

  /**
   * Gets the request type (GET, PUT, POST or DELETE).<br>
   * Hint: This is a getter method to the property requestType<br>
   * which is not available in standard.
   *
   * @function getRequestType
   */
  getRequestType : function() {
    return this._requestType;
  },

  /**
   * Returns the result.<br>
   * Hint: This is a getter method to the property result<br>
   * which is not available in standard.
   *
   * @function getResult
   */
  getResult : function() {
    if (this._receivedBuffer !== null) {
      return String(this._receivedBuffer);
    } else {
      return null;
    }
  },

  /**
   * Returns the URL in the form of a String.<br>
   * Hint: This is a getter method to the property url<br>
   * which is not available in standard.
   *
   * @function getUrl
   */
  getUrl : function() {
    if (this._url !== null) {
      return String(this._url);
    }
  },

  /**
   * Checks if the parameter is valid host name.
   *
   * @function isValidHostname
   * @param {string} hostname
   * @returns {boolean} - true if address is valid host name
   *
   * @example
   * urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.isValidHostname("www.myhost.com"));
   * // true
   */
  isValidHostname : function(hostname) {
    if (
      typeof hostname === "undefined" ||
      hostname === null ||
      String(hostname).trim() === ""
    ) {
      throw new Error("hostname argument can not be undefined or null");
    }
    var HOSTNAME_PATTERN =
      java.util.regex.Pattern.compile(this.getHostnamePatternStr(), 2);
    return HOSTNAME_PATTERN.matcher(hostname).matches();
  },

  /**
   * Checks if the parameter is valid host name or IP address<br>
   * (both IPv4 and IPv6).
   *
   * @function isValidHostnameOrIPAddress
   * @param {string} hostOrIP
   * @returns {boolean} - true if address is valid host name or IP address
   */
  isValidHostnameOrIPAddress : function(hostOrIP) {
    if (
      typeof hostOrIP === "undefined" ||
      hostOrIP === null ||
      String(hostOrIP).trim() === ""
    ) {
      throw new Error("hostOrIP argument can not be undefined or null");
    }
    var  HOSTNAME_OR_IP_PATTERN =
      java.util.regex.Pattern.compile(this.getHostnameOrIPAddressPatternStr(), 2);
    return HOSTNAME_OR_IP_PATTERN.matcher(hostOrIP).matches();
  },

  /**
   * Checks if the parameter is valid IP address (both IPv4 and IPv6).
   *
   * @function isValidIPAddress
   * @param {string} ipAddress
   * @returns {boolean} - true if address is valid IP address
   *
   * @example
   * urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.isValidIPAddress("127.0.0.1"));
   * // true
   */
  isValidIPAddress : function(ipAddress) {
    if (
      typeof ipAddress === "undefined" ||
      ipAddress === null ||
      String(ipAddress).trim() === ""
    ) {
      throw new Error("ipAddress argument can not be undefined or null");
    }
    var IP_PATTERN =
      java.util.regex.Pattern.compile(this.getIPAddressPatternStr(), 2);
    return IP_PATTERN.matcher(ipAddress).matches();
  },

  /**
   * Checks if the parameter is valid IPv4 address.
   *
   * @function isValidIPv4Address
   * @param {string} ipAddress
   * @returns {boolean} - true if address is valid IPv4 address
   *
   * @example
   * urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.isValidIPv4Address("127.0.0.1"));
   * // true
   */
  isValidIPv4Address : function(ipAddress) {
    if (
      typeof ipAddress === "undefined" ||
      ipAddress === null ||
      String(ipAddress).trim() === ""
    ) {
      throw new Error("ipAddress argument can not be undefined or null");
    }
    var IPV4_PATTERN =
      java.util.regex.Pattern.compile(this.getIPv4AddressPatternStr(), 2);
    return IPV4_PATTERN.matcher(ipAddress).matches();
  },

  /**
   * Checks if the parameter is valid IPv6 address.
   *
   * @function isValidIPv6Address
   * @param {string} ipAddress
   * @returns {boolean} - true if address is valid IPv6 address
   *
   * @example
   * urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.isValidIPv6Address("::FFFF:10.2.4.1"));
   * // true
   */
  isValidIPv6Address : function(ipAddress) {
    if (
      typeof ipAddress === "undefined" ||
      ipAddress === null ||
      String(ipAddress).trim() === ""
    ) {
      throw new Error("ipAddress argument can not be undefined or null");
    }
    var IPV6_PATTERN =
      java.util.regex.Pattern.compile(this.getIPv6AddressPatternStr(), 2);
    return IPV6_PATTERN.matcher(ipAddress).matches();
  },

  /**
   * Posts the content defined in the datas property to the URL.
   *
   * @function post
   * @returns {string}
   *
   * @example
   * var urlObject = new URL("http://127.0.0.1:3000");
   * urlObject.setRequestType("POST");
   * urlObject.setContentType("application/json");
   * urlObject.setDatas("{\"attributes\":{\"hostname\":\"localhost\"}}");
   * var post = urlObject.post();
   */
  post : function() {
    return this.postContent(this._datas);
  },

  /**
   * Posts the content to the URL.
   *
   * @function postContent
   * @param {object} content - The content
   * @returns {string}
   *
   * @example
   * var urlObject = new URL("http://127.0.0.1:3000");
   * urlObject.setRequestType("POST");
   * urlObject.setContentType("application/json");
   * var content = "{\"attributes\":{\"ipaddress\":\"127.0.0.1\"}}";
   * var postContent = urlObject.postContent(content);
   */
  postContent : function(content) {

    this._receivedBuffer = new java.lang.StringBuffer();
    var urlConnection;
    var input;

    try {

      urlConnection = this._url.openConnection();
      // java.net.HttpURLConnection is an abstract class, and
      // sun.net.www.protocol.http.HttpURLConnection is the
      // implementation in the Oracle JRE, which is used here.
      urlConnection.setRequestMethod(this._requestType);
      urlConnection.setDoInput(true);
      urlConnection.setDoOutput((content != null));
      urlConnection.setUseCaches(false);
      urlConnection.setRequestProperty("Content-Type", this._contentType);

      // Set additional header
      this._header.forEach( function(headerItem) {
        for (var key in headerItem) {
          urlConnection.setRequestProperty(key, headerItem[key]);
        }
      });

      // Set authorization
      if (this._authorization != null) {
        var headerAuthorization = java.util.Base64.getEncoder().encodeToString(
          (this._authorization.split("@")[0]).getBytes("UTF-8")
        );
        urlConnection.setRequestProperty(
          "Authorization", "Basic " + headerAuthorization
        );
      }

      if (content != null) {
        var printout =
          java.io.DataOutputStream(urlConnection.getOutputStream());
        try {
          printout.writeBytes(content);
          printout.flush();
        } finally {
          printout.close();
        } 
      }

      this._responseCode = Number(urlConnection.getResponseCode());
      this._responseMessage = String(urlConnection.getResponseMessage());

      input = java.io.DataInputStream(urlConnection.getInputStream());
      var bufferedReader = null;
      try {
        bufferedReader = new java.io.BufferedReader(
          new java.io.InputStreamReader(input)
        );
        while((line = bufferedReader.readLine()) !== null) {
          this._receivedBuffer.append(line + "\n");
        }
      } finally {
        if (bufferedReader !== null) {
          bufferedReader.close();
        }
      }

    } catch (exception) {
      throw new Error("Error at URL.postContent: " + exception.message);

    } finally {
      if (input != null) {
        input.close();
      }
      if (urlConnection != null) {
        urlConnection.disconnect();
      }
    }

    return String(this._receivedBuffer.toString());

  },

  /**
   * Sets the authorization part of the URL.<br>
   * Hint: This method is not available in standard.
   *
   * @function setAuthorization
   * @param {string} value
   */
  setAuthorization : function(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    if (value != null) {
      this._authorization = java.lang.String(value);
    }
  },

  /**
   * Sets the content type(content).<br>
   * Hint: This is a setter method to the property contentType<br>
   * which is not available in standard.
   *
   * @function setContentType
   * @param {string} value
   */
  setContentType : function(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    if (value != null) {
      this._contentType = String(value);
    }
  },

  /**
   * Sets the datas (content).<br>
   * Hint: This is a setter method to the property datas<br>
   * which is not available in standard.
   *
   * @function setDatas
   * @param {string} value
   */
  setDatas : function(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    if (value != null) {
      this._datas = String(value);
    } else {
      this._datas = null;
    } 
  },

  /**
   * Sets the request type (GET, PUT, POST or DELETE).<br>
   * Hint: This is a setter method to the property requestType<br>
   * which is not available in standard.
   *
   * @function setRequestType
   * @param {string} value
   */
  setRequestType : function(value) {
    if (
      typeof value === "undefined" ||
      value === null ||
      String(value).trim() === ""
    ) {
      throw new Error("value argument can not be undefined or null");
    }
    if (value != null) {
      this._requestType = value;
    } else {
      this._requestType = "GET";
    } 
  },

  /**
   * Un-escapes the host if this is IPv6 address in brackets. Usually<br>
   * you need to escape IPv6 numeric addresses using brackets but some<br>
   * times you need the plain IPv6 address. If this is not escaped<br>
   * IPv6 address the original is returned.
   *
   * @function unescapeHost
   * @param {string} ipAddress
   * @returns {string} - the host so it can be used in URL
   *
   * @example
   * urlObject = new URL("http://localhost/index.php");
   * System.log(urlObject.unescapeHost("[127.0.0.1]"));
   * // 127.0.0.1
   */
  unescapeHost : function(ipAddress) {
    if (
      ipAddress.substring(0, 1) === "[" &&
      ipAddress.substring(ipAddress.length - 1) === "]"
    ) {
      return ipAddress.substring(1, ipAddress.length - 1);
    }
  }

};

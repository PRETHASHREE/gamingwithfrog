
function UtWriteCookie (piKey, piValue, piDay)
{
var sSubDomain;
var nPos;
var sExpire;

	if (piDay)
	{
		var oDate = new Date();
		oDate.setTime(oDate.getTime() + (piDay*24*60*60*1000));
		sExpire = "; expires=" + oDate.toGMTString();
	}
	else
	{
	 sExpire = "";
    }

 
	sSubDomain = location.hostname;
	nPos = sSubDomain.indexOf('.');
	if (nPos > 0)
	{
	 sSubDomain = sSubDomain.substring (nPos);
	 document.cookie= piKey + '=' + escape(piValue) + ';domain=' + sSubDomain + '; path=/' + sExpire;
	}
	else
	{
	 document.cookie= piKey + '=' + escape(piValue) + '; path=/' + sExpire;
	}
}

// Read the value of the specified cookie
function UtReadCookie (piKey)
{
    var dc = document.cookie;
    var prefix = piKey + "=";
    var begin = dc.indexOf("; " + prefix);
    
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0)
           return null;
    }
    else
    {
        begin += 2;
    }
    
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    
    return unescape(dc.substring(begin + prefix.length, end));
}

// Remove the specified cookie
function UtRemoveCookie (piKey)
{
  UtWriteCookie (piKey, "", -1);
//  document.cookie = piKey + "=" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function UtDetectCookie ()
{
 if (! window.navigator.cookieEnabled)
 {
// alert('cookie disabled');
   
   window.location.href = "/CookieHelp/";
   return false;
 }
 else
 {
   return true;
 }
}

function GotoRequiredCookieUrl(piUrl)
{
 if (! UtDetectCookie())
    return false;
     
 window.location.href = piUrl;
 
 return true;
}

function GotoSecuredUrl(piUrl)
{
 if (! IsSignOn())
    return false;
     
 window.location.href = piUrl;
 
 return true;
}

function IsSignOn()
{
 var nRoleId = UtReadCookie("RoleId");

 return (nRoleId);
}

function ReadQueryString(piKey)
{
  var sUrl = window.document.location.href;

  var nPos, nLen;
  var sValue= "";
  
  nLen = sUrl.length;
  nPos = sUrl.indexOf("?")
  if (nPos > 0)
  {
    var sQueryString = sUrl.substr (nPos + 1,nLen - nPos - 1); 

	var parseQueryString = function( queryString ) {
		var params = {}, queries, temp, i, l;

		// Split into key/value pairs
		queries = queryString.split("&");

		// Convert the array of strings into an object
		for ( i = 0, l = queries.length; i < l; i++ ) {
			temp = queries[i].split('=');
			params[temp[0]] = temp[1];
		}

		return params;
	};
	
	var params = parseQueryString (sQueryString);
	
    sValue = params[piKey];
    if (sValue != null)
    {
	    nLen = sValue.length;
		nPos = sValue.indexOf("#")
		if (nPos > 0)
		{
		 sValue= sValue.substr (0,nPos); 
		}
    }
  }

  return sValue;
}

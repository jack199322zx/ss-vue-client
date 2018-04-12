const getCookieValue = (name) => {
  var cookieValues = new RegExp('(^| )' + name + '=([^;]*)(;|$)').exec(document.cookie);
  return cookieValues ? cookieValues[2] : null;
};

const setCookie = (name, value, expireTime) => {
  var expiresDate;
  expireTime && (expiresDate = new Date(), expiresDate.setTime(expiresDate.getTime() + expireTime));
  document.cookie = name + '=' + value + (expiresDate ? '; expires=' + expiresDate.toGMTString() : '');
};

const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookieValue(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export default {
  getCookieValue,
  setCookie,
  delCookie
};

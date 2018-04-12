var ismail = function (value){
  var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if(!reg.test(value)){
    return false;
  }
  return true;
}

export default ismail

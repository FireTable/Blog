
export function isQQ (qq) {
  var reQQ = /^[1-9]\d{4,9}$/; 
  if(!reQQ.test(qq)){
    return false;
  }else{
    return true;
  }
}
const validateText = (data) =>{
  const regex = /^([0-9]{1}|[0-2]{1}[0-23]{1})[:][0-59]{2}\s-\s(?!(\s*;))([А-Яа-я.,]*|\s)*[;]/mg;
  let m, result = ""
  while ((m = regex.exec(data)) !== null) {
      if (m.index === regex.lastIndex) 
          regex.lastIndex++;
      for (let key = 0; key < m.length; key+=2) {
        if (m[key] !== undefined) {
          m[key] += ""
          result += m[key] + "\n" 
        }      
      }
  }
  return result
}

module.exports = validateText

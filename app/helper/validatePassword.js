function validatePassword(password) {
    const lowerRegex = /[a-z]/;
    const upperRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  
    if (!password || password.length < 8) {
      return false;
    }
  
    if (!lowerRegex.test(password)) {
      return false;
    }
  
    if (!upperRegex.test(password)) {
      return false;
    }
  
    if (!digitRegex.test(password)) {
      return false;
    }
  
    if (!specialRegex.test(password)) {
      return false;
    }
  
    return true;
  }

 module.exports = validatePassword;
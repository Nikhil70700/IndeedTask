export function validateName(name) {
    return name && name.trim().length > 0;
  }
  
  export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
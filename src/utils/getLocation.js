export function getLocation(str) {
    const parts = str.split(',');
    if (parts.length > 1) {
      return parts[1].trim(); 
    } else {
      return parts;
    }
  }
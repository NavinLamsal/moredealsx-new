

export function validatePassword(password: string): string {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@$!%*?&).";
    return "";
}

export function validateConfrimPassword(password: string , confirmPassword:string): string{

  if(password.length > confirmPassword.length){
    return ""
  }

  if(password !== confirmPassword){
    return "Password didn't matched"
  }
  return "";
}


export const validateRequired = (value: string , name: string): string => {
    if (!value.trim()) return `${name} is required.`;
    const values = value.split(" ").filter((item) => item.trim() !== "");
    if(values.length < 1) return `${name} is required.`;
    return "";
  }
  
  export const validateRequiredWords = (value: string, name: string, requiredWords: number): string => {
    const wordCount = value.trim().split(" ").filter((item) => item !== "").length;
    if (wordCount < requiredWords) {
      return `${name} must contain at least ${requiredWords} words.`;
    }
    return "";
  };
  
  export const validateRequiredCharacter = (value: string, name: string, requiredWords?: number, requiredLength?: number): string => {
    // Validate word count if requiredWords is provided
    if (requiredWords) {
      const wordCount = value.trim().split(" ").filter((item) => item !== "").length;
      if (wordCount < requiredWords) {
        return `${name} must contain at least ${requiredWords} words.`;
      }
    }
  
    // Validate character length if requiredLength is provided
    if (requiredLength && value.length < requiredLength) {
      return `${name} must contain at least ${requiredLength} characters.`;
    }
  
    return "";
  };
  
  
  export const validateRequiredCharacters = (value: string, name: string, requiredLength: number): string => {
    if (value.length < requiredLength) {
      return `${name} must contain at least ${requiredLength} characters.`;
    }
    return "";
  };
  export const validateMaxCharacters = (value: string, name: string, requiredLength: number): string => {
    if (value.length > requiredLength) {
      return `${name} must contain at characters up to ${requiredLength}.`;
    }
    return "";
  };
  
  
  const validateAlphanumeric = (value: string , name: string): string => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Regular expression for alphanumeric characters
    if (!alphanumericRegex.test(value)) {
      
      return `${name} must be alphanumeric`;
    }
    return "";
  };
  
  export const validateName = (name: string): string  => {
      if (!name.trim()) return "Name is required.";
      const names = name.split(" ").filter((item) => item.trim() !== "");
      if(names.length < 2) return "Full Name is required.";
      return "";
    };
    
    export const validateEmail = (email: string): string => {
      if (!email.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
      return "";
    };
    
    export const validatePhoneNumber = (phone_number: string): string => {
      if (!phone_number.trim()) return "Phone Number is required.";
      if (!/^[1-9]\d{9,14}$/.test(phone_number)) return "Invalid Phone Number format.";
      return "";
    };

    export const validateLocationDetails = (name: string, location: string, lat: string, lng: string): string => {
  
    
      // Check if location (address) is provided
      if (!location.trim()) return `${name} is required.`;
    
      // Check if latitude and longitude are provided
      if (!lat.trim() || !lng.trim()) return "Invalid Location please choose from the map and try again.";
    
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
    
      // Validate latitude
      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return `Invalid ${name} please choose from the map and try again.`;
      }
    
      // Validate longitude
      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return `Invalid ${name} please choose from the map and try again.`;
      }
    
      return ""; // No errors
    };
    

    export const validateNumber = (value: number, max: number, name: string): string => {
      if (value === undefined || value === null || isNaN(value)) {
        return `${name} is required and must be a valid number.`;
      }
    
      if (value > max) {
        return `${name} cannot exceed ${max}.`;
      }
    
      return ""; // No errors
    };
    
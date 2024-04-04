export function setInsurancePartnerWebEngageAttribute(attribute, value) {
 
    if (window.webengage) {
      window.webengage.user.setAttribute(attribute, value);
    } else {
      console.error('WebEngage not initialized. Make sure the WebEngage script is loaded.');
    }
  }
  
  export function trackInsurancePartnerWebEngageEvent(event) {
    if (window.webengage) {
      window.webengage.track(event);
    } else {
      console.error('WebEngage not initialized. Make sure the WebEngage script is loaded.');
    }
  }


  export function insurancePartnerLogin(info) {
   
    if (window.webengage) {
      window.webengage.user.login(info);
    } else {
      console.error('WebEngage not initialized. Make sure the WebEngage script is loaded.');
    }
  }


  export function insurancePartnerLogout() {
    if (window.webengage) {
      window.webengage.user.logout("logged out");
    } else {
      console.error('WebEngage not initialized. Make sure the WebEngage script is loaded.');
    }
  }
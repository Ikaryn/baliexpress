import {brands} from '../../util/helpers' 

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    
    
  
    parse(message) {
      console.log(message)
      console.log(this.state);
      const lowerCaseMessage = message.toLowerCase();
      if(lowerCaseMessage.includes('general information')) {
        this.actionProvider.handleGeneralInfo();
      }
      
      if (lowerCaseMessage.includes("company")) {
        this.actionProvider.handleCompanyInfo();
      }
      
      if(lowerCaseMessage.includes("contact info")) {
        this.actionProvider.handleContactInfo();
      }
      
      if(lowerCaseMessage.includes("product")) {
        this.actionProvider.handleProductEntryPoint();
      }
      
      if(lowerCaseMessage.includes("returns")) {
        this.actionProvider.handleReturns();
      }
      console.log(brands);
      
      const found = brands.find(brand => lowerCaseMessage.includes(brand));
      if(found) {
        this.actionProvider.handleProductOptions(lowerCaseMessage);
      }
      
    }
}
  
export default MessageParser;
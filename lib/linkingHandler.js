import urlParse from 'url-parse';
import DecidimClient from "./DecidimClient";
import LanguageService from "./LanguageService";

export default (goToPetition, goToLogin) => event => {
    const { url } = event;
    console.log(`Received linking event: ${url}`);
    const urlObj = urlParse(url, true);
    // Try to interpret as petition signing request
    const { query: { decidimAPIUrl, petitionId } } = urlObj;
    if (decidimAPIUrl && petitionId) {
      const dddc = new DecidimClient(new LanguageService(), decidimAPIUrl);
      goToPetition(dddc, petitionId);
      return;
    }
    // Try to interpret as login request
    const { query: { action, callback, sessionId } } = urlObj;
    if (action === 'login') {
        console.log("Going to login", callback);
        goToLogin(callback, sessionId);
    }
};

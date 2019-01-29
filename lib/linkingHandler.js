import urlParse from 'url-parse';
import DecidimClient from "./DecidimClient";
import LanguageService from "./LanguageService";

export default goToPetition => event => {
    const { url } = event;
    console.log(`Received linking event: ${url}`);
    const myURL = urlParse(url, true);
    const { host, query: { decidimAPIUrl, petitionId } } = myURL;
    if (!host) return;
    const dddc = new DecidimClient(new LanguageService(), decidimAPIUrl);
    goToPetition(dddc, petitionId);
};

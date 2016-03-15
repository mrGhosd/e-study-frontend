export default class CountryService {
  constructor (ApiRequest) {
    this.ApiRequest = ApiRequest;
  }

  search(query) {
    const params = {object: "country", query: query};
    return this.ApiRequest.get('/search', params);
  }
}

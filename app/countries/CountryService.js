export default class CountryService {
  constructor (ApiRequest) {
    console.log(ApiRequest);
    this.ApiRequest = ApiRequest;
  }

  search(query) {
    const params = {object: "country", query: query};

    return this.ApiRequest.get('/search', params)
    .then((response) => {
      return response.data.search;
    });
  }
}

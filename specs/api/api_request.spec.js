describe('ApiRequest', function(){
    beforeEach(angular.mock.module('estudy'));

    var apiRequest = null;
    var httpBackend = null;

    beforeEach(inject(function(ApiRequest, $httpBackend){
        httpBackend = $httpBackend;
        apiRequest = ApiRequest;
    }));

    //beforeEach(function(){
    //    httpBackend.whenGET("tours/travels.html").respond(200);
    //});

    describe("Initial value", function(){
        it("check that service exists", function() {
            expect(apiRequest).not.toEqual(null);
        });
    });

    //describe('GET request', function(){
    //    it("make a get request", function(){
    //        httpBackend.expectGET("https://api.parse.com/1/classes/Tour").respond(200);
    //        apiRequest.get('/Tour');
    //        httpBackend.flush();
    //    });
    //});
    //
    //describe('POST request', function(){
    //    it("make a post request", function(){
    //        httpBackend.expectPOST("https://api.parse.com/1/classes/Tour").respond(200);
    //        apiRequest.post('/Tour');
    //        httpBackend.flush();
    //    });
    //});
    //
    //describe('PUT request', function(){
    //    it("make a put request", function(){
    //        var tour = {objectId: 1, name: "Ololo"};
    //        httpBackend.expectPUT("https://api.parse.com/1/classes/Tour/"+tour.objectId).respond(200);
    //        apiRequest.put('/Tour/'+tour.objectId);
    //        httpBackend.flush();
    //    });
    //});
});
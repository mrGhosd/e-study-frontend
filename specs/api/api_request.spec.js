describe('ApiRequest', function(){
    beforeEach(angular.mock.module('estudy'));

    var apiRequest = null;
    var httpBackend = null;
    var usersList = null;
    var createUser  = null;

    beforeEach(inject(function(ApiRequest, $httpBackend){
        httpBackend = $httpBackend;
        apiRequest = ApiRequest;
    }));

    beforeEach(function(){
       usersList = httpBackend.whenGET("http://localhost:3000/api/v0/users");
       createUser = httpBackend.whenPOST("http://localhost:3000/api/v0/users");
    });

    describe("Initial value", function(){
        it("check that service exists", function() {
            expect(apiRequest).not.toEqual(null);
        });
    });

    describe('GET request', function(){
       it("make a GET request", function(){
           var serverUsers = [];
           var users = [{id: 1, first_name: "Ololo"}, {id: 2, last_name: "Hui"}];
           usersList.respond(200, users);
           apiRequest.get('/users').then(function(response){
             serverUsers = response.data;
           });
           httpBackend.flush();
           expect(serverUsers).toEqual(users);
       });
    });

    describe('POST request', function(){
       it("make a post request", function(){
           var serverUser = {};
           var user = {id: 1, first_name: "hue"};
           createUser.respond(200, user);
           apiRequest.post('/users').then(function(response) {
             serverUser = response.data;
           });
           httpBackend.flush();
           expect(serverUser).toEqual(user);
       });
    });
    //
    describe('PUT request', function(){
       it("make a put request", function(){
           var serverUser = {};
           var user = {objectId: 1, name: "Ololo"};
           user.name = "Hui";
           httpBackend.whenPUT("http://localhost:3000/api/v0/users/"+user.objectId).respond(200);
           apiRequest.put('/users/'+user.objectId).then(function(response){
             serverUser = response;
           });
           httpBackend.flush();
           expect(serverUser).toEqual(user);
       });
    });
});

describe('Notification', function(){
    beforeEach(angular.mock.module('estudy'));

    var httpBackend = null;
    var notification = null;
    var modal = null;

    beforeEach(inject(function(Notification, $httpBackend, $modal) {
        httpBackend = $httpBackend;
        notification = Notification;
        modal = $modal;
        notification.modal = $modal;
        spyOn(modal, 'open').and.callThrough();
    }));

    describe("Initial value", function() {
        it("check that service exists", function() {
            expect(notification).not.toEqual(null);
        });

        it("check modal param value", function() {
          expect(notification.modal).not.toEqual(null);
        });

        it("check modal param value to eq bootstrap directive", function(){
          expect(notification.modal).toEqual(modal);
        });
    });

    describe("info", function() {
      it("called the 'open' method", function() {
        notification.info("Test");
        expect(modal.open).toHaveBeenCalled();
      });
    });

    describe("alert", function() {
      it("called the 'open' method", function() {
        notification.alert("Test");
        expect(modal.open).toHaveBeenCalled();
      });
    });
});

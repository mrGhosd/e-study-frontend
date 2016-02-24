import { signOut } from './sign_out';
import { onChangeStateError } from './change_state_error';
import { onStateChange } from './state_change';
import { onSignedIn } from './signed_in';
import { currentUser } from './current_user';

export default ($rootScope, AuthService, $location, $state, $modal,
      usSpinnerService, Notification, $cookies, WebSockets) => {

        onSignedIn($rootScope, $state);
        signOut($rootScope);
        onStateChange($rootScope, usSpinnerService);
        onChangeStateError($rootScope, $state, Notification);



    }
}

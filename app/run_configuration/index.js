import { onSignOut } from './sign_out';
import { onChangeStateError } from './change_state_error';
import { onStateChange } from './state_change';
import { onSignedIn } from './signed_in';
import { currentUser } from './current_user';

export default function($rootScope, AuthService, $location, $state, $modal,
      usSpinnerService, Notification, $cookies, WebSockets, PopupMessage) {
      currentUser($rootScope, WebSockets, PopupMessage, AuthService);
      onSignedIn($rootScope, $state);
      onSignOut($rootScope);
      onStateChange($rootScope, usSpinnerService);
      onChangeStateError($rootScope, $state, Notification);
}

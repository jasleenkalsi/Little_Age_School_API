
import admin from 'firebase-admin';
import { credential } from 'firebase-admin';

import * as serviceAccount from '../../little-age-school-api-firebase-adminsdk-fbsvc-4e300966db';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;

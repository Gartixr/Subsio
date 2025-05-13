import firebaseEnv from '../firebaseEnv.json';

export const environment = {
    production: false,
    firebaseConfig: {
      apiKey: firebaseEnv.apiKey,
      authDomain: firebaseEnv.authDomain,
      projectId: firebaseEnv.projectId,
      storageBucket: firebaseEnv.storageBucket,
      messagingSenderId: firebaseEnv.messagingSenderId,
      appId: firebaseEnv.appId,
    }
};

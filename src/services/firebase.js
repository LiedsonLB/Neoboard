import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBq3xpVSDXkqGWp7LAG_rsKxS_dGcbk0Y',
  authDomain: 'neoboardauth.firebaseapp.com',
  projectId: 'neoboardauth',
  storageBucket: 'neoboardauth.appspot.com',
  messagingSenderId: '630909474141',
  appId: '1:630909474141:web:9d5b2fd97d6def3424c4b4',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app as firebase };
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Aquí debes agregar la configuración de tu proyecto de Firebase
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  // ...agrega el resto de la configuración
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene el objeto 'auth' para la autenticación de usuarios
const auth = firebase.auth();

export { firebase, auth };

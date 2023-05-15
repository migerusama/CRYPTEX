import { IErrorMessages } from "./ierror-messages";

export const authErrorMessages: IErrorMessages = {
    // Mensajes de error para Firebase Auth
    'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.',
    'auth/invalid-email': 'La dirección de correo electrónico no es válida.',
    'auth/operation-not-allowed': 'El método de autenticación correspondiente a esta operación no está habilitado.',
    'auth/weak-password': 'La contraseña no es lo suficientemente fuerte.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/user-not-found': 'No se encontró una cuenta con la dirección de correo electrónico proporcionada.',
    'default': 'Ha ocurrido un error al procesar la solicitud.'
};
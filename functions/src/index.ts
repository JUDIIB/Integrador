import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/* export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
}); */

//Se ejecuta cuando se elimina el registro de un empleado
exports.deleteAllRecordsFromEmployee = functions.firestore
    .document(`empleados/{empleadoId}`)
    .onDelete(async (snapshot) => {
        const empleadoId = snapshot.id;
        //Se eliminan las vacaciones asociadas al empleado
        await admin
            .firestore().collection('vacaciones').where('empleado_id', '==', empleadoId).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    admin.firestore().collection('vacaciones').doc(doc.id).delete();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    })

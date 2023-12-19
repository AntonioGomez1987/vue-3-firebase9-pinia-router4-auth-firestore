import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getDoc,
    getDocs, 
    query, 
    updateDoc,
    where 
} from 'firebase/firestore/lite';
import {defineStore} from 'pinia';
import { db } from '../firebaseConfig';
import {auth} from '../firebaseConfig';
import { nanoid } from "nanoid"
import router from "../router"

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false,
    }),
    actions: {

        //Leer
        async getUrls(){
            // if(this.documents.length !== 0){
            //     return;
            // }
            this.loadingDoc = true
            try {
                const q = query(
                    collection(db, 'urls'), 
                    where("user", "==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
            } catch (error) {
                console.log(error);
            }finally {
                this.loadingDoc = false;
            }
        },

        //Leer un solo documento
        async leerUrl(id){
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if(!docSnap.exists()){
                    throw new Error("No existe el doc")
                }

                if(docSnap.data().user === auth.currentUser.uid){
                    throw new Error("No le pertenece ese documento")
                } else {
                    throw new Error("no eres el autor");
                }

            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false
            }
        },

        //Actualizar
        async updateUrl(id, name){
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if(!docSnap.exists()) {
                    throw new Error("no existe el documento");
                }

                if(docSnap.data().user === auth.currentUser.uid){
                    await updateDoc(docRef, {
                        name: name,
                    });
                    
                    router.push('/')
                } else {
                    throw new Error("no eres el autor");
                }
            } catch (error) {
                console.log(error.message);
            }finally {
                this.loadingDoc = false
            }
        },

        //Agregar
        async addUrls(name){
            this.loadingDoc = true
            try {
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            } catch (error) {
                console.log(error);
            }finally {
                this.loadingDoc = false
            }
        },

        //Eliminar
        async deleteUrl(id){
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);

                const docSnap = await getDoc(docRef)
                if(!docSnap.exists()){
                    throw new Error("No existe el doc")
                }

                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("No le pertenece ese documento")
                }

                await deleteDoc(docRef)
                this.documents = this.documents.filter(item =>item.id !== id)
            } catch (error) {
                console.log(error);
            }finally {
                this.loadingDoc = false;
            }
        }
    }
})
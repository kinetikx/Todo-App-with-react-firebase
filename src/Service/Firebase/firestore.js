// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {doc, setDoc, getDocs, collection, onSnapshot,getFirestore,query,deleteDoc} from "firebase/firestore";
import {useState, createContext, useEffect} from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "APİ_KEY",
    authDomain: "DOMAİN",
    projectId: "İD",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Get a list of cities from your database
export async function setTodo(baslik, icerik) {

  
    await setDoc(doc(db, baslik, icerik), {
        todo: icerik,
      });
}


export async function deleteTodo(icerik){
    await deleteDoc(doc(db, "Todolar", icerik));

}

export async function getTodo() {


}

//------------------------------------------------------------------------------------------------------------
// Our Header Context
export const TodoContext = createContext();


const TodoContextProvider = (props) => {
    const [notlar, setNotlar] = useState([])




    useEffect(() => {

        async function fetchData2() {
            const querySnapshot = await getDocs(collection(db, "Todolar"));
            const array =[]
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                array.push([doc.id,doc.data()])
            });
            console.log(array)
            setNotlar(array)
        }

        async function fetchData(){

            const q = query(collection(db, "Todolar"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todolar = [];
            querySnapshot.forEach((doc) => {
                todolar.push([doc.data().todo]);
            });
            setNotlar(todolar)

            });


        }
        fetchData()

    }, []);

    return (
        <TodoContext.Provider value={notlar}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;

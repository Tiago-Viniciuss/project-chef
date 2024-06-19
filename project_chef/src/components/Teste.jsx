import React, { useEffect, useState } from 'react'
import '../style/Home.css'


import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, orderBy, getDocs, query, where, getDoc, addDoc, updateDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDLeaVbkontIerNiMt_7SMiX8k3eMeS42o",
    authDomain: "projeto-empregos.firebaseapp.com",
    projectId: "projeto-empregos",
    storageBucket: "projeto-empregos.appspot.com",
    messagingSenderId: "640012785481",
    appId: "1:640012785481:web:8bd5e89d6ca63729666c98",
    measurementId: "G-H63RS9DHMF"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const Teste = () => {

    const [userData, setUserData] = useState('')

    const fetchUserData = async () => {
        const candidateEmail = localStorage.getItem('candidateEmail')

        try {
            const userDocRef = doc(db, 'Candidates Data', candidateEmail)
            const userDocSnap = await getDoc(userDocRef)

            if(userDocSnap.exists()) {
                setUserData(userDocSnap.data())
            } else {
                setUserData(null)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=> {
        fetchUserData()
    }, [db])

    const [candidateSex, setCandidateSex] = useState('masculino')

    const handleSex = (e) => {
        setCandidateSex(e.target.value)
    }

    const sendData = async (e) => {
        e.preventDefault()
        const candidateEmail = localStorage.getItem('candidateEmail')
        try {
            const userCollectionRef = collection(db, 'Candidates Data')

                updateDoc(doc(userCollectionRef, candidateEmail), {
                    candidateSex: candidateSex,
                })

        } catch (error) {
            
        }
    }

 
  return (
    <div id='testando'>
        <h1>Testando</h1>
        <p> {userData && userData.CandidateName} </p>
        <p> {userData && userData.CandidateEmail} </p>
              
       <form onSubmit={sendData}>
            <input type="text" id="candidateSex" value={candidateSex} onChange={handleSex}/>
            <button type='submit'>ENVIAR</button>
            </form>
           </div>
  )
}

export default Teste


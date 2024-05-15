import {React, useState} from 'react'
import '../style/ForgetCandidatePassword.css'
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, collection, setDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const firebaseConfig = {
    apiKey: "AIzaSyDLeaVbkontIerNiMt_7SMiX8k3eMeS42o",
    authDomain: "projeto-empregos.firebaseapp.com",
    projectId: "projeto-empregos",
    storageBucket: "projeto-empregos.appspot.com",
    messagingSenderId: "640012785481",
    appId: "1:640012785481:web:8bd5e89d6ca63729666c98",
    measurementId: "G-H63RS9DHMF"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const firestore = getFirestore(app);


const ForgetCandidatePassword = () => {

    const {t} = useTranslation()

    const navigate = useNavigate()

function navigateToCandidateProfile() {
  navigate('/candidate-profile-login')
}


const [candidateEmail, setCandidateEmail] = useState('')
    const [newCandidatePassword, SetNewCandidatePassword] = useState('')

    const handleCandidateEmail = (e) =>{
        setCandidateEmail(e.target.value)
    }

    const handleNewCandidatePassword = (e)=> {
        SetNewCandidatePassword(e.target.value)
    }



    const createNewCandidatePassword = async (e) => {
        e.preventDefault();
        try {
          const userDocRef = doc(db, 'Candidates Data', candidateEmail);
          const docSnap = await getDoc(userDocRef);
          const newPasswordForm = document.getElementById('createNewCandidatePassword')
          const validateEmailForm = document.getElementById('validateEmail')
      
          if (docSnap.exists()) {
            const userData = docSnap.data();
            newPasswordForm.style.display = 'flex'
            validateEmailForm.style.display = 'none'
          } else {
            console.log('Email não encontrado');
            alert(t("changePassword.alert1"))
            newPasswordForm.style.display = 'none'
          }
        } catch (error) {
          console.error('Erro ao buscar no Firestore:', error);
        }
      }
    
    
      const changeCandidatePassword = async (e) => {
        e.preventDefault();
      
        try {
          const userDocRef = doc(db, 'Candidates Data', candidateEmail);
          await updateDoc(userDocRef, {
            CandidatePassword: newCandidatePassword,
          });
      
          console.log('Senha atualizada com sucesso!');
          alert(t("changePassword.alert2"))
          navigateToCandidateProfile()
        } catch (error) {
          console.error('Erro ao atualizar a senha:', error);
        }
      };


  return (
    <div>
        <Header/>
        <section id='changeCandidatePassword'>
            <h1>
                {t("changePassword.candidateTitle")}
            </h1>
            <form id='validateEmail' onSubmit={createNewCandidatePassword}>
                <input type="email" name="validateCandidateEmail" id="validateCandidateEmail" className='form-control' placeholder={t("changePassword.placeholder1")} value={candidateEmail} onChange={handleCandidateEmail}/>
                <input type="submit" value={t("changePassword.submitButton")} className='form-control btn btn-dark'/>
                <button className='form-control btn btn-danger' onClick={navigateToCandidateProfile}>{t("changePassword.cancelButton")}</button>
            </form>
            <form id='createNewCandidatePassword' onSubmit={changeCandidatePassword}>
                <input type="password" name="newPassword" id="newPassword" className='form-control' placeholder={t("changePassword.placeholder2")} value={newCandidatePassword} onChange={handleNewCandidatePassword} autoComplete='current-password' required pattern="^(?=.*[a-z])(?=.*[0-9]).{8,}$"/>
                
                <input type="submit" value={t("changePassword.updateButton")} className='form-control btn btn-dark'/>
                <button className='form-control btn btn-danger' onClick={navigateToCandidateProfile}>{t("changePassword.cancelButton")}</button>
            </form>
        </section>
    </div>
  )
}

export default ForgetCandidatePassword
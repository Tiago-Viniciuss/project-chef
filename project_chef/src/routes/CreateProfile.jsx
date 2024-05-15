import React from 'react'
import { useState, useEffect} from 'react'
import '../style/CandidateProfile.css'
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const CreateProfile = () => {

  const {t} = useTranslation()

  const navigate = useNavigate();

  function navigateToCandidateProfileLogin() {
      navigate('/candidate-profile-login')
  }

    const [candidateName, setCandidateName] = useState('')
    const [candidateEmail, setCandidateEmail] = useState('')
    const [candidateBirthday, setCandidateBirthday] = useState('')
    const [candidateCity, setCandidateCity] = useState('')
    const [candidateSchool, setCandidateSchool] = useState('')
    const [candidateProfession, setCandidateProfession] = useState('')

    const [candidatePassword, setCandidatePassword] = useState('')

    const handleCandidateName = (e) => {
      setCandidateName(e.target.value)
    }
    const handleCandidateEmail = (e) => {
      setCandidateEmail(e.target.value)
    }
    const handleCandidateBirthday = (e) => {
      setCandidateBirthday(e.target.value)
    }
    const handleCandidateCity = (e) => {
      setCandidateCity(e.target.value)
    }
    const handleCandidateSchool = (e) => {
      setCandidateSchool(e.target.value)
    }
    const handleCandidateProfession = (e) => {
      setCandidateProfession(e.target.value)
    }
    const handleCandidatePassword = (e) => {
      setCandidatePassword(e.target.value)
    }

    const registerCandidate = async (e) => {
      e.preventDefault();
    
      try {
        const usersCollectionRef = collection(firestore, 'Candidates Data');
    
        await setDoc(doc(usersCollectionRef, candidateEmail), { 
          CandidateName: candidateName,
          CandidateEmail: candidateEmail,
          CandidateBirthday: candidateBirthday,
          CandidateCity: candidateCity,
          CandidateSchool: candidateSchool,
          CandidateProfession: candidateProfession,
          CandidatePassword: candidatePassword,
        });
    
        navigateToCandidateProfileLogin();
        setCandidateEmail(candidateEmail); 
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    };


  return (
    <div>
        <Header/>
        <h3 className='createAccountTitle'>{t("createCandidate.title")}</h3>
        <form id='formCreateAccount' onSubmit={registerCandidate}>
            <input className='form-control' type="text" name="userName" id="userName" placeholder={t("createCandidate.placeholder1")} required  autoComplete='userName' value={candidateName} onChange={handleCandidateName}/>

            <input className='form-control' type="email" name="userEmail" id="userEmail" placeholder={t("createCandidate.placeholder2")} autoComplete='userEmail' required value={candidateEmail} onChange={handleCandidateEmail}/>

            <input
            required
            type="number"
            name="candidateBirthday"
            id="candidateBirthday"
            className='form-control' placeholder={t("createCandidate.placeholder3")} min="1940" max="2024" value={candidateBirthday} onChange={handleCandidateBirthday}/>

            <input type="text" name="candidateCity" id="candidateCity" className='form-control' placeholder={t("createCandidate.placeholder4")} required value={candidateCity} onChange={handleCandidateCity}/>

            <select required name="candidateEducation" id="candidateEducation" className='form-control' value={candidateSchool} onChange={handleCandidateSchool}>
              <option value={t("createCandidate.label1")}>{t("createCandidate.label1")}</option>
              <option value={t("createCandidate.label2")}>{t("createCandidate.label2")}</option>
              <option value={t("createCandidate.label3")}>{t("createCandidate.label3")}</option>
              <option value={t("createCandidate.label4")}>{t("createCandidate.label4")}</option>
              <option value={t("createCandidate.label5")}>{t("createCandidate.label5")}</option>
            </select>

            <input type="text" name="candidateProfession" id="candidateProfession" required placeholder={t("createCandidate.placeholder5")} className='form-control' value={candidateProfession} onChange={handleCandidateProfession}/>

            <input className='form-control' type="password" name="userPassword" id="userPassword" placeholder={t("createCandidate.placeholder6")} autoComplete='current-password' required pattern="^(?=.*[a-z])(?=.*[0-9]).{8,}$"
             title="A senha deve conter letras minúsculas, números e no mínimo 8 caracteres" value={candidatePassword} onChange={handleCandidatePassword}/>

            <button className='btn btn-dark' type="submit" value="Criar Conta">{t("createCandidate.submitButton")}</button>
            
        </form>
    </div>
  )
}

export default CreateProfile

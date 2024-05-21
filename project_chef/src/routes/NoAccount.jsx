import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../style/CandidateProfile.css'
import Header from '../components/Header'
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer'
import {Trans, useTranslation} from 'react-i18next'


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

const NoAccount = () => {

    const { id } = useParams();

  const {t} = useTranslation()

  const navigate = useNavigate();
    
  useEffect(() => {
    const storedEmail = localStorage.getItem('candidateEmail');
    if (storedEmail) {
      // Se o e-mail estiver armazenado, redirecione para a página Job Apply com os dados da vaga
      navigate(`/job-apply/${id}`);
    }
  }, [id, navigate]);
    
      

  return (
    <div id='candidateProfileLoginContainer'>
      <Header/>
        <h3 className='loginProfileTitle'>
            {t("profileLogin.titleCandidate")}
        </h3>
        <Link to="/create-profile">
            <p className='createAccount'>{t("profileLogin.createAccount")}</p>
        </Link>
        <Link to={'/forget-candidate-password'}>
          <p className='forgetPassword'>{t("profileLogin.forgetPassword")}</p>
        </Link>
    </div>
  )
}

export default NoAccount
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import '../style/CandidateProfile.css'
import Header from '../components/Header'
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer'
import {Trans, useTranslation} from 'react-i18next'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const CandidateProfileLogin = () => {

  const {t} = useTranslation()

  const navigate = useNavigate();

  function navigateCandidateProfile() {
      navigate('/candidate-profile')
  }

    const [candidateEmail, setCandidateEmail] = useState('')
    
    const [candidatePassword, setCandidatePassword] = useState('')

    const handleCandidateEmail = (e) => {
        setCandidateEmail(e.target.value)
      }

      const handleCandidatePassword = (e) => {
        setCandidatePassword(e.target.value)
      }

      const loginCandidate = async (e) => {
        e.preventDefault();
        try {
          const userDocRef = doc(db, 'Candidates Data', candidateEmail);
          const docSnap = await getDoc(userDocRef);
      
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Verifica se a senha digitada corresponde à senha armazenada no Firebase
            if (userData.CandidatePassword === candidatePassword && userData.CandidateEmail === candidateEmail) {
              // Se as credenciais estiverem corretas, redirecione para a página principal da empresa
              // Por exemplo, você pode usar o React Router para fazer isso
              navigateCandidateProfile()
              localStorage.setItem('candidateEmail', candidateEmail)
            } else {
              // Senha incorreta, exibir mensagem de erro ou realizar outra ação
              console.log('Senha incorreta');
            }
          } else {
            // Usuário não encontrado, exibir mensagem de erro ou realizar outra ação
            console.log('Usuário não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar no Firestore:', error);
        }
      }
    
      useEffect(() => {
        const storedEmail = localStorage.getItem('candidateEmail');
        if (storedEmail) {
          navigate('/candidate-profile');
        } 
      }, []);
    
      const loginWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
      
          // Aqui você pode salvar os detalhes do usuário no Firestore ou usar como necessário
          console.log(user);
          localStorage.setItem('candidateEmail', user.email);
          navigateCandidateProfile();
        } catch (error) {
          console.error('Erro ao fazer login com Google:', error);
        }
      };

  return (
    <div id='candidateProfileLoginContainer'>
      <Header/>
        <h3 className='loginProfileTitle'>
            {t("profileLogin.titleCandidate")}
        </h3>
        <form onSubmit={loginCandidate} id='formCandidateProfile'>
            <input className='form-control' type="email" name="candidateEmail" id="candidateEmail" placeholder={t("profileLogin.placeholder1")} value={candidateEmail} onChange={handleCandidateEmail} autoComplete='candidateEmail'/>
            <input className='form-control' type="password" value={candidatePassword} name="candidatePassword" id="candidatePassword" placeholder={t("profileLogin.placeholder2")} autoComplete='current-password'  onChange={handleCandidatePassword} />
            <input className='btn btn-dark' type="submit" value={t("profileLogin.submitButton")} />
             
        </form>
        <Link to="/create-profile">
            <p className='createAccount'>{t("profileLogin.createAccount")}</p>
        </Link>
        <Link to={'/forget-candidate-password'}>
          <p className='forgetPassword'>{t("profileLogin.forgetPassword")}</p>
        </Link>
        <button onClick={loginWithGoogle} className='btn btn-dark'>Login with Google</button>
    </div>
  )
}

export default CandidateProfileLogin
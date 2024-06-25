import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/FormsStandard.css';
import Header from '../components/Header';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const navigateCandidateProfile = () => {
    navigate('/candidate-profile');
  };

  const navigateCreateAccount = () => {
    navigate('/create-profile')
  }

  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePassword, setCandidatePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCandidateEmail = (e) => {
    setCandidateEmail(e.target.value);
  };

  const handleCandidatePassword = (e) => {
    setCandidatePassword(e.target.value);
  };

  const loginCandidate = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'Candidates Data', candidateEmail);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.CandidatePassword === candidatePassword && userData.CandidateEmail === candidateEmail) {
          navigateCandidateProfile();
          localStorage.setItem('candidateEmail', candidateEmail);
        } else {
          console.log('Senha incorreta');
          setErrorMessage(t('profileLogin.wrongPassword'));
        }
      } else {
        console.log('Usuário não encontrado');
        setErrorMessage(t('profileLogin.userNotFound'));
      }
    } catch (error) {
      console.error('Erro ao buscar no Firestore:', error);
    }
  };

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

      const userDocRef = doc(db, 'Candidates Data', user.email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        localStorage.setItem('candidateEmail', user.email);
        navigateCandidateProfile();
      } else {
        console.log('Usuário não encontrado no Firebase');
        setErrorMessage(t('profileLogin.googleUserNotFound'));
        navigateCreateAccount()
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      setErrorMessage(t('profileLogin.googleLoginError'));
    }
  };

  return (
    <div>
      <Link to={'/'} className='homeButton'>
        <span className='material-symbols-outlined'>backspace</span>
      </Link>
      <h3>{t('profileLogin.titleCandidate')}</h3>
      <form onSubmit={loginCandidate} className='loginFormContainer'>
        <input
          className='form-control'
          type='email'
          name='candidateEmail'
          id='candidateEmail'
          placeholder={t('profileLogin.placeholder1')}
          value={candidateEmail}
          onChange={handleCandidateEmail}
          autoComplete='candidateEmail'
        />
        <input
          className='form-control'
          type='password'
          value={candidatePassword}
          name='candidatePassword'
          id='candidatePassword'
          placeholder={t('profileLogin.placeholder2')}
          autoComplete='current-password'
          onChange={handleCandidatePassword}
        />
        <input className='btn btn-dark form-control' type='submit' value={t('profileLogin.submitButton')} />
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <Link to='/create-profile'>
        <p className='createAccount'>{t('profileLogin.createAccount')}</p>
      </Link>
      <Link to={'/forget-candidate-password'}>
        <p className='forgetPassword'>{t('profileLogin.forgetPassword')}</p>
      </Link>
      <button onClick={loginWithGoogle} className='btn loginGoogle'></button>
    </div>
  );
};

export default CandidateProfileLogin;

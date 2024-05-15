import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom'
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

const CompanyProfileLogin = () => {

  const {t} = useTranslation()

  const navigate = useNavigate();

  function navigateCompanyProfile() {
      navigate('/company-profile')
  }

  

  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');


  const handleCompanyEmail = (e) => {
    setCompanyEmail(e.target.value);
  };

  const handleCompanyPassword = (e) => {
    setCompanyPassword(e.target.value);
  };

  const loginCompany = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'Companies Data', companyEmail);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Verifica se a senha digitada corresponde à senha armazenada no Firebase
        if (userData.CompanyPassword === companyPassword && userData.CompanyEmail === companyEmail) {
          // Se as credenciais estiverem corretas, redirecione para a página principal da empresa
          // Por exemplo, você pode usar o React Router para fazer isso
          navigateCompanyProfile()
          localStorage.setItem('companyEmail', companyEmail)
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
    const storedEmail = localStorage.getItem('companyEmail');
    if (storedEmail) {
      navigate('/company-profile');
    }
  }, []);

  return (
    <div>
      <Header/>
      <h3 className='loginProfileTitle'>{t("profileLogin.titleCompany")}</h3>
      <form onSubmit={loginCompany} id='formCompanyProfile'>
        <input
          className='form-control'
          type='email'
          name='companyEmail'
          id='companyEmail'
          placeholder={t("profileLogin.placeholder1")}
          onChange={handleCompanyEmail}
          value={companyEmail}
          autoComplete='companyEmail'
        />
        <input
          className='form-control'
          type='password'
          name='companyPassword'
          id='companyPassword'
          placeholder={t("profileLogin.placeholder2")}
          autoComplete='current-password'
          value={companyPassword}
          onChange={handleCompanyPassword}
        />
        <input className='btn btn-dark' type='submit' value={t("profileLogin.submitButton")} />
      </form>
      <Link to='/create-company-profile'>
        <p className='createAccount'>{t("profileLogin.createAccount")}</p>
      </Link>
      <Link to={'/forget-company-password'}>
        <p className='forgetPassword'>{t("profileLogin.forgetPassword")}</p>
      </Link>
    </div>
  );
};

export default CompanyProfileLogin;

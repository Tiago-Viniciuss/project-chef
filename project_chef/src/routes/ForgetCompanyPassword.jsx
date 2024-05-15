import React, { useState } from 'react'
import '../style/ForgetPassword.css'
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

const ForgetCompanyPassword = () => {

  const {t} = useTranslation()

    const [companyEmail, setCompanyEmail] = useState('')
    const [newCompanyPassword, SetNewCompanyPassword] = useState('')

    const handleCompanyEmail = (e) =>{
        setCompanyEmail(e.target.value)
    }

    const handleNewCompanyPassword = (e)=> {
        SetNewCompanyPassword(e.target.value)
    }

    const navigate = useNavigate()


    function navigateToCompanyProfile() {
        navigate('/company-profile-login')
    }


const createNewPassword = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'Companies Data', companyEmail);
      const docSnap = await getDoc(userDocRef);
      const newPasswordForm = document.getElementById('createNewPassword')
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


  const changeCompanyPassword = async (e) => {
    e.preventDefault();
  
    try {
      const userDocRef = doc(db, 'Companies Data', companyEmail);
      await updateDoc(userDocRef, {
        CompanyPassword: newCompanyPassword,
      });
  
      console.log('Senha atualizada com sucesso!');
      alert(t("changePassword.alert2"))
      navigateToCompanyProfile()
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
    }
  };


  return (
    <div>
      <Header/>
        <section id='changeCompanyPassword'>
            <h1>
            {t("changePassword.companyTitle")}
            </h1>
            <form id='validateEmail' onSubmit={createNewPassword}>
                <input type="email" name="validateCompanyEmail" id="validateCompanyEmail" className='form-control'  placeholder={t("changePassword.placeholder1")} value={companyEmail} onChange={handleCompanyEmail}/>
                <input type="submit" value={t("changePassword.submitButton")}  className='form-control btn btn-dark'/>
                <button className='form-control btn btn-danger' onClick={navigateToCompanyProfile}>{t("changePassword.cancelButton")}</button>
            </form>
            <form id='createNewPassword' onSubmit={changeCompanyPassword}>
                <input type="password" name="newPassword" id="newPassword" className='form-control'  placeholder={t("changePassword.placeholder2")} value={newCompanyPassword} onChange={handleNewCompanyPassword} autoComplete='current-password' required pattern="^(?=.*[a-z])(?=.*[0-9]).{8,}$"/>
                
                <input type="submit" value={t("changePassword.updateButton")}className='form-control btn btn-dark'/>
                <button className='form-control btn btn-danger' onClick={navigateToCompanyProfile}>{t("changePassword.cancelButton")}</button>
            </form>
        </section>
    </div>
  )
}

export default ForgetCompanyPassword
import React from 'react'
import { useState } from 'react'
import '../style/CompanyProfile.css'
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

const CreateCompanyProfile = () => {

  const {t} = useTranslation()

  const navigate = useNavigate();

  function navigateToCompanyProfileLogin() {
      navigate('/company-profile-login')
  }

    const [companyTitle, setCompanyTitle] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyCategory, setCompanyCategory] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')
    const [companyPassword, setCompanyPassword] = useState('')

    const handleCompanyTitle = (e) => {
      setCompanyTitle(e.target.value)
    }
    const handleCompanyEmail = (e) => {
      setCompanyEmail(e.target.value)
    }
    const handleCompanyCategory = (e) => {
      setCompanyCategory(e.target.value)
    }
    const handleCompanyDescription = (e) => {
      setCompanyDescription(e.target.value)
    }
    const handleCompanyPassword = (e) => {
      setCompanyPassword(e.target.value)
    }



    const registerCompany = async (e) => {
      e.preventDefault();
    
      try {
        const usersCollectionRef = collection(firestore, 'Companies Data');
    
        await setDoc(doc(usersCollectionRef, companyEmail), { 
          CompanyTitle: companyTitle,
          CompanyEmail: companyEmail,
          CompanyCategory: companyCategory,
          CompanyDescription: companyDescription,
          CompanyPassword: companyPassword,
        });
    
        navigateToCompanyProfileLogin();
        // Após registrar a empresa, atualize companyEmail com o e-mail inserido
        setCompanyEmail(companyEmail); // ou qualquer outra maneira que você esteja usando para obter o e-mail da empresa
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    };

  return (
    <div id='createCompanyAccountContainer'>
      <Header/>
        <h3 className='createCompanyAccountTitle'>{t("createCompany.title")}</h3>
        <form id='createCompanyAccount' onSubmit={registerCompany}>
            <input className='form-control' type="text" name="companyName" id="companyTitle" placeholder={t("createCompany.placeholder1")} required  autoComplete='companyName' value={companyTitle} onChange={handleCompanyTitle}/>

            <input className='form-control' type="email" name="companyEmail" id="companyEmail" placeholder={t("createCompany.placeholder2")} autoComplete='companyEmail' required value={companyEmail} onChange={handleCompanyEmail}/>

          <div id='categoryContainer'>
            <select name="chooseCategory" id="chooseCompanyCategory" className='form-control' value={companyCategory} onChange={handleCompanyCategory}>
            <option value="" disabled>-- {t("companyProfile.branch1")} --</option>
              <option value={t("companyProfile.branch2")}>{t("companyProfile.branch2")}</option>
              <option value={t("companyProfile.branch3")}>{t("companyProfile.branch3")}</option>
              <option value={t("companyProfile.branch4")}>{t("companyProfile.branch4")}</option>
              <option value={t("companyProfile.branch5")}>{t("companyProfile.branch5")}</option>
              <option value={t("companyProfile.branch6")}>{t("companyProfile.branch6")}</option>
              <option value={t("companyProfile.branch7")}>{t("companyProfile.branch7")}</option>
              <option value={t("companyProfile.branch8")}>{t("companyProfile.branch8")}</option>
              <option value={t("companyProfile.branch9")}>{t("companyProfile.branch9")}</option>
              <option value={t("companyProfile.branch10")}>{t("companyProfile.branch10")}</option>
              <option value={t("companyProfile.branch11")}>{t("companyProfile.branch11")}</option>
              <option value={t("companyProfile.branch12")}>{t("companyProfile.branch12")}</option>
              <option value={t("companyProfile.branch13")}>{t("companyProfile.branch13")}</option>
              <option value={t("companyProfile.branch14")}>{t("companyProfile.branch14")}</option>
              <option value={t("companyProfile.branch15")}>{t("companyProfile.branch15")}</option>
              <option value={t("companyProfile.branch16")}>{t("companyProfile.branch16")}</option>
              <option value={t("companyProfile.branch17")}>{t("companyProfile.branch17")}</option>
              <option value={t("companyProfile.branch18")}>{t("companyProfile.branch18")}</option>
              <option value={t("companyProfile.branch19")}>{t("companyProfile.branch19")}</option>
              <option value={t("companyProfile.branch20")}>{t("companyProfile.branch20")}</option>
              <option value={t("companyProfile.branch21")}>{t("companyProfile.branch21")}</option>
          </select>
          </div>
            <textarea id='companyDescription' name="description" cols="45" rows="15" className='form-control' placeholder={t("createCompany.placeholder3")} value={companyDescription} onChange={handleCompanyDescription}></textarea>
          <input className='form-control' type="password" name="companyPassword" id="companyPassword" placeholder={t("createCompany.placeholder4")} autoComplete='current-password' required pattern="^(?=.*[a-z])(?=.*[0-9]).{8,}$"
             title="A senha deve conter letras minúsculas, números e no mínimo 8 caracteres" value={companyPassword} onChange={handleCompanyPassword}/>

            <input className='btn btn-dark' type="submit" value={t("createCompany.submitButton")} />
            
        </form>
    </div>
  )
}

export default CreateCompanyProfile

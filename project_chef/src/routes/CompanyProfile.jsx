import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CompanyOptionsBar from '../components/CompanyOptionsBar';
import CompanyPostedJobs from '../routes/CompanyPostedJobs'
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

const CompanyProfile = () => {

  const {t} = useTranslation()

  const [workPlaceSelected, setWorkPlaceSelected] = useState('')

  const handleWorkPlaceChange = (event) => {

    setWorkPlaceSelected(event.target.value)
  }

  const [jobTypeSelected, setJobTypeSelected] = useState('')

  const handleJobTypeChange = (event) => {

    setJobTypeSelected(event.target.value)
  }
 
  const [adCity, setAdCity] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [jobType, setJobType] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [chooseCategory, setChooseCategory] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [jobTypeDescription, setJobTypeDescription] = useState('')
  const [jobSalary, setJobSalary] = useState('')
  const [userData, setUserData] = useState(null);

  const handleSmallDescriptionChange = (event) => {
    const { value } = event.target;
    if (value.length <= 200) { 
      setSmallDescription(value);
    }
  };

  useEffect(() => {
    const companyEmail = localStorage.getItem('companyEmail');
    
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, 'Companies Data', companyEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Erro ao buscar no Firestore:', error);
      }
    };
    fetchData();
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('pt-PT');
    const companyEmail = localStorage.getItem('companyEmail');
    const form = document.getElementById('createAd')
    const formData = { adTitle, companyName, chooseCategory, adCity, workPlaceSelected, jobTypeSelected, description, profile, jobTypeDescription, jobSalary, smallDescription,
      CreationDate: currentDate , companyEmail: companyEmail};
    try {
      await addDoc(collection(db, 'Vagas'), formData);
      setAdTitle('');
      setCompanyName('');
      setChooseCategory('');
      setAdCity('');
      setWorkPlace('');
      setJobType('');
      setDescription('');
      setProfile('');
      setJobTypeDescription('');
      setJobSalary('');
      setSmallDescription('');
      alert(t("alerts.adPostSuccessfully"));
    } catch (error) {
      console.error('Erro ao adicionar vaga de emprego:', error);
    }
    handleSubmit()
  };

  const navigate = useNavigate();

  function navigateToHome() {
      navigate('/')
  }

  function leaveProfile() {
    localStorage.removeItem('companyEmail') 
    navigateToHome()   
  }

  return (
    <div>
      <Header />
      <CompanyOptionsBar/>
      <section id='companyProfileInfo'>
        <img id="companyProfilePicture" src='/public/images/person.png' alt="" />
        <hr />
        <h1 id='companyTitle'>{userData && userData.CompanyTitle}</h1>
        <h3 id='companyCategory'>{userData && userData.CompanyCategory}</h3>
        <hr />
        <p id='companyDescription'>
          <strong>{userData && userData.CompanyDescription}</strong> <br />
        </p>
        <hr />
        <button className='btn btn-dark form-control' onClick={leaveProfile}>{t("companyProfile.logoutButton")}</button>
      </section>

      <section id='createJobs'>
        <form className='form-control' id='createAd' onSubmit={handleSubmit}>
          <h1 className='criarAnuncioTitulo'>{t("companyProfile.createAdTitle")}</h1>
          <div>
            <label htmlFor="adTitle">{t("companyProfile.label1")}</label> <br />
            <input type="text" className='form-control' name="adTitle" id="adTitle" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} required placeholder={t("companyProfile.placeholder1")}/>
          </div>
          <div>
            <label htmlFor="companyName">{t("companyProfile.label2")}</label> <br />
            <input type="text" className='form-control' name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder={t("companyProfile.placeholder2")}/>
          </div>
          <div>
            <label htmlFor="chooseCategory">{t("companyProfile.label3")}</label> <br />
            <select name="chooseCategory" id="chooseCategory" className='form-control' value={chooseCategory} onChange={(e) => setChooseCategory(e.target.value)} required>
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
          <div>
            <label htmlFor="adCity">{t("companyProfile.label4")}</label> <br />
            <select name="adCity" id="adCity" className='form-control' value={adCity} onChange={(e) => setAdCity(e.target.value)} required>
              <optgroup>
              <option value="" disabled>-- {t("companyProfile.chooseLocation")} --</option>
              <option value="Albufeira">{t("companyProfile.location1")}</option>
              <option value="Almada">{t("companyProfile.location2")}</option>
              <option value="Aveiro">{t("companyProfile.location3")}</option>
              <option value="Braga">{t("companyProfile.location4")}</option>
              <option value="Coimbra">{t("companyProfile.location5")}</option>
              <option value="Évora">{t("companyProfile.location6")}</option>
              <option value="Faro">{t("companyProfile.location7")}</option>
              <option value="Guimarães">{t("companyProfile.location8")}</option>
              <option value="Lisboa">{t("companyProfile.location9")}</option>
              <option value="Porto">{t("companyProfile.location10")}</option>

              </optgroup>
            </select>
          </div>
          <div>
      <label htmlFor="smallDescription">{t("companyProfile.label5")}</label>
      <textarea
        id="smallDescription"
        name="smallDescription"
        cols="45"
        rows="7"
        className="form-control"
        value={smallDescription}
        placeholder={t("companyProfile.placeholder3")}
        onChange={handleSmallDescriptionChange}
        maxLength={100} // Defina o limite de caracteres desejado aqui
        required
      ></textarea>
      <p>{t("companyProfile.charactersRemaining")}: {100 - smallDescription.length}</p> {/* Exibe o número de caracteres restantes */}
    </div>
          <div>
            <legend>{t("companyProfile.label6")}</legend>
            <fieldset id='workPlace' className='form-control'>
                        <label>
            <input
              type="checkbox"
              name="category"
              value="on-site"
              checked={workPlaceSelected === "on-site"}
              onChange={handleWorkPlaceChange}
            />
            {t("companyProfile.workPlace1")}
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="remote"
              checked={workPlaceSelected === "remote"}
              onChange={handleWorkPlaceChange}
            />
            {t("companyProfile.workPlace2")}
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="hybrid"
              checked={workPlaceSelected === "hybrid"}
              onChange={handleWorkPlaceChange}
            />
            {t("companyProfile.workPlace3")}
          </label>
            </fieldset>
          </div>
          <div>
            <legend>{t("companyProfile.label7")}</legend>
            <fieldset id='jobsType' className='form-control'>
            <label>
                        <input type="checkbox" name="type" value="Full-Time" checked={jobTypeSelected === 'Full-Time'} onChange={handleJobTypeChange}/> Full-Time
                        </label>
                        <label>
                        <input type="checkbox" name="type" value="Part-Time" checked={jobTypeSelected === 'Part-Time'} onChange={handleJobTypeChange}/> Part-Time
                        </label>
                        <label>
                        <input type="checkbox" name="type" value="Estágio" checked={jobTypeSelected === "Internship"} onChange={handleJobTypeChange}/> {t("companyProfile.workLoad3")}
                        </label>
            </fieldset>
          </div>
          <div>
            <label htmlFor="description">{t("companyProfile.label8")}</label>
            <textarea id='description' name="description" cols="45" rows="15" className='form-control' placeholder={t("companyProfile.placeholder4")} value={description} onChange={(e) => setDescription(e.target.value)}required></textarea>
          </div>
          <div>
            <label htmlFor="profile">{t("companyProfile.label9")}</label>
            <textarea id='profile' name="profile" cols="45" rows="15" className='form-control' placeholder={t("companyProfile.placeholder5")} value={profile} onChange={(e) => setProfile(e.target.value)}required></textarea>
          </div>
          <div>
            <label htmlFor="jobTypeDescription">{t("companyProfile.label10")}</label>
            <textarea id='jobTypeDescription' name="jobTypeDescription" cols="45" rows="8" className='form-control' placeholder={t("companyProfile.placeholder6")} value={jobTypeDescription} onChange={(e) => setJobTypeDescription(e.target.value)}required></textarea>
          </div>
          <div>
            <label htmlFor="jobSalary">{t("companyProfile.label11")}</label> <br />
            <select name="jobSalary" id="jobSalary" className='form-control' value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} required>
              <optgroup>
              <option value="" disabled>-- {t("companyProfile.chooseSalary")} --</option>
              <option value={t("companyProfile.salary1")}>{t("companyProfile.salary1")}</option>
              <option value={t("companyProfile.salary2")}>{t("companyProfile.salary2")}</option>
              <option value={t("companyProfile.salary3")}>{t("companyProfile.salary3")}</option>
              <option value={t("companyProfile.salary4")}>{t("companyProfile.salary4")}</option>
              <option value={t("companyProfile.salary5")}>{t("companyProfile.salary5")}</option>
              <option value={t("companyProfile.salary6")}>{t("companyProfile.salary6")}</option>
              <option value={t("companyProfile.salary7")}>{t("companyProfile.salary7")}</option>
              <option value={t("companyProfile.salary8")}>{t("companyProfile.salary8")}</option>
              <option value={t("companyProfile.salary9")}>{t("companyProfile.salary9")}</option>
              </optgroup>
            </select>
          </div>
          <input type="submit" value={t("companyProfile.publishButton")} className='btn btn-dark form-control'/>
        </form>
      </section>
      <section id='myPostedJobs'>
        <CompanyPostedJobs/>
      </section>
      <Footer/>
    </div>
  );
};

export default CompanyProfile;


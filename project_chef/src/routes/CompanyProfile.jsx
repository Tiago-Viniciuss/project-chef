import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Appliers from '../components/Appliers';
import CompanyOptionsBar from '../components/CompanyOptionsBar';
import CompanyPostedJobs from '../routes/CompanyPostedJobs';
import { useTranslation } from 'react-i18next';
import { Timestamp } from 'firebase/firestore';

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
const storage = getStorage(app);

const CompanyProfile = () => {
  const { t } = useTranslation();

  const [workPlaceSelected, setWorkPlaceSelected] = useState('');
  const handleWorkPlaceChange = (event) => {
    setWorkPlaceSelected(event.target.value);
  };


  const [jobTypeSelected, setJobTypeSelected] = useState('');
  const handleJobTypeChange = (event) => {
    setJobTypeSelected(event.target.value);
  };

  const [adCity, setAdCity] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [jobType, setJobType] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [chooseCategory, setChooseCategory] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [jobTypeDescription, setJobTypeDescription] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [userData, setUserData] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [descriptionn, setDescriptionn] = useState('');
  const [numApplications, setNumApplications] = useState(0);
  const [applyLimit, setApplyLimit ] = useState(20)

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionn(e.target.value);
  };

  const handleApplyLimit = (e) => {
    setApplyLimit(e.target.value)
  }

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  const uploadCompanyData = async (e) => {
    e.preventDefault();
    const companyEmail = localStorage.getItem('companyEmail');
    const userDocRef = doc(db, 'Companies Data', companyEmail);

    try {
      await updateDoc(userDocRef, {
        CompanyTitle: title,
        CompanyCategory: category,
        CompanyDescription: descriptionn
      });
      alert('Dados Atualizados!');
    } catch (error) {
      alert('Ihhhhh...');
    }
  };

  useEffect(() => {
    const companyEmail = localStorage.getItem('companyEmail');

    const fetchData = async () => {
      try {
        const userDocRef = doc(db, 'Companies Data', companyEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData(data);
          setTitle(data.CompanyTitle);
          setCategory(data.CompanyCategory);
          setDescriptionn(data.CompanyDescription);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Erro ao buscar no Firestore:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = Timestamp.now();
    const companyEmail = localStorage.getItem('companyEmail');
    const keywords = adTitle.toLowerCase().split(' ');
    const sectorKeywords = chooseCategory.split(' ');

    const formData = {
      adTitle,
      adTitleNormalized: adTitle.toLowerCase(),
      keywords: keywords,
      chooseCategoryKeywords: sectorKeywords,
      companyName,
      chooseCategory,
      adCity,
      workPlaceSelected,
      description,
      profile,
      jobTypeDescription,
      jobTypeSelected,
      jobSalary,
      smallDescription,
      CreationDate: currentDate,
      companyEmail: companyEmail,
      numApplications,
      applyLimit: applyLimit
    };

    if (photoFile) {
      const photoRef = ref(storage, `photos/${companyEmail}-${photoFile.name}`);
      const uploadTask = uploadBytesResumable(photoRef, photoFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          console.error('Erro ao carregar a foto:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(photoRef);
          formData.PhotoURL = downloadURL;

          try {
            await addDoc(collection(db, 'Vagas'), formData);
            setAdTitle('');
            setCompanyName('');
            setChooseCategory('');
            setAdCity('');
            setWorkPlace('');
            setDescription('');
            setProfile('');
            setJobTypeDescription('');
            setJobTypeSelected('');
            setJobSalary('');
            setSmallDescription('');
            setPhotoFile(null);
            setApplyLimit('')
            alert(t("alerts.adPostSuccessfully"));
          } catch (error) {
            console.error('Erro ao adicionar vaga de emprego:', error);
          }
        }
      );
    } else {
      try {
        await addDoc(collection(db, 'Vagas'), formData);
        setAdTitle('');
        setCompanyName('');
        setChooseCategory('');
        setAdCity('');
        setWorkPlace('');
        setDescription('');
        setProfile('');
        setJobTypeDescription('');
        setJobTypeSelected('');
        setJobSalary('');
        setSmallDescription('');
        setPhotoFile(null);
        alert(t("alerts.adPostSuccessfully"));
      } catch (error) {
        console.error('Erro ao adicionar vaga de emprego:', error);
      }
    }
  };

  const navigate = useNavigate();

  function navigateToHome() {
    navigate('/');
  }

  function leaveProfile() {
    localStorage.removeItem('companyEmail');
    navigateToHome();
  }

  return (
    <div>
      <Header />
      <CompanyOptionsBar />
      <section id='companyProfileInfo'>
        <h1>Olá, {userData && userData.CompanyTitle}!</h1>
        <div className='companyProfilePicture'></div>
        <form onSubmit={uploadCompanyData} id='companyData'>
          <input type="text" name="title" id="title" onChange={handleTitle} value={title} />
          <input type="text" name="category" id="category" onChange={handleCategory} placeholder={userData && userData.CompanyCategory} value={category} />
          <input type="text" name="description" id="description" onChange={handleDescription} value={descriptionn} />
          <button className='btn btn-dark form-control' type='submit'>Upload Info</button>
        </form>
        <button className='material-symbols-outlined' onClick={leaveProfile} id='logoutCompany'>logout</button>
      </section>
      <section id='createJobs'>
        <form className='form-control' id='createAd' onSubmit={handleSubmit}>
          <h1 className='criarAnuncioTitulo'>{t("companyProfile.createAdTitle")}</h1>

          <div id='container1'>
            <section>
              <label htmlFor="companyPicture" className="material-symbols-outlined" id='insertPicture'>add_a_photo</label>   
              {photoPreview && <img id="profilePicture" src={photoPreview} alt="Preview" />}
              <input type="file" name="companyPicture" id="companyPicture" onChange={handlePhotoChange}/>
            </section>
            <section className='companyBasicInfo'>
              <label htmlFor="adTitle">{t("companyProfile.label1")}</label> <br />
              <input type="text" className='form-control' name="adTitle" id="adTitle" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} required placeholder={t("companyProfile.placeholder1")} />
              <label htmlFor="companyName">{t("companyProfile.label2")}</label> <br />
              <input type="text" className='form-control' name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder={t("companyProfile.placeholder2")} />
              <label htmlFor="chooseCategory">{t("companyProfile.label3")}</label> <br />
              <select name="chooseCategory" id="chooseCategory" className='form-control' value={chooseCategory} onChange={(e) => setChooseCategory(e.target.value)} required>
                <option value="" disabled>-- {t("companyProfile.branch1")} --</option>
                <option value='Cozinha Kitchen'>{t("companyProfile.Kitchen")}</option>
                <option value='Bar'>{t("companyProfile.Bar")}</option>
                <option value='Sala DiningRoom'>{t("companyProfile.DiningRoom")}</option>
                <option value='Administração Adm'>{t("companyProfile.Adm")}</option>
                <option value='Delivery Entrega'>{t("companyProfile.Delivery")}</option>
                <option value='Freelancer'>{t("companyProfile.Freelancer")}</option>
              </select>
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
            </section>
          </div>
          <div>
            <label htmlFor="description">{t("companyProfile.label8")}</label>
            <textarea id='description' name="description" cols="45" rows="6" className='form-control' placeholder={t("companyProfile.placeholder4")} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div>
            <label htmlFor="profile">{t("companyProfile.label9")}</label>
            <textarea id='profile' name="profile" cols="45" rows="6" className='form-control' placeholder={t("companyProfile.placeholder5")} value={profile} onChange={(e) => setProfile(e.target.value)} required></textarea>
          </div>
          <div>
            <legend>{t("companyProfile.label7")}</legend>
            <fieldset id='jobsType' className='form-control'>
              <label>
                <input type="checkbox" name="type" value="Full-Time" checked={jobTypeSelected === 'Full-Time'} onChange={handleJobTypeChange} /> Full-Time
              </label>
              <label>
                <input type="checkbox" name="type" value="Part-Time" checked={jobTypeSelected === 'Part-Time'} onChange={handleJobTypeChange} /> Part-Time
              </label>
              <label>
                <input type="checkbox" name="type" value="Estágio" checked={jobTypeSelected === "Estágio"} onChange={handleJobTypeChange} /> {t("companyProfile.workLoad3")}
              </label>
            </fieldset>
          </div>
          <div>
            <label htmlFor="jobTypeDescription">{t("companyProfile.label10")}</label>
            <textarea id='jobTypeDescription' name="jobTypeDescription" cols="45" rows="6" className='form-control' placeholder={t("companyProfile.placeholder6")} value={jobTypeDescription} onChange={(e) => setJobTypeDescription(e.target.value)} required></textarea>
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
          <div>
            <p>Defina o limite de candidaturas:</p>
            <input value={applyLimit} onChange={handleApplyLimit} type="number" name="applyLimit" id="applyLimit" className='form-control'/>
          </div>
          <input type="submit" value={t("companyProfile.publishButton")} className='btn btn-dark form-control' />
        </form>
      </section>
      <section id='myPostedJobs'>
        <CompanyPostedJobs />
      </section>
      <section id='appliers'>
        <Appliers />
      </section>
      <Footer />
    </div>
  );
};

export default CompanyProfile;

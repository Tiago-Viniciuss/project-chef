import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
const storage = getStorage(app);

const CandidateProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [userData, setUserData] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateBirthday, setCandidateBirthday] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateGender, setCandidateGender] = useState('');
  const [candidateProfession, setCandidateProfession] = useState('');
  const [candidateEducation, setCandidateEducation] = useState('');
  const [candidateCity, setCandidateCity] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const fetchUserData = async () => {
    const candidateEmail = localStorage.getItem('candidateEmail');
    try {
      const userDocRef = doc(db, 'Candidates Data', candidateEmail);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUserData(data);
        setCandidateName(data.CandidateName); 
        setCandidateBirthday(data.CandidateBirthday)
        setCandidatePhone(data.CandidatePhone)
        setCandidateCity(data.CandidateCity)
        setCandidateProfession(data.CandidateProfession)
        setCandidateEducation(data.CandidateEducation)
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Erro ao buscar no Firestore:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setCandidateName(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setCandidateBirthday(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setCandidatePhone(e.target.value);
  };

  const handleCityChange = (e) => {
    setCandidateCity(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setCandidateProfession(e.target.value);
  };

  const handleEducationChange = (e) => {
    setCandidateEducation(e.target.value);
  };


  const navigateToHome = () => {
    navigate('/');
  };

  const leaveProfile = () => {
    localStorage.removeItem('candidateEmail');
    navigateToHome();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  const cancelPhotoChange = () => {
    setPhotoURL(null);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (photoFile) {
      try {
        const candidateEmail = localStorage.getItem('candidateEmail');
        const photoRef = ref(storage, `photos/${candidateEmail}-${photoFile.name}`);
        const uploadTask = uploadBytesResumable(photoRef, photoFile);
        await uploadTask;
        const downloadURL = await getDownloadURL(photoRef);
        const userDocRef = doc(db, 'Candidates Data', candidateEmail);
        await updateDoc(userDocRef, {
          PhotoURL: downloadURL,
        });
        setPhotoURL(null);
        window.location.reload()
      } catch (error) {
        console.error('Erro ao enviar a foto:', error);
      }
    } else {
      alert('Selecione uma foto para enviar.');
    }
  };

  const handleDataChange = async (e) => {
    e.preventDefault()
    try {
      const candidateEmail = localStorage.getItem('candidateEmail');
      const userDocRef = doc(db, 'Candidates Data', candidateEmail)
      await updateDoc(userDocRef, {
        CandidateName: candidateName,
        CandidateBirthday: candidateBirthday,
        CandidatePhone: candidatePhone,
        CandidateCity: candidateCity,
        CandidateProfession: candidateProfession,
        CandidateEducation: candidateEducation
        
      })
      alert('Dados Atualizados com Sucesso!')
    } catch (error) {
      

    }
  }

  return (
    <div id="candidateProfileContainer">
      <Header />
      <section id="candidateInfo">
        <h1>
          {t("candidateProfile.welcome")} <br /> {userData && userData.CandidateName}!
        </h1>
        <div id="photoContainer">
          <form>
            <div className="fileInputDiv"></div>
            <input
              className="material-symbols-outlined"
              type="file"
              name="photoInput"
              id="photoInput"
              onChange={handlePhotoChange}
            />
          </form>
          {photoURL && (
            <div className="confirmPicture">
              <p>{t("candidateProfile.label1")}</p>
              <img src={photoURL} alt="Selected" id="showPic" />
              <div className="showPicButtons">
                <span className="material-symbols-outlined" onClick={handlePhotoSubmit}>
                  check
                </span>
                <span onClick={cancelPhotoChange} className="material-symbols-outlined">close</span>
              </div>
            </div>
          )}
          <label htmlFor="photoInput" className="material-symbols-outlined">add_a_photo</label>
          <img id="profilePicture" src={userData && userData.PhotoURL} alt="" />
        </div>
        <form onSubmit={handleDataChange} id='editCandidateProfile'>
          <input
            type="text"
            name="name"
            id="name"
            value={candidateName}
            onChange={handleNameChange}
            placeholder={userData && userData.CandidateName}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={candidateBirthday}
            onChange={handleBirthdayChange}
            placeholder={userData && userData.CandidateBirthday}
          />
          <input
            type="number"
            name="name"
            id="name"
            value={candidatePhone}
            onChange={handlePhoneChange}
            placeholder={userData && userData.CandidatePhone}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={candidateCity}
            onChange={handleCityChange}
            placeholder={userData && userData.CandidateCity}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={candidateProfession}
            onChange={handleProfessionChange}
            placeholder={userData && userData.CandidateProfession}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={candidateEducation}
            onChange={handleEducationChange}
            placeholder={userData && userData.CandidateEducation}
          /> 
          <button type='submit' className='btn btn-dark form-control'>Upload Data</button>
        </form>
        <p onClick={leaveProfile} className="material-symbols-outlined">
          logout
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default CandidateProfile;

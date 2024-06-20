import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CandidateOptionsBar from '../components/CandidateOptionsBar';
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

  const {t} = useTranslation()

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [userData, setUserData] = useState(null);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateCity, setNewCandidateCity] = useState('');
  const [curriculumFile, setCurriculumFile] = useState(null);

  const [photoFile, setPhotoFile] = useState(null);

  const [photoURL, setPhotoURL] = useState(null); // Add state to store the temporary URL

  const fetchUserData = async () => {
    const candidateEmail = localStorage.getItem('candidateEmail');
    try {
      const userDocRef = doc(db, 'Candidates Data', candidateEmail);
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

  useEffect(() => {
    fetchUserData();
  }, [db]);

  const updateName = async () => {
    if (newCandidateName.trim() !== '') {
      try {
        const candidateEmail = localStorage.getItem('candidateEmail');
        const userDocRef = doc(db, 'Candidates Data', candidateEmail);
        await updateDoc(userDocRef, {
          CandidateName: newCandidateName,
        });
        setUserData(prevUserData => ({
          ...prevUserData,
          CandidateName: newCandidateName,
        }));
        console.log('Nome atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar o nome:', error);
      }
    } else {
      alert('Você não digitou nada!');
    }
  };

  const updateCity = async () => {
    if (newCandidateCity.trim() !== '') {
      try {
        const candidateEmail = localStorage.getItem('candidateEmail');
        const userDocRef = doc(db, 'Candidates Data', candidateEmail);
        await updateDoc(userDocRef, {
          CandidateCity: newCandidateCity,
        });
        setUserData(prevUserData => ({
          ...prevUserData,
          CandidateCity: newCandidateCity,
        }));
        console.log('Cidade atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar a cidade:', error);
      }
    } else {
      alert('Você não digitou nada!');
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const leaveProfile = () => {
    localStorage.removeItem('candidateEmail');
    navigateToHome();
  };

  const handleCurriculumSubmit = async (e) => {
    e.preventDefault();
    
    // Verifique se um arquivo foi selecionado
    if (curriculumFile) {
      try {
        const candidateEmail = localStorage.getItem('candidateEmail');
        
        // Crie uma referência no Firebase Storage com um nome único para o currículo
        const curriculumRef = ref(storage, `curriculums/${candidateEmail}-${curriculumFile.name}`);
        
        // Faça o upload do arquivo para o Firebase Storage
        const uploadTask = uploadBytesResumable(curriculumRef, curriculumFile);
        
        // Aguarde o término do upload
        await uploadTask;
        
        // Obtenha a URL de download do currículo
        const downloadURL = await getDownloadURL(curriculumRef);
        
        // Atualize o perfil do candidato com a URL do currículo no Firestore
        const userDocRef = doc(db, 'Candidates Data', candidateEmail);
        await updateDoc(userDocRef, {
          CurriculumURL: downloadURL,
        });
        
        // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
        console.log('Currículo enviado com sucesso!');
        
        alert(t("candidateProfile.alert2"))
      } catch (error) {
        console.error('Erro ao enviar o currículo:', error);
      }
    } else {
      alert('Selecione um arquivo PDF para enviar.');
    }
  };
  
  // Função para lidar com a seleção do arquivo PDF
  const handleCurriculumChange = (e) => {
    const file = e.target.files[0];
    setCurriculumFile(file);
  };
  
  // Função para lidar com a seleção do arquivo de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);

    // Create a temporary URL for the selected photo
    setPhotoURL(URL.createObjectURL(file));
  };

  const cancelPhotoChange = (e) => {
    setPhotoURL(null)
  }
  
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    
    // Verifique se um arquivo foi selecionado
    if (photoFile) {
      try {
        const candidateEmail = localStorage.getItem('candidateEmail');
        
        // Crie uma referência no Firebase Storage com um nome único para a foto
        const photoRef = ref(storage, `photos/${candidateEmail}-${photoFile.name}`);
        
        // Faça o upload do arquivo para o Firebase Storage
        const uploadTask = uploadBytesResumable(photoRef, photoFile);
        
        // Aguarde o término do upload
        await uploadTask;
        
        // Obtenha a URL de download da foto
        const downloadURL = await getDownloadURL(photoRef);
        
        // Atualize o perfil do candidato com a URL da foto no Firestore
        const userDocRef = doc(db, 'Candidates Data', candidateEmail);
        await updateDoc(userDocRef, {
          PhotoURL: downloadURL,
        });
        
        // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
        console.log('Foto enviada com sucesso!');
        alert(t("candidateProfile.alert1"))
        setPhotoURL(null)
      } catch (error) {
        console.error('Erro ao enviar a foto:', error);
      }
    } else {
      alert('Selecione uma foto para enviar.');
    }
  };
  

  return (
    <div id="candidateProfileContainer">
      <Header />
      <CandidateOptionsBar />
      <section id="candidateInfo">
        <h1>
          {t("candidateProfile.welcome")} <br /> {userData && userData.CandidateName}!
        </h1>
        <img id="profilePicture" src={userData && userData.PhotoURL} alt="" />
        <hr />
        <p>{userData && userData.CandidateName}</p>
        <hr />
        <div id="candidateBirthdayFormated">
          <p>{currentYear - (userData && userData.CandidateBirthday)} {t("candidateProfile.years")}</p>
          <hr />
        </div>
        <div id="candidatePhone">
          <p>{userData && userData.CandidatePhone}</p>
          <hr />
        </div>
        <div id="mainLocation">
          <p>{userData && userData.CandidateCity}</p>
          <hr />
        </div>
        <p>{userData && userData.CandidateProfession}</p>
        <hr />
        <p>{userData && userData.CandidateEducation}</p>
        <hr />
        <p onClick={leaveProfile} className='btn btn-dark form-control'>{t("candidateProfile.logoutButton")}</p>
      </section>
      <section id="editCandidateProfile">
        <h1>{t("candidateProfile.editProfileTitle")}</h1>
        <div className="editingContainer">
          <div className="editInput">
            <input
              type="text"
              name="candidateName"
              id="candidateName"
              className="form-control"
              value={newCandidateName}
              onChange={e => setNewCandidateName(e.target.value)}
              placeholder={userData && userData.CandidateName}
            />
            <span className="material-symbols-outlined" onClick={updateName}>
              edit
            </span>
          </div>
        </div>
        <div className="editingContainer">
          <div className="editInput">
            <input
              type="text"
              name="candidateCity"
              id="candidateCity"
              className="form-control"
              value={newCandidateCity}
              onChange={e => setNewCandidateCity(e.target.value)}
              placeholder={userData && userData.CandidateCity}
            />
            <span className="material-symbols-outlined" onClick={updateCity}>
              edit
            </span>
          </div>
        </div>
        <form>
          <div className='fileInputDiv'>
            <label htmlFor="photoInput" className='form-control'>{t("candidateProfile.placeholder1")}</label>
          </div>
        <input
          type="file"
          name="photoInput"
          id="photoInput"
          onChange={handlePhotoChange}/>
        </form>
      <form>
      <div className='fileInputDiv'>
        <label htmlFor="curriculumInput" className='form-control'>{t("candidateProfile.placeholder2")}</label>
        <span className="material-symbols-outlined"  onClick={handleCurriculumSubmit}>
          edit
        </span>
      </div>
            <input type="file" name="curriculumInput" id="curriculumInput" onChange={handleCurriculumChange}/>
      </form>
      </section>
      {photoURL && <div className='confirmPicture'>
        <p>{t("candidateProfile.label1")}</p>
        <img src={photoURL} alt="Selected" id="showPic" />
        <div className='showPicButtons'>
          <span className="material-symbols-outlined"  onClick={handlePhotoSubmit}>
            check
          </span>
          <span onClick={cancelPhotoChange} className="material-symbols-outlined">close</span>
        </div>
        </div>}
        <Footer/>
    </div>
  );
};

export default CandidateProfile;
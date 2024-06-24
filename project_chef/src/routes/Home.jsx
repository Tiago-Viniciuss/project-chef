import Header from '../components/Header'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, orderBy, getDocs, query, where} from 'firebase/firestore';

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

const Home = () => {

  const {t} = useTranslation()

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [classChange, setClassChange] = useState('')
  const [activeCategory, setActiveCategory] = useState('');



  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const normalizedKeyword = keyword.toLowerCase();
        let q;
  
        if (keyword) {
          q = query(
            collection(db, 'Vagas'),
            where('adTitleNormalized', '>=', normalizedKeyword),
            where('adTitleNormalized', '<=', normalizedKeyword + '\uf8ff'),
            orderBy('adTitleNormalized'),
            orderBy('CreationDate', 'desc')
          );
        } else if (classChange) {
          console.log(`Filtering by category: ${classChange}`);
          q = query(
            collection(db, 'Vagas'),
            where('chooseCategory', '==', classChange),
            orderBy('CreationDate', 'desc')
          );
        } else {
          q = query(collection(db, 'Vagas'), orderBy('CreationDate', 'desc'));
        }
  
        console.log('Query: ', q);
  
        const querySnapshot = await getDocs(q);
        const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
      } catch (error) {
        console.error('Erro ao buscar vagas de emprego:', error.message);
        console.error('Detalhes do erro:', error);
        alert('Erro ao buscar vagas de emprego: ' + error.message);
      }
    };
  
    fetchJobs();
  }, [keyword, classChange]);
  
  
  
  

  const navigate = useNavigate();

  const handleApply = (jobId) => {
    navigate(`/job/${jobId}`); // Navega para a página de detalhes da vaga com o ID da vaga
  };


  useEffect(()=> {

    const timer = setTimeout(()=> {
      const img = document.getElementById('homeBackground')
        
      if(img) {
        img.style.visibility = 'visible'
        img.style.left = '0'
        img.style.transition = 'left 1s'
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setClassChange(category);
    setActiveCategory(category);
  };

  return (
    <div id='home'>
        <Header/> 
      <section id='homeIntro'>
        <p className='intro'>{t("home.intro")}</p>
        {/*
        <div id='homeBackground'></div>
        */}
      </section>
      <input
      type="text"
      placeholder={t('home.searchBox')}
      value={keyword}
      onChange={handleKeywordChange} id='searchBox' className='form-control'
    />
    <section id='filterSection'>
  {['Restaurantes', 'Pastelarias', 'Padarias', 'Bares e Pubs', 'Organização de Eventos', 'Hotel ou Hostel', 'Restaurante Delivery', 'Refeição em Casa', 'Cozinheiro Viajante', 'Outros'].map((category) => (
    <button
      key={category}
      className={`btn buttonColor ${activeCategory === category ? 'active' : ''}`}
      onClick={() => handleCategoryClick(category)}
    >
      {category}
    </button>
  ))}
</section>
      <section id='jobsSection'>
      <div className='jobContainer'>
        {jobs.map((job) => (
          <div key={job.id} className='jobBody'>
            <h3>{job.adTitle}</h3>
            <p>{job.companyName}</p>
            <p>{job.chooseCategory}</p>
            <hr />
            <p className='description'>{job.smallDescription}</p>
            <hr />
            <p>{job.workPlaceSelected}</p>
            <p>{job.jobTypeSelected}</p>
            <p className='city'> {job.adCity}</p>
            <div className='buttons'>
              <button className='btn btn-light' id='applyButton' onClick={() => handleApply(job.id)}>{t("home.applyButton")}</button>
              <button className='material-symbols-outlined'>bookmark</button>
              {/*<button className='material-symbols-outlined' onClick={() => handleShare(job)}>share</button> */}
            </div>
          </div>
        ))}
      </div>
      </section>
      <p className='lorem'>{t('home.moreSoon')}</p>
        <Footer/>
    </div>
  )
}

export default Home
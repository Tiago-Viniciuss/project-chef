import Header from '../components/Header'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, orderBy, getDocs, query} from 'firebase/firestore';

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'Vagas'), orderBy('CreationDate', 'asc')));
        const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
      } catch (error) {
        console.error('Erro ao buscar vagas de emprego:', error);
      }
    };
  
    fetchJobs();
  }, []);
  

  const navigate = useNavigate();

  const handleApply = (jobId) => {
    navigate(`/job/${jobId}`); // Navega para a página de detalhes da vaga com o ID da vaga
  };

  const handleShare = async (job) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: job.adTitle,
          SmallDescription: job.smallDescription,
          url: `${window.location.origin}/job/${job.id}`
        })
      } else {
        alert('A função de compartilhamento não é compatível com o seu navegador')
      }
    } catch(error) {
      console.error('Erro ao compartilhar', error)
    }
  }

  return (
    <div id='home'>
        <Header/>
        <Filters/>
      <p className='intro'>{t("home.intro")}</p>
      <section id='jobsSection'>
      <div className='jobContainer'>
        {jobs.map((job) => (
          <div key={job.id} className='jobBody'>
            <h3>{job.adTitle}</h3>
            <p>{job.companyName}</p>
            <hr />
            <p className='description'>{job.smallDescription}</p>
            <hr />
            <p>{job.workPlaceSelected}</p>
            <p>{job.jobTypeSelected}</p>
            <p className='city'> {job.adCity}</p>
            <div className='buttons'>
              <button className='btn btn-dark' id='applyButton' onClick={() => handleApply(job.id)}>{t("home.applyButton")}</button>
              <button className='material-symbols-outlined'>bookmark</button>
              {/*<button className='material-symbols-outlined' onClick={() => handleShare(job)}>share</button> */}
            </div>
          </div>
        ))}
      </div>
      </section>
      <p className='lorem'>Mais vagas em breve...</p>
        <Footer/>
    </div>
  )
}

export default Home
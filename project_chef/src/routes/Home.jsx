import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
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

const Home = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [classChange, setClassChange] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const defaultImageURL = '/images/jobPicture.png'; // Caminho da imagem padrão

  useEffect(() => {
    const fetchJobs = async () => {

      window.scrollTo(0, 0)
      try {
        const normalizedKeyword = keyword.toLowerCase();
        let q;

        if (keyword) {
          q = query(
            collection(db, 'Vagas'),
            where('adTitleNormalized', '>=', normalizedKeyword),
            where('adTitleNormalized', '<=', normalizedKeyword + '\uf8ff'),
            orderBy('adTitleNormalized')
          );
        } else if (classChange) {
          q = query(
            collection(db, 'Vagas'),
            where('chooseCategoryKeywords', 'array-contains-any', classChange.split(' ')),
            orderBy('CreationDate', 'desc')
          );
        } else {
          q = query(collection(db, 'Vagas'), orderBy('CreationDate', 'desc'));
        }

        const querySnapshot = await getDocs(q);
        const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
      } catch (error) {
        console.error('Erro ao buscar vagas de emprego:', error.message);
        alert('Erro ao buscar vagas de emprego: ' + error.message);
      }
    };

    fetchJobs();
  }, [keyword, classChange]);

  const navigate = useNavigate();

  const handleApply = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setActiveCategory('');
  };

  const handleCategoryClick = (category) => {
    setClassChange(category);
    setActiveCategory(category);
    setKeyword('');
  };

  const handleFilter = (e) => {
    setActiveCategory('')
    setClassChange('');
    setKeyword('');
  }

  return (
    <div id='home'>
      <Header />
      <section id='homeIntro'>
        <p className='intro'>{t("home.intro")}</p>
      </section>
      <section id='searchContainer'>
        <input
          type="text"
          placeholder={t('home.searchBox')}
          value={keyword}
          onChange={handleKeywordChange}
          id='searchBox'
          className='form-control'
        />
        <section id='filterSection'>
          {['Kitchen', 'Bar', 'Adm', 'DiningRoom', 'Delivery', 'Freelancer'].map((category) => (
            <button
              key={category}
              className={`btn buttonColor ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {t(`companyProfile.${category}`)}
            </button>
          ))}
          <button className='btn buttonColor buttonAll' onClick={handleFilter}>{t('companyProfile.All')}</button>
        </section>
      </section>
      <section id='jobsSection'>
        <div className='jobContainer'>
          {jobs.map((job, index) => (
            <>
            <div key={job.id} className='jobBody'>
              <img src={job.PhotoURL || defaultImageURL} alt={job.adTitle} /> {/* Verificação do URL da imagem */}
              <h3>{job.adTitle}</h3>
              <h4>{job.companyName}</h4>
              <hr />
              <p>{job.workPlaceSelected}</p>
              <p>{job.jobTypeSelected}</p>
              <p className='city'>{job.adCity}</p>
                <button className='btn btn-light form-control' id='applyButton' onClick={() => handleApply(job.id)}>{t("home.applyButton")}</button>
            </div>
            {index > 0 && index % 6 === 5 && (
              <div className='banner'>
                {/* Conteúdo do banner aqui */}
                <marquee direction="left">
                  <p>Da Chef Experience</p>
                </marquee>
              </div>
            )}
          </>
          ))}
        </div>
      </section>
      <p className='lorem'>{t('home.moreSoon')}</p>
      <Footer />
    </div>
  );
}

export default Home;

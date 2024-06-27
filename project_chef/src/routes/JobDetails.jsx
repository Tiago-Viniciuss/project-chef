import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/JobDetails.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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

const JobDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const navigate = useNavigate();

  const defaultImageURL = '/images/jobPicture.png';

  useEffect(() => {
    const fetchJobDetails = async () => {
      // Use o ID da vaga para recuperar os detalhes da vaga do Firebase
      try {
        const docRef = doc(db, 'Vagas', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const jobData = docSnap.data();
          // Converte o Timestamp para uma string formatada
          if (jobData.CreationDate) {
            const date = jobData.CreationDate.toDate();
            jobData.CreationDate = date.toLocaleDateString('pt-PT');
          }
          setJobDetails(jobData);
          window.scrollTo(0, 0);
        } else {
          console.log('Nenhuma vaga encontrada com o ID fornecido');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da vaga:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!jobDetails) {
    return <div>Carregando...</div>;
  }

  const candidateEmail = localStorage.getItem('candidateEmail');

  return (
    <div id='jobDetails'>
      <Header />
      <Link to={'/'}>
        <span>
          <span className='material-symbols-outlined'>arrow_back_ios</span>
          {t("jobDetails.backToList")}
        </span>
      </Link>
      <img src={jobDetails.PhotoURL || defaultImageURL} alt="" />
      <h1 className='title'>{jobDetails.adTitle}</h1>
      <section id='jobDetailsHeader'>
        <ul>
          <li><span className='material-symbols-outlined'>calendar_today</span> {jobDetails.CreationDate}</li>
          <li><span className='material-symbols-outlined'>location_on</span> {jobDetails.adCity}</li>
          <li><span className='material-symbols-outlined'>apartment</span> {jobDetails.companyName}</li>
          <li><span className='material-symbols-outlined'>schedule</span> {jobDetails.jobTypeSelected}</li>
        </ul>
      </section>
      <section id='detailsComplement'>
        <div className='jobDescription'>
          <h4>{t("jobDetails.description")}</h4>
          {jobDetails.description}
        </div>
        <div className='jobDescription'>
          <h4>{t("jobDetails.profile")}</h4>
          {jobDetails.profile}
        </div>
        <div className='jobDescription'>
          <h4>{t("jobDetails.description")}</h4>
          {jobDetails.jobTypeDescription}
        </div>
        <div className='jobDescription'>
          <h4>{t("jobDetails.salary")}</h4>
          {jobDetails.jobSalary}
        </div>
        {candidateEmail ? (
          <Link to={`/job-apply/${id}`} state={jobDetails}>
            <button className='btn btn-dark'>{t("jobDetails.applyButton")}</button>
          </Link>
        ) : (
          <button className='btn btn-dark' onClick={() => navigate('/candidate-profile-login')}>{t("jobDetails.loginButton")}</button>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default JobDetails;

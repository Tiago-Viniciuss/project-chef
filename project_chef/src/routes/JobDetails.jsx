import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/JobDetails.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection} from 'firebase/firestore';

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

  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      // Use o ID da vaga para recuperar os detalhes da vaga do Firebase
      try {
        const docRef = doc(db, 'Vagas', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobDetails(docSnap.data());
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

  return (
    <div id='jobDetails'>
      <Header/>
      <Link to={'/'}>
          <span>
            <span className='material-symbols-outlined'>arrow_back_ios</span>
            Voltar à lista de empregos
          </span>
      </Link>
      <h1>{jobDetails.adTitle}</h1>
      <section id='jobDetailsHeader'>
         <ul>
             <li><span className='material-symbols-outlined'>calendar_today</span> {jobDetails.CreationDate}</li>
              <li><span className='material-symbols-outlined'>location_on</span> {jobDetails.adCity}</li>
              <li><span className='material-symbols-outlined' >work</span> {jobDetails.chooseCategory}</li>
              <li><span className='material-symbols-outlined'>apartment</span> {jobDetails.companyName}</li>
              <li><span className='material-symbols-outlined'>schedule</span>  {jobDetails.jobTypeSelected}</li>
              <li><span className='material-symbols-outlined'>location_away</span>  {jobDetails.workPlaceSelected}</li>
         </ul>
      </section>
      <section id='detailsComplement'>
        <div className='jobDescription'>
          <h4>Descrição da vaga:</h4>
           {jobDetails.description}
        </div>
        <div className='jobDescription'>
          <h4>Perfil:</h4>
           {jobDetails.profile}
        </div>
        <div className='jobDescription'>
          <h4>Horário:</h4>
           {jobDetails.jobTypeDescription}
        </div>
        <div className='jobDescription'>
          <h4>Salário:</h4>
           {jobDetails.jobSalary}
        </div>
        <Link to={`/job-apply/${id}`} state={jobDetails}>
          <button className='btn btn-dark'>Aplicar para esta vaga</button>
        </Link>
      </section>
      <Footer/>
    </div>
  );
};

export default JobDetails;

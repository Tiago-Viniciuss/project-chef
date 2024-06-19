import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, addDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/JobApply.css';

const firebaseConfig = { apiKey: "AIzaSyDLeaVbkontIerNiMt_7SMiX8k3eMeS42o",
authDomain: "projeto-empregos.firebaseapp.com",
projectId: "projeto-empregos",
storageBucket: "projeto-empregos.appspot.com",
messagingSenderId: "640012785481",
appId: "1:640012785481:web:8bd5e89d6ca63729666c98",
measurementId: "G-H63RS9DHMF" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const JobApply = () => {

    const location = useLocation();
    const jobApply = location.state;
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const { id } = useParams();
    const {t} = useTranslation()

    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                if (jobApply) { // Adicionando verificação para garantir que jobApply esteja definido
                    const docRef = doc(db, 'Vagas', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setJobDetails(docSnap.data());
                    } else {
                        console.log('Nenhuma vaga encontrada com o ID fornecido');
                    }
                } else {
                    console.log('jobApply não está definido');
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes da vaga:', error);
            }
        };
        

        if (jobApply) {
            fetchJobDetails();
        }
    }, [jobApply, db]);


    const [userData, setUserData] = useState(null);
    const candidateEmail = localStorage.getItem('candidateEmail')

    useEffect(() => {
        const candidateEmail = localStorage.getItem('candidateEmail');
        
        const fetchData = async () => {
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
        fetchData();
      }, [db]);
      

      const navigate = useNavigate();


      const [candidateLetter, setCandidateLetter] = useState('Olá, estou a candidatar-me para esta vaga e aguardo vosso contacto!')

      const handleCandidateLetter = (e) => {
        setCandidateLetter(e.target.value)
      }

      const [candidatePhone, setCandidatePhone] = useState('')

      const handleCandidatePhone = (e) => {
        setCandidatePhone(e.target.value)
      }

      const applyToJob = async (e) => {
        e.preventDefault();
    
        try {
          const usersCollectionRef = collection(db, 'Candidates Data');
          const conversationsCollectionRef = collection(db, 'Conversations');
    
          await updateDoc(doc(usersCollectionRef, candidateEmail), { 
            CandidatePhone: candidatePhone,
          });
    
          await addDoc(conversationsCollectionRef, {
            JobTitle: jobDetails.adTitle,
            Name: userData.CandidateName,
            Message: candidateLetter,
            CandidateEmail: candidateEmail,
            Timestamp: new Date()
          });
    
          alert(`Obrigado, ${userData && userData.CandidateName}! A candidatura para ${jobDetails && jobDetails.adTitle} foi feita com sucesso.`);
          navigate('/');
        } catch (error) {
          console.error('Erro ao adicionar usuário:', error);
        }

        
           /* ---------------------------------- */

        
          const templateParams = {
          companyEmail: jobDetails && jobDetails.companyEmail,
          companyName: jobDetails && jobDetails.companyName,
          adTitle: jobDetails && jobDetails.adTitle,
          candidateName: userData && userData.CandidateName,
          candidateBirthday: userData && userData.CandidateBirthday,
          candidatePhone: candidatePhone,
          candidateEmail: userData && userData.CandidateEmail,
          candidateMessage: candidateLetter,
          candidateCurriculum: userData && userData.CurriculumURL
        };
    
        emailjs.send("service_zj8ccsr", "template_iqm233k", templateParams, "cFnDj2Cg2bHzT0kDs")
          .then((response) => {
            console.log('Email Enviado', response.status, response.text);
            alert(`Obrigado, ${userData && userData.CandidateName}! A candidatura para ${jobDetails && jobDetails.adTitle} foi feita com sucesso.`)
            navigate('/')
          })
          .catch((error) => {
            console.log('ERRO:', error);
          });
      };

    

    return (
        <div id='jobApply'>
            <Header />
            <h1>{t('applyJob.title')}</h1>
            <section className='jobDetails'>
                <h3>{jobDetails && jobDetails.adTitle}</h3>
                <div>
                    <p>
                        <span className='material-symbols-outlined'>location_on</span>{jobDetails&& jobDetails.adCity}</p>
                    <p>
                        <span className='material-symbols-outlined'>schedule</span> {jobDetails && jobDetails.jobTypeSelected} 
                    </p>
                </div>
            </section>
            <form onSubmit={applyToJob}>
                <h5>{t('applyJob.personalData')}</h5>
                <p>{t('applyJob.beContacted')}</p>
                <span>{t('applyJob.label1')}</span>
                <p className='form-control'>{userData && userData.CandidateName}</p>
                <span>E-mail</span>
                <p className='form-control'>{userData && userData.CandidateEmail}</p>
                <span>{t('applyJob.label2')}</span>
                <input type="number" name="candidatePhone" id="candidatePhone" className='form-control' placeholder='Insira seu número de telemóvel' required value={candidatePhone} onChange={handleCandidatePhone}/>
                <span>{t('applyJob.label3')}</span>
                <div className='candidateCV'>
                    <label className='form-control' htmlFor="candidateCV">{t('applyJob.placeholder1')}</label>
                    <input type="file" name="candidateCV" id="candidateCV" />
                </div>
                <span>{t('applyJob.label4')}</span>
                <textarea name="candidateLetter" id="candidateLetter" cols="30" rows="10" className='form-control' onChange={handleCandidateLetter} value={candidateLetter}></textarea>
                <button type='submit' className='btn btn-dark'>{t('applyJob.button1')}</button>
            </form>
            <Footer />
        </div>
    );
};

export default JobApply;

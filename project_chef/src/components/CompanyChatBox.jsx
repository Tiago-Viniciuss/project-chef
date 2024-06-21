import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import '../style/CompanyChatBox.css';

const firebaseConfig = { apiKey: "AIzaSyDLeaVbkontIerNiMt_7SMiX8k3eMeS42o",
  authDomain: "projeto-empregos.firebaseapp.com",
  projectId: "projeto-empregos",
  storageBucket: "projeto-empregos.appspot.com",
  messagingSenderId: "640012785481",
  appId: "1:640012785481:web:8bd5e89d6ca63729666c98",
  measurementId: "G-H63RS9DHMF" };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CompanyChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [showPhoto, setShowPhoto] = useState('');

  const fetchMessages = async () => {
    try {
      const companyEmail = localStorage.getItem('companyEmail');
      if (!companyEmail) {
        console.error('Email da empresa não encontrado no localStorage');
        return;
      }

      const conversationsCollection = collection(db, 'Conversations');
      const q = query(conversationsCollection, where('CompanyEmail', '==', companyEmail));
      const conversationsSnapshot = await getDocs(q);
      const messagesList = conversationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    } catch (error) {
      console.error('Erro ao buscar no Firestore:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePhotoClick = (photoUrl) => {
    setShowPhoto(photoUrl);
  };

  const closePhoto = () => {
    setShowPhoto(false)
  }
  

  return (
    <div>
      <h1 id='messsagesTitle'>Minhas Conversas</h1>
      <section id='conversationsContainer'>
        {messages.length > 0 ? (
          messages.map(message => (
            <div key={message.id} className="message">
              <img 
                src={message.CandidatePhoto} 
                alt="" 
                onClick={() => handlePhotoClick(message.CandidatePhoto)} 
                style={{ cursor: 'pointer' }} 
              />
              <p className='messageCandidate'><strong>{message.Name}</strong></p>
              <p className='messageJobTitle'>{message.JobTitle}</p>
              <p className='messageContent'>{message.Message}</p>
              <p className='messageDetails'>Atualmente sou {message.CandidateProfession}</p>
              <p className='messageDetails'>O meu contacto é <a href={`tel:${message.CandidatePhone}`}>{message.CandidatePhone}</a></p>
              <p className='messageDetails'>O meu e-mail é <a href={`mailto:${message.CandidateEmail}`}>{message.CandidateEmail}</a></p>
              <p className='messageDetails'>Eu nasci em {message.CandidateBirthday}</p>
              <p className='messageDetails'>Falo {message.CandidateLanguage}</p>
              <p className='messageDetails'>Estudei {message.CandidateEducation}</p>
              <p className='messageDetails'>Atualmente sou {message.CandidateMarital}</p>
              <p className='messageDetails'>Possuo {message.CandidateSchool}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma conversa encontrada.</p>
        )}
      </section>
        <div id='showPhoto' style={{ display: showPhoto ? 'flex' : 'none' }}  onClick={closePhoto}>
        {showPhoto && (
      <div>
        <img src={showPhoto} alt="Candidate" id='profilePhoto'/>
      </div>
      )}
      </div>
    </div>
  );
};

export default CompanyChatBox;

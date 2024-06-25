import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc, orderBy } from 'firebase/firestore';
import '../style/Appliers.css';

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

const Appliers = () => {
  const [appliers, setAppliers] = useState([]);
  const [showPhoto, setShowPhoto] = useState('');

  const fetchappliers = async () => {
    try {
      const companyEmail = localStorage.getItem('companyEmail');
      if (!companyEmail) {
        console.error('Email da empresa não encontrado no localStorage');
        return;
      }

      const conversationsCollection = collection(db, 'Conversations');
      const q = query(
        conversationsCollection, 
        where('CompanyEmail', '==', companyEmail),
        orderBy('Timestamp', 'desc')
      );

      const conversationsSnapshot = await getDocs(q);
      const appliersList = conversationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppliers(appliersList);
    } catch (error) {
      console.error('Erro ao buscar no Firestore:', error);
    }
  };

  useEffect(() => {
    fetchappliers();
  }, []);

  const handlePhotoClick = (photoUrl) => {
    setShowPhoto(photoUrl);
  };

  const closePhoto = () => {
    setShowPhoto(false);
  };

  const deleteCandidate = async (id) => {
    try {
      await deleteDoc(doc(db, 'Conversations', id));
      setAppliers(appliers.filter((applier) => applier.id !== id));
      console.log('Conversa deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar conversa:', error);
    }
  };
  
  return (
    <div>
      <h1 id='appliersTitle'>Minhas Conversas</h1>
      <section id='appliersContainer'>
        {appliers.length > 0 ? (
          appliers.map(applier => (
            <div key={applier.id} className="applier">
              <img 
                src={applier.CandidatePhoto} 
                alt="" 
                onClick={() => handlePhotoClick(applier.CandidatePhoto)} 
                style={{ cursor: 'pointer' }} 
              />
              <p className='applierCandidate'><strong>{applier.Name}</strong></p>
              <p className='applierJobTitle'>{applier.JobTitle}</p>
              <p className='applierContent'>{applier.Message}</p>
              <p className='applierDetails'>Atualmente sou {applier.CandidateProfession}</p>
              <p className='applierDetails'>O meu contacto é <a href={`tel:${applier.CandidatePhone}`}>{applier.CandidatePhone}</a></p>
              <p className='applierDetails'>O meu e-mail é <a href={`mailto:${applier.CandidateEmail}`}>{applier.CandidateEmail}</a></p>
              <p className='applierDetails'>Eu nasci em {applier.CandidateBirthday}</p>
              <p className='applierDetails'>Falo {applier.CandidateLanguage}</p>
              <p className='applierDetails'>Estudei {applier.CandidateEducation}</p>
              <p className='applierDetails'>Atualmente sou {applier.CandidateMarital}</p>
              <button className='btn btn-danger' onClick={() => deleteCandidate(applier.id)}>Excluir</button>
            </div>
          ))
        ) : (
          <p>Nenhuma conversa encontrada.</p>
        )}
      </section>
      <div id='showPhoto' style={{ display: showPhoto ? 'flex' : 'none' }} onClick={closePhoto}>
        {showPhoto && (
          <div>
            <img src={showPhoto} alt="Candidate" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appliers;

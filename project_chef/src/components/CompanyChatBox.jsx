import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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

  const fetchMessages = async () => {
    try {
      const conversationsCollection = collection(db, 'Conversations');
      const conversationsSnapshot = await getDocs(conversationsCollection);
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

  return (
    <div>
      <h1 id='messsagesTitle'>Minhas Conversas</h1>
      <section id='conversationsContainer'>
      {messages.length > 0 ? (
        messages.map(message => (
          <div key={message.id} className="message">
            <p className='messageCandidate'><strong>{message.Name}</strong></p>
            <p className='messageJobTitle'>{message.JobTitle}</p>
            <p className='messageContent'>{message.Message}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma conversa encontrada.</p>
      )}
      </section>
      
    </div>
  );
};

export default CompanyChatBox;

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = { apiKey: "AIzaSyDLeaVbkontIerNiMt_7SMiX8k3eMeS42o",
authDomain: "projeto-empregos.firebaseapp.com",
projectId: "projeto-empregos",
storageBucket: "projeto-empregos.appspot.com",
messagingSenderId: "640012785481",
appId: "1:640012785481:web:8bd5e89d6ca63729666c98",
measurementId: "G-H63RS9DHMF" };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para criar conversas e enviar mensagens
const createConversationAndSendMessage = async (jobId, senderId, receiverId, content) => {
  const conversationId = [jobId, senderId, receiverId].sort().join('_');

  // Cria a conversa se não existir
  await setDoc(doc(db, 'Conversations', conversationId), {
    jobId,
    participants: [senderId, receiverId],
    lastUpdated: serverTimestamp()
  }, { merge: true });

  // Adiciona a mensagem à subcoleção
  await addDoc(collection(db, 'Conversations', conversationId, 'Messages'), {
    senderId,
    content,
    timestamp: serverTimestamp()
  });
};

// Função para buscar mensagens
const getMessages = async (jobId, senderId, receiverId) => {
  const conversationId = [jobId, senderId, receiverId].sort().join('_');
  const messagesSnapshot = await getDocs(query(collection(db, 'Conversations', conversationId, 'Messages'), orderBy('timestamp')));

  const messages = [];
  messagesSnapshot.forEach((doc) => {
    messages.push(doc.data());
  });

  return messages;
};

export { db, createConversationAndSendMessage, getMessages };

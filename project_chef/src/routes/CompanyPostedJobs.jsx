import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import '../style/CompanyPostedJobs.css'
import { Trans, useTranslation } from 'react-i18next';

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

const CompanyPostedJobs = () => {

  const {t} = useTranslation()

  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // Estado para controlar a abertura da caixa de diálogo

  const [companyVagas, setCompanyVagas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyVagas = async () => {
      const companyEmail = localStorage.getItem('companyEmail');

      // Consulta no Firestore para obter as vagas da empresa atual
      const q = query(collection(db, 'Vagas'), where('companyEmail', '==', companyEmail));
      const querySnapshot = await getDocs(q);

      const vagas = [];
      querySnapshot.forEach((doc) => {
        vagas.push({ id: doc.id, ...doc.data() });
      });

      setCompanyVagas(vagas);
    };

    fetchCompanyVagas();
  }, [db]);

  // Função para exibir detalhes da vaga
  const handleVagaClick = (id) => {
    // Navegar para a página de detalhes da vaga com o ID da vaga
    navigate(`/job/${id}`);
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  // Função para fechar a caixa de diálogo de confirmação
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  // Função para deletar a vaga do Firebase
  const handleDeleteVaga = async (id) => {
    try {
      await deleteDoc(doc(db, 'Vagas', id));
      // Atualizar a lista de vagas após a exclusão
      setCompanyVagas(companyVagas.filter((vaga) => vaga.id !== id));
      console.log('Vaga deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar vaga:', error);
    } finally {
      // Fechar a caixa de diálogo de confirmação
      closeDeleteConfirmation();
    }
  };

  return (
    <div>
      <Header />
      <h1 className='postedJobTitle'>{t("myAds.title")}</h1>
      <ul id='postedJobContainer'>
        {companyVagas.map((vaga) => (
          <li key={vaga.id} className='postedJob'>
            <h2 onClick={() => handleVagaClick(vaga.id)}>{vaga.adTitle}</h2>
            <p>{t("myAds.location")}: {vaga.adCity}</p>
            <p>{t("myAds.branchActivity")}: {vaga.chooseCategory}</p>
            <p>{t("myAds.description")}: {vaga.smallDescription}</p>
            <p>{t("myAds.workLoad")}: {vaga.jobTypeSelected} </p>
            <button className='btn btn-danger' onClick={() => openDeleteConfirmation(vaga.id)}>{t("myAds.deleteButton")}</button>
          </li>
        ))}
      </ul>
      {/* Caixa de diálogo de confirmação */}
      {deleteConfirmation && (
        <div className="confirmationDialog">
          <p>{t("myAds.confirmationDialog")}</p>
          <button className='btn btn-light' onClick={() => handleDeleteVaga(deleteConfirmation)}>{t("myAds.confirmButton")}</button>
          <button className='btn btn-danger' onClick={closeDeleteConfirmation}>{t("myAds.cancelButton")}</button>
        </div>
      )}
    </div>
  );
};

export default CompanyPostedJobs;

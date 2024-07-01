import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import '../style/CompanyPostedJobs.css';
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

const CompanyPostedJobs = () => {
  const { t } = useTranslation();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [companyVagas, setCompanyVagas] = useState([]);
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyVagas = async () => {
      const companyEmail = localStorage.getItem('companyEmail');

      const q = query(collection(db, 'Vagas'), where('companyEmail', '==', companyEmail));
      const querySnapshot = await getDocs(q);

      const vagas = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        vagas.push({ id: doc.id, ...data });
        setFormState((prevState) => ({
          ...prevState,
          [doc.id]: {
            applyLimit: data.applyLimit,
            adTitle: data.adTitle,
            adCity: data.adCity,
            jobSalary: data.jobSalary,
            jobDescription: data.description,
            jobTypeSelected: data.jobTypeSelected, // Adicionando jobTypeSelected ao estado
            workLoad: data.jobTypeDescription,
            profile: data.profile,
            // adicione outros campos aqui
          },
        }));
      });
      setCompanyVagas(vagas);
    };

    fetchCompanyVagas();
  }, []);

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleDeleteVaga = async (id) => {
    try {
      await deleteDoc(doc(db, 'Vagas', id));
      setCompanyVagas(companyVagas.filter((jobDetails) => jobDetails.id !== id));
      console.log('Vaga deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar vaga:', error);
    } finally {
      closeDeleteConfirmation();
    }
  };

  const handleInputChange = (id, field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const handleJobTypeChange = (id, jobType) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        jobTypeSelected: jobType,
      },
    }));
  };

  const handleSubmit = async (id) => {
    const { applyLimit, adTitle, adCity, jobSalary, jobDescription, jobTypeSelected, workLoad, profile } = formState[id];
    try {
      await updateDoc(doc(db, 'Vagas', id), {
        applyLimit: Number(applyLimit),
        adTitle,
        adCity,
        jobSalary,
        description: jobDescription,
        jobTypeSelected,
        jobTypeDescription: workLoad,
        profile: profile
        // adicione outros campos aqui
      });
      console.log('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className='postedJobTitle'>{t("myAds.title")}</h1>
      <ul id='postedJobContainer'>
        {companyVagas.map((jobDetails) => (
          <li key={jobDetails.id} className='postedJob'>
            <form className='form-control' onSubmit={(e) => { e.preventDefault(); handleSubmit(jobDetails.id); }}>
              <label htmlFor="adTitle">Título do Anúncio:</label>
              <input
                type="text"
                value={formState[jobDetails.id]?.adTitle || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'adTitle', e.target.value)}
              />
              <label htmlFor="adCity">Local:</label>
              <input
                type="text"
                value={formState[jobDetails.id]?.adCity || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'adCity', e.target.value)}
              />
              <label htmlFor="jobSalary">Salário:</label>
              <select
                name="jobSalary"
                id="jobSalary"
                className='form-control'
                value={formState[jobDetails.id]?.jobSalary || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'jobSalary', e.target.value)}
                required
              >
                <optgroup>
                  <option value="" disabled>-- {t("companyProfile.chooseSalary")} --</option>
                  <option value={t("companyProfile.salary1")}>{t("companyProfile.salary1")}</option>
                  <option value={t("companyProfile.salary2")}>{t("companyProfile.salary2")}</option>
                  <option value={t("companyProfile.salary3")}>{t("companyProfile.salary3")}</option>
                  <option value={t("companyProfile.salary4")}>{t("companyProfile.salary4")}</option>
                  <option value={t("companyProfile.salary5")}>{t("companyProfile.salary5")}</option>
                  <option value={t("companyProfile.salary6")}>{t("companyProfile.salary6")}</option>
                  <option value={t("companyProfile.salary7")}>{t("companyProfile.salary7")}</option>
                  <option value={t("companyProfile.salary8")}>{t("companyProfile.salary8")}</option>
                  <option value={t("companyProfile.salary9")}>{t("companyProfile.salary9")}</option>
                </optgroup>
              </select>
              <label htmlFor="jobDescription">Descrição da Vaga:</label>
              <textarea
                cols="45" rows="6"
                value={formState[jobDetails.id]?.jobDescription || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'jobDescription', e.target.value)}
              />
              <label htmlFor="profile">Perfil Buscado:</label>
              <textarea
                cols="45" rows="6"
                value={formState[jobDetails.id]?.profile || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'profile', e.target.value)}
              />
              <legend>{t("companyProfile.label7")}</legend>
              <fieldset id='jobsType' className='form-control'>
                <label>
                  <input
                    type="checkbox"
                    name="type"
                    value="Full-Time"
                    checked={formState[jobDetails.id]?.jobTypeSelected === 'Full-Time'}
                    onChange={() => handleJobTypeChange(jobDetails.id, 'Full-Time')}
                  /> Full-Time
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="type"
                    value="Part-Time"
                    checked={formState[jobDetails.id]?.jobTypeSelected === 'Part-Time'}
                    onChange={() => handleJobTypeChange(jobDetails.id, 'Part-Time')}
                  /> Part-Time
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="type"
                    value="Estágio"
                    checked={formState[jobDetails.id]?.jobTypeSelected === 'Estágio'}
                    onChange={() => handleJobTypeChange(jobDetails.id, 'Estágio')}
                  /> {t("companyProfile.workLoad3")}
                </label>
              </fieldset>
              <label htmlFor="applyLimit">Limite de Candidaturas:</label>
              <input
                type="number"
                value={formState[jobDetails.id]?.applyLimit || ''}
                onChange={(e) => handleInputChange(jobDetails.id, 'applyLimit', e.target.value)}
              />
              {/* Adicione outros campos aqui */}
              <button type="submit" className='btn btn-success'>Alterar</button>
            </form>
            <button className='btn btn-danger' onClick={() => openDeleteConfirmation(jobDetails.id)}>{t("myAds.deleteButton")}</button>
          </li>
        ))}
      </ul>
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

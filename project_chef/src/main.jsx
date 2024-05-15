import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import CreateAd from './routes/CreateAd.jsx';
import CandidateProfile from './routes/CandidateProfile.jsx';
import CandidateProfileLogin from './routes/CandidateProfileLogin.jsx';
import EditCandidateProfile from './routes/EditCandidateProfile.jsx';
import CreateProfile from './routes/createProfile.jsx';
import ForgetCandidatePassword from './routes/ForgetCandidatePassword.jsx';
import CreateCompanyProfile from './routes/CreateCompanyProfile.jsx';
import CompanyProfileLogin from './routes/CompanyProfileLogin.jsx';
import CompanyProfile from './routes/CompanyProfile.jsx';
import ForgetCompanyPassword from './routes/ForgetCompanyPassword.jsx';
import JobDetails from './routes/JobDetails.jsx';
import CompanyPostedJobs from './routes/CompanyPostedJobs.jsx';
import JobApply from './routes/JobApply.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="create-ad" element={<CreateAd />} />
          <Route path="company-profile-login" element={<CompanyProfileLogin />} />
          <Route path="candidate-profile-login" element={<CandidateProfileLogin />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route path="create-profile" element={<CreateProfile />} />
          <Route path="create-company-profile" element={<CreateCompanyProfile />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="forget-company-password" element={<ForgetCompanyPassword />} />
          <Route path="forget-candidate-password" element={<ForgetCandidatePassword />} />
          <Route path="edit-candidate-profile" element={<EditCandidateProfile />} />
          <Route path="posted-jobs" element={<CompanyPostedJobs />} />
          <Route path="job/:id" element={<JobDetails />} /> {/* Rota para detalhes da vaga */}
        </Route>
        <Route path="job-apply/:id" element={<JobApply />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

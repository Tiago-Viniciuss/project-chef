import React, {useState, useEffect} from 'react'
import '../style/JobBox.css'

const JobBox = () => {

  const [jobTitle, setJobtitle] = useState('')

  useEffect(() => {
    let storedJobTitle = localStorage.getItem('adTitle')
    setJobtitle(storedJobTitle)
  }, [])

  const [companyName, setCompanyName] = useState('')

  useEffect(() => {
    let storedCompanyName = localStorage.getItem('companyName')
    setCompanyName(storedCompanyName)
  }, [])

  const [workPlace, setWorkPlace] = useState('')

  useEffect(()=> {
    let storedWorkPlace = localStorage.getItem('workPlace')
    setWorkPlace(storedWorkPlace)
  }, [])

  const [jobType, setJobType] = useState('')

  useEffect(()=> {
    let storedJobType = localStorage.getItem('jobType')
    setJobType(storedJobType)
  }, [])

  const [jobLocation, setJobLocation] = useState('')

  useEffect(()=> {
    let storedLocation = localStorage.getItem('adLocation')
    setJobLocation(storedLocation)
  }, [])

  const [description, setDescription] = useState('')

  useEffect(()=> {
    let storedDescription = localStorage.getItem('adDescription')
    setDescription(storedDescription)
  }, [])

  function saveJob() {
    const saveButton = document.getElementById('saveJobButton')
    const saveSymbol = document.getElementById('saveJobSymbol')
    const saveTitle = document.getElementById('saveButtonTitle')

      saveButton.classList.toggle('saved')

      if (saveButton.className == 'saved') {
        saveTitle.innerText = 'Salvo'
        saveSymbol.innerText = 'bookmark'
      } else {
        saveTitle.innerText = 'Salvar'
        saveSymbol.innerText = 'bookmark_add'
      }   
  }

  return (
    <div>
        <main id='jobs' >
          <div id='jobBox'>
              <div id='jobTitleContainer'>
                <h1 id='jobTitle'>{jobTitle}</h1>
                <h6 id='companyName'>{companyName}</h6> 
              </div>
            <div id='jobInfo'>
              <ul>
                <li id='workPlace'> <span className='material-symbols-outlined'>badge</span> {workPlace}</li>
                <li id='jobType'> <span className='material-symbols-outlined'>schedule</span> {jobType}</li>
                <li id='jobTerm'> <span className='material-symbols-outlined'>contract</span> A Termo</li>
                <li id='jobLocation'> <span className='material-symbols-outlined'>location_on</span> {jobLocation}</li>
                <li id='jobDate'> <span className='material-symbols-outlined'>calendar_today</span> 22/11/2023</li>
              </ul>
              <div id='jobImage' className='material-symbols-outlined'>apartment</div>
            </div>
            <div id='companyDescription'>
                <p>
                  {description}
                </p>
            </div>
            <div id='saveApplyButtons'>
              <button id='saveJobButton' onClick={saveJob}>
                <p id='saveButtonTitle'>
                  Salvar
                </p>
                <span className='material-symbols-outlined' id='saveJobSymbol'>
                  bookmark_add
                </span>
              </button>
              <button id='applyCV'>
                Aplicar
              </button>
            </div>
          </div>
        </main>
        <hr />
    </div>
  )
}

export default JobBox
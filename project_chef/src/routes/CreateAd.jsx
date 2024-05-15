import React, { createElement, useEffect } from 'react'
import { useState } from 'react'
import '../style/CreateAd.css'



const CreateAd = () => {

  const [jobTitleStore, setJobTitleStore] = useState('')
  
  useEffect(()=> {
    const jobStored = localStorage.getItem('adTitle')
    setJobTitleStore(jobStored)
  })

  const [workPlaceSelected, setWorkPlaceSelected] = useState('')

  const handleWorkPlaceChange = (event) => {

    setWorkPlaceSelected(event.target.value)
  }

  const [jobTypeSelected, setJobTypeSelected] = useState('')

  const handleJobTypeChange = (event) => {

    setJobTypeSelected(event.target.value)
  }

  const jobs = document.querySelector('#jobsSection')



  function createAd(e) {

    const adContainer = document.getElementById('createAdContainer')

    e.preventDefault() 
    let title = document.getElementById('adTitle')
    let adTitle = String(title.value) 
    localStorage.setItem('adTitle', adTitle)
    /*let createAd = document.getElementById('createAd')
    let title = document.getElementById('adTitle')
    let companyName = document.getElementById('companyName')
    let category = document.getElementById('chooseCategory')
    let location = document.getElementById('adCity')
    let description = document.getElementById('description')
    let  button = document.getElementById('createJobsButton')

    let adTitle = String(title.value) 
    let adCompanyName = String(companyName.value)
    let adCategory = String(category.value)
    let adLocation = String(location.value)
    let adDescription = String(description.value)

    if (adTitle.length != 0 && adCompanyName.length  != 0 && adCategory.length !=0 && adLocation.length != 0 && adDescription.length != 0) {
      localStorage.setItem('adTitle', adTitle)
      localStorage.setItem('companyName', adCompanyName)
      localStorage.setItem('adCategory', adCategory)
      localStorage.setItem('adLocation', adLocation)
      localStorage.setItem('workPlace', workPlaceSelected)
      localStorage.setItem('jobType', jobTypeSelected)
      localStorage.setItem('adDescription', adDescription)

      createAd.style.visibility = 'hidden'
      
      createAd.classList.toggle('active')*/

      /*--------------------------------------*/
      const home = document.getElementById('myHome')

      const jobsSection = document.createElement('div')
      jobsSection.classList.add('jobsSection')

      home.appendChild(jobsSection)

      const jobBox = document.createElement('div')
      jobBox.classList.add('jobBox')
      
      const jobTitleContainer = document.createElement('div')
      jobTitleContainer.classList.add('jobTitleContaier')

      jobBox.appendChild(jobTitleContainer)

      const jobTitle = document.createElement('h1')
      jobTitle.classList.add('jobTitle')
      jobTitle.innerHTML = `${jobTitleStore}`
      const companyName = document.createElement('h6')
      companyName.classList.add('companyName')
      jobTitleContainer.appendChild(jobTitle)
      jobTitleContainer.appendChild(companyName)

      const jobInfo = document.createElement('div')
      jobInfo.classList.add('jobInfo')
      jobBox.appendChild(jobInfo)

      const jobInfoList = document.createElement('ul')
      jobInfoList.classList.add('jobInfoList')
      jobInfo.appendChild(jobInfoList)

      const companyDescrption = document.createElement('div')
      companyDescrption.classList.add('companyDescription')
      jobBox.appendChild(companyDescrption)

      const saveAplyButtons = document.createElement('div')
      saveAplyButtons.classList.add('saveAplyButtons')
      jobBox.appendChild(saveAplyButtons)

      const buttonSave = document.createElement('button')
      saveAplyButtons.appendChild(buttonSave)

      const buttonAply = document.createElement('button')
      saveAplyButtons.appendChild(buttonAply)
      
      jobsSection.appendChild(jobBox)

      adContainer.classList.remove('active')

      /*--------------------------------------*/

      /*if (createAd.className == 'active') {
          button.style.display = 'none'
      } else {
          button.style.display = 'block'
      }
    } else {
      alert('Preencha todos os campos!')
    }*/

    }
  

  return (
    <div>
        
        <form className='form-control' id='createAd' onSubmit={createAd}>
        <h1 className='criarAnuncioTitulo'>
            Criar Vaga
        </h1>
        
          <div>
            <label htmlFor="adTitle">Título do anúncio</label> <br />
            <input type="text" className='form-control' name="adTitle" id="adTitle" />
          </div>
          <div>
            <label htmlFor="companyName">Nome da Empresa</label> <br />
            <input type="text" className='form-control' name="companyName" id="companyName" />
          </div>
          <div>
            <label htmlFor="chooseCategory">Ramo de Atuação</label> <br />
            <select name="chooseCategory" id="chooseCategory" className='form-control'>
              <option value="" disabled>-- Escolha uma categoria --</option>
              <option value="adm">Administrativo e Secretariado</option>
              <option value="agro">Agricultura e Jardinagem</option>
              <option value="assistence">Assistente de Loja e Caixa</option>
              <option value="callCenter">Call Center, Helpdesk e Telemarketing</option>
              <option value="">Cargos Executivos</option>
              <option value="">Comercial</option>
              <option value="">Construção Civil</option>
              <option value="count">Contabilidade, Fiscalidade e Finanças</option>
              <option value="sports">Desportos e Fitness</option>
              <option value="cleaning">Domésticos e Limpeza</option>
              <option value="education">Formação, Ensino e Educação</option>
              <option value="industrial">Industrial, Fabrico e Confecção Têxtil</option>
              <option value="it">IT e Telecomunicações</option>
              <option value="marketing">Marketing, Publicidade e Eventos</option>
              <option value="hotel">Restauração, Hotelaria e Turismo</option>
              <option value="security">Segurança e Vigilância</option>
              <option value="socialService">Serviço Social e Voluntariado</option>
              <option value="health">Saúde e Beleza</option>
              <option value="other">Outros</option>
            </select> 
          </div>
          <div>
            <label htmlFor="cidade">Localidade</label> <br />
            <input type="text" name='cidade' id='adCity' className='form-control' />
          </div>
          <div>
            <legend>Tipo de Trabalho</legend>
            <fieldset id='workPlace' className='form-control'>
                        <label>
                        <input type="checkbox" name="category" value="Presencial" checked={workPlaceSelected === 'Presencial'} onChange={handleWorkPlaceChange}/> Presencial
                        </label>
                        <label>
                        <input type="checkbox" name="category" value="Remoto" checked={workPlaceSelected === 'Remoto'} onChange={handleWorkPlaceChange}/> Remoto
                        </label>
                        <label>
                        <input type="checkbox" name="category" value="Híbrido" checked={workPlaceSelected === 'Híbrido'} onChange={handleWorkPlaceChange}/> Híbrido
                        </label>
            </fieldset>
          </div>
            <div>
                <legend>Tipos de Vaga</legend>
                <fieldset id='jobsType' className='form-control'>
                    
                        <label>
                        <input type="checkbox" name="type" value="Full-Time" checked={jobTypeSelected === 'Full-Time'} onChange={handleJobTypeChange}/> Full-Time
                        </label>
                        <label>
                        <input type="checkbox" name="type" value="Part-Time" checked={jobTypeSelected === 'Part-Time'} onChange={handleJobTypeChange}/> Part-Time
                        </label>
                        <label>
                        <input type="checkbox" name="type" value="Estágio" checked={jobTypeSelected === 'Estágio'} onChange={handleJobTypeChange}/> Estágio
                        </label>
                </fieldset>
            </div>
          <div>
            <label htmlFor="description">Descrição</label>
            <textarea id='description' name="description" cols="45" rows="15" className='form-control' placeholder='Escreve aqui informações relevantes para o candidato, como a dinâmica da empresa, carga horária, preferências, responsabilidades, qualificações, etc.'></textarea>
          </div>
            <input type="submit" value="Publicar" className='btn btn-dark form-control'/>
        </form>
    </div>
  )
}

export default CreateAd
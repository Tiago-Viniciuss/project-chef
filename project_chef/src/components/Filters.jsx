import React from 'react'
import '../style/Filters.css'
import {useTranslation} from 'react-i18next'

const Filters = () => {

    const {t} = useTranslation()

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    function searchJob() {
        const filter = document.getElementById('filter')

        filter.classList.toggle('showFilters')

        
        const jobTitle = document.getElementById('jobTitle')
        
        jobTitle.innerText = localStorage.getItem('tituloAnuncio')
        
    }

    function showFilters() {
        const filters = document.getElementById('showFilters')

        filters.classList.toggle('showFilters')
    }
    

  return (
    <div>
        <form id='searchJob' onSubmit={handleSubmit}>
            <div id='searchOptions'>
                <input className='form-control' type="search" name="jobTitle"  placeholder={t("filters.placeholder1")}/>
                <input className='form-control' type="search" name="jobLocation"  placeholder={t("filters.placeholder2")}/>
            </div>
            <select className='form-control' name="" id="adDate">
                    <optgroup>
                        <option value={t("filters.option1")}>{t("filters.option1")}</option>
                        <option value={t("filters.option2")}>{t("filters.option2")}</option>
                        <option value={t("filters.option3")}>{t("filters.option3")}</option>
                        <option value={t("filters.option4")}>{t("filters.option4")}</option>
                    </optgroup>
            </select>
            <input type="submit" value={t("filters.submitButton")} className='btn btn-light btn-sm' id='searchJobButton' onClick={searchJob}/>
        </form>          
    </div>
  )
}

export default Filters
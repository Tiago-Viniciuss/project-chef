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
                <button id='showFiltersButton' onClick={showFilters}>{t("filters.filterButton")}</button>
            </div>
            <select className='form-control' name="" id="adDate">
                    <optgroup>
                        <option value={t("filters.option1")}>{t("filters.option1")}</option>
                        <option value={t("filters.option2")}>{t("filters.option2")}</option>
                        <option value={t("filters.option3")}>{t("filters.option3")}</option>
                        <option value={t("filters.option4")}>{t("filters.option4")}</option>
                    </optgroup>
            </select>
            <div id='showFilters'>
                <div>
                    <fieldset>
                    <legend>Tipos de Vaga</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="full-time"/> Full-Time
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="part-time"/> Part-Time
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="internship"/> Estágio
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="voluntary"/> Voluntário
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                    <legend>Tipos de Contrato</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="undefined"/> A Definir
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="temporary"/> Temporário
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="without-term"/> Sem Termo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="with-term"/> A Termo
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                    <legend>Salário</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="until-500"/> Até 500€
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="500-1k"/> 500€ - 1000€
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="1k-1_5k"/> 1000€ - 1500€
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="1_5k-2k"/> 1500€ - 2000€
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="plus-2k"/> mais de 2000€
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                    <legend>Nível de Escolaridade</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="not-qualified"/> Não Qualificado
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="qualified"/> Qualificado
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="student"/> Estudante
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="superior"/> Ensino Superior
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                    <legend>Modalidade da Vaga</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="on-site"/> Presencial
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="remotely"/> Remoto
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="hibrid"/> Híbrido
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="traveling"/> Necessário Viajar
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                    <legend>Horário de Trabalho</legend>
                        <label>
                        <input type="checkbox" name="categoria" value="all"/> Tudo
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="shift-work"/> Trabalho por Turnos
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="flexible"/> Horário Flexível
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="weekend-work"/> Requer fins de semana
                        </label>
                        <label>
                        <input type="checkbox" name="categoria" value="night-work"/> Requer trabalho noturno
                        </label>
                    </fieldset>
                </div>
            </div>
            <input type="submit" value={t("filters.submitButton")} className='btn btn-light btn-sm' id='searchJobButton' onClick={searchJob}/>
        </form>          
    </div>
  )
}

export default Filters
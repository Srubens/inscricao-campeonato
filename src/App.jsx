import { useState } from "react"
import moment from "moment"
import Swal from 'sweetalert2'

function App() {

  let mdata = moment().format('L LTS')

  const [form, setForm] = useState({
    'nmresponsavel':"",
    'nmaluno':"",
    'idade':"",
    'altura':"",
    'peso':"",
    'mdata':mdata
  })

  const onChange = (evt) =>{
    const value = evt.target.value
    console.log(evt.target.value)
    const key = evt.target.name
    setForm(old => ({
        ...old,
        [key]:value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{

      if( form.nmaluno && form.nmresponsavel === '' ){
        Swal.fire({
          icon:'error',
          html:`'Preencha todos os campos!'`
        })
        return false
      }else{
        
        console.log(form)

        fetch('https://sheetdb.io/api/v1/g6pzaqljw9h87?sheet=torneio',{
          method:'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            data: [{
              'NOME RESPONSAVEL':form.nmresponsavel,
              'ALUNO':form.nmaluno,
              'IDADE':form.idade,
              'ALTURA':form.altura,
              'PESO':form.peso,
              'AUTORIZADO':form.autorizado = 'Autorizado',
              'DATA':form.mdata
            }]
          })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))

        Swal.fire({
          icon:'success',
          html:`Cadastro realizado com sucesso`
        })
        
        setForm({
          'nmresponsavel':"",
          'nmaluno':"",
          'idade':"",
          'altura':"",
          'peso':"",
          'mdata':mdata
        })
        
      }


    }catch(err){
      console.log('Error:', err)
    }
  }

  const isFormValid = () => {
    return form.nmresponsavel && form.nmaluno && form.idade && form.altura && form.peso
  }

  return (
    <div className="container mt-5" >
    <div className="col-12 text-center " >
    <h3>
      Formulário de inscrição e autorização do aluno a participar do torneio 
      da escolinha de futebol da Igreja Batista em Arthur Lundgren II
    </h3>
    </div>
      <form 
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center mt-4 p-4"
      >
      <div className="col-12 col-md-7 mb-4" >
        <label htmlFor="nmresponsavel">
          Nome do responsável
        </label>
        <input type="text"
          name="nmresponsavel"
          onChange={onChange}
          className="form-control"
          value={form.nmresponsavel}
         />
      </div>

      <div className="col-12 col-md-7 mb-4" >
        <label htmlFor="nmaluno">
          Nome do Aluno:
        </label>
        <input type="text"
          name="nmaluno"
          onChange={onChange}
          className="form-control"
          value={form.nmaluno}
         />

      </div>

      <div className="col-12 col-md-7 mb-4" >
        <label htmlFor="idade">
          Idade do Aluno:
        </label>
        <input type="text"
          name="idade"
          onChange={onChange}
          className="form-control"
          value={form.idade}
         />

      </div>


      <div className="col-12 col-md-7 mb-4" >

        <label htmlFor="altura">
          Altura do Aluno:
        </label>
        <input type="text"
          name="altura"
          onChange={onChange}
          className="form-control"
          value={form.altura}
         />

      </div>
      
        <div className="col-12 col-md-7 mb-5" >
        <label htmlFor="peso">
          Peso do Aluno:
        </label>
        <input type="text"
          name="peso"
          onChange={onChange}
          className="form-control"
          value={form.peso}
         />

        </div>

         <button 
         disabled={!isFormValid()}
         className="col-12 col-md-7 btn btn-success mb-4" >Enviar</button>
      </form>
    </div>
  );
}

export default App;
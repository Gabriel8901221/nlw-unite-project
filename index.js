
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 01, 20, 20),
  },
  {
    nome: "Mayk Brito",
    email: "maykbrito@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 10, 15),
    dataCheckIn: new Date(2024, 2, 02, 11, 30),
  },
  {
    nome: "Beltrano da Silva",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 1, 22, 17, 45),
    dataCheckIn: new Date(2024, 2, 12, 15, 10),
  },
  {
    nome: "Ciclano Souza",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2023, 11, 04, 16, 30),
    dataCheckIn: new Date(2023, 11, 22, 19, 40),
  },
  {
    nome: "Maria da Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 1, 05, 20, 50),
    dataCheckIn: new Date(2024, 1, 5, 21, 15),
  },
  {
    nome: "José Santos",
    email: "jose@gmail.com",
    dataInscricao: new Date(2023, 10, 06, 12, 10),
    dataCheckIn: new Date(2023, 11, 06, 13, 20),
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2023, 9, 07, 09, 30),
    dataCheckIn: new Date(2023, 10, 07, 10, 45),
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 08, 17, 20),
    dataCheckIn: new Date(2024, 2, 08, 18, 30),
  },
  {
    nome: "Carla Mendes",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 11, 09, 22, 05),
    dataCheckIn: new Date(2024, 2, 09, 22, 45),
  }
]

const criarNovoParticipante = (participante) =>{
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
      Confirmar Check-in
      </button>
    `
  }

return `<tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) =>{
  let output = ""

  for( let participante of participantes){
    output = output + criarNovoParticipante(participante) 
  }

  document.querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) =>{
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)

  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participantes ja existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if(participanteExiste){
    alert("Email já cadastrado")
    return
  }


  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpra formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""


}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const messageConfirm = 'Tem certeza que deseja fazer check-in?'
  if(confirm(messageConfirm) == false){
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) =>
     p.email == event.target.dataset.email
  )

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)

}
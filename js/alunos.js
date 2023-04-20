'use strict'

const criarTitle = () => {
    let title = localStorage.getItem("nome do curso");
    let titleCourse = document.querySelector(".title");
    titleCourse.innerHTML = title;

}

const menu = () => {
    const div = document.createElement('div')
    div.classList.add('menu')

}


const createCard = (aluno) => {

    criarTitle()

    const div = document.createElement('div')
    div.classList.add('cards_aluno')
    div.id = aluno.matricula
    div.onclick = function () {
        localStorage.setItem('matricula', div.id)
    }

    const img = document.createElement('img')
    img.classList.add('foto_aluno')
    img.alt = 'foto do aluno'
    img.src = `${aluno.foto}`

    const title = document.createElement('h2')
    title.classList.add('nome_aluno')
    title.textContent = aluno.nome

    div.append(img, title)

    if (aluno.status == 'Finalizado') {
        div.classList.add('yellow')
    } else {
        div.classList.add('blue')
    }

    const select = document.getElementById('select-status')

    select.addEventListener('change', function () {
        let value = select.value

        if (value == 'status')
            div.style.display = 'flex'

        else if (value != aluno.status)
            div.style.display = 'none'

        else if (value == aluno.status)
            div.style.display = 'flex'



    })

    return div


}




const listarAlunos = async () => {
    let siglaCurso = localStorage.getItem('sigla')
    const url = `https://lion-school-back.onrender.com/v1/lion-school/alunos/curso?sigla=${siglaCurso}`

    const response = await fetch(url)

    const data = await response.json()

    const containerbuttons = document.querySelector('.container_aluno')

    const alunosCard = data.curso.map(createCard)
    containerbuttons.replaceChildren(...alunosCard)
}

listarAlunos()
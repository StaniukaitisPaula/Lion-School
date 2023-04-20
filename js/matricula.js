'use strict'

const matricula = localStorage.getItem('matricula')

const getStudentInformartions = (matricula) => {

    const fetchData = async() => {
        const url = `https://teste-lion.onrender.com/v1/lion-school/status/disciplinas/${matricula}`;
        // const url = `http://localhost:8080/v1/lion-school/status/disciplinas/${matriculaALuno}`;
        const response = await fetch(url);
        const data = await response.json();
        return {...data }
    };

    const ctx = document.getElementById("myChart");

    const updateChart = async() => {
        const data = await fetchData();

        const disciplineName = data.disciplinas.map((index) => {
            return index.nome;
        });
        const disciplineAverage = data.disciplinas.map((index) => {
            console.log(index.media)
            return index.media;

        });


    }
    const studentsInfo = async() => {
        const data = await fetchData();
        const container = document.getElementById("informations");

        const nomeCompleto = data.nome;
        const palavras = nomeCompleto.split(" ");
        const nomeFormatado = palavras.map(palavra => {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
        }).join(" ");

        const studentProfile = document.getElementById("container");
        studentProfile.classList.add("container");

        const studentImage = document.createElement('img')
        studentImage.classList.add('card_image')
        studentImage.src = data.foto

        const studentName = document.createElement('p')
        studentName.classList.add('name_student')
        if (palavras.length >= 4) {
            studentName.style.fontSize = '18px'
        }
        studentName.textContent = nomeFormatado

        studentProfile.append(studentImage, studentName)
        container.replaceChildren(studentProfile, ctx);
    };

    studentsInfo();
    updateChart();
};

getStudentInformartions(matricula);
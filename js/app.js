document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa lógica das Checkboxes e LocalStorage
    const checkboxes = document.querySelectorAll('.custom-checkbox')

    checkboxes.forEach(checkbox => {
      const savedState = localStorage.getItem('cbmal26_v4_' + checkbox.id)
      if (savedState === 'true') {
        checkbox.checked = true
      }

      checkbox.addEventListener('change', e => {
        localStorage.setItem('cbmal26_v4_' + e.target.id, e.target.checked)
        updateAllSubjectProgress()
        updateProgress()
      })
    })

    // 2. Cria a UI de progresso para cada disciplina (se já não existir)
    document.querySelectorAll('.subject-card').forEach(card => {
      const header = card.querySelector('.subject-header-grid')
      if (!header.querySelector('.subject-progress')) {
        const wrap = document.createElement('div')
        wrap.className = 'subject-progress'
        wrap.innerHTML =
          '<div class="subject-progress-bar"><div class="subject-progress-fill"></div></div><div class="subject-progress-text">0%</div>'
        const track = header.querySelector('.track-head')
        header.insertBefore(wrap, track)
      }
    })

    // 3. Sistema de sanfona (collapse) das disciplinas
    const headers = document.querySelectorAll('.subject-header-grid')
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const topics = header.parentElement.querySelectorAll('.topic-row')
        topics.forEach(topic => {
          topic.classList.toggle('closed')
        })
        header.classList.toggle('collapsed')
      })
    })

    // Atualiza barras no carregamento inicial
    updateAllSubjectProgress()
    updateProgress()
});

// Função para atualizar a barra de progresso geral (Header)
function updateProgress() {
    const allCheckboxes = document.querySelectorAll('.custom-checkbox')
    const checkedBoxes = document.querySelectorAll('.custom-checkbox:checked')

    if (allCheckboxes.length > 0) {
      const percentage = Math.round((checkedBoxes.length / allCheckboxes.length) * 100)
      const progressBar = document.getElementById('progress-bar')
      const progressText = document.getElementById('progress-text')
      
      if(progressBar) progressBar.style.width = percentage + '%'
      if(progressText) progressText.innerText = percentage + '% DA MISSÃO CONCLUÍDA'
    }
}

// Função para atualizar a barra de uma disciplina específica
function updateSubjectProgress(card) {
    const checkboxes = card.querySelectorAll('.topic-row .custom-checkbox')
    const checked = card.querySelectorAll('.topic-row .custom-checkbox:checked')
    const percent = checkboxes.length ? Math.round((checked.length / checkboxes.length) * 100) : 0
    
    const fill = card.querySelector('.subject-progress-fill')
    const text = card.querySelector('.subject-progress-text')
    
    if (fill) fill.style.width = percent + '%'
    if (text) text.innerText = percent + '%'
}

// Atualiza todas as barras de disciplinas
function updateAllSubjectProgress() {
    document.querySelectorAll('.subject-card').forEach(card => updateSubjectProgress(card))
}

/**
 * PROJETO ASTRA - MOTOR DE CARDS DINÂMICOS
 * Este script gerencia os cards de missões (editais) na tela inicial.
 */

// 1. O NOSSO "BANCO DE DADOS" LOCAL (Array de Objetos)
// Aqui você edita, adiciona ou remove os concursos facilmente.
const missoesAstra = [
  {
    id: 1,
    categoria: "SEGURANÇA PÚBLICA",
    titulo: "Soldado PM",
    descricao: "Operação completa para o edital vigente: rotina diária, ciclo de revisões e simulados com correção comentada.",
    status: "● Edital Aberto",
    statusClasse: "badge-green", // Classe CSS da cor do badge
    icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    tags: ["Edital atualizado", "Plano semanal"],
    link: "editais/pmal.html",
    textoBotao: "Acessar Missão &rarr;",
    desativado: false // Define se o botão é clicável
  },
  {
    id: 2,
    categoria: "BOMBEIRO MILITAR",
    titulo: "Oficial CBM",
    descricao: "Trilha teórica e tática para o concurso de Oficial, com foco em legislação específica e provas discursivas.",
    status: "● Edital Aberto",
    statusClasse: "badge-green",
    icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19c-1.5 0-2.5-1-2.5-2.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2.5-2.5 2.5z"/><path d="M11.5 19c-1.5 0-2.5-1-2.5-2.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2.5-2.5 2.5z"/><path d="M6 16.5A2.5 2.5 0 0 1 8.5 14h7A2.5 2.5 0 0 1 18 16.5M12 14v-4"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`,
    tags: ["Edital atualizado", "Plano semanal"],
    link: "editais/cbmal.html",
    textoBotao: "Acessar Missão &rarr;",
    desativado: false
  },
  {
    id: 3,
    categoria: "POLÍCIA FEDERAL",
    titulo: "Agente PF",
    descricao: "Pré-cadastro da missão. Assim que o edital for publicado, a operação é liberada para todos automaticamente.",
    status: "● Em breve",
    statusClasse: "badge-orange",
    icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    tags: ["Aguardando edital"],
    link: "#",
    textoBotao: "Em breve",
    desativado: true // Botão não poderá ser clicado
  }
];

// 2. FUNÇÃO RESPONSÁVEL POR CONSTRUIR O HTML NA TELA
function renderizarCards() {
  // Capturamos a div vazia do HTML
  const container = document.getElementById('grid-missoes');
  
  // Se o container não existir nesta página, paramos a função para não gerar erros
  if (!container) return;

  let htmlAcumulado = ''; // Variável que vai juntar todos os cards

  // Percorremos a nossa lista (Array) item por item
  missoesAstra.forEach(function(missao) {
    
    // 2.1 Gerar as pequenas tags do card (Plano Semanal, etc)
    const tagsHtml = missao.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // 2.2 Configurar o botão (Aberto ou Em Breve)
    let botaoHtml = '';
    if (missao.desativado) {
      botaoHtml = `<button class="btn btn-disabled btn-full" disabled>${missao.textoBotao}</button>`;
    } else {
      botaoHtml = `<a href="${missao.link}" class="btn btn-primary btn-full">${missao.textoBotao}</a>`;
    }

    // 2.3 Montar o molde (Template) HTML do card substituindo pelas variáveis
    htmlAcumulado += `
      <article class="card">
        <div class="card-top">
          <span class="badge ${missao.statusClasse}">${missao.status}</span>
          <div class="icon-circle">
            ${missao.icone}
          </div>
        </div>
        
        <div class="card-category">${missao.categoria}</div>
        <h3>${missao.titulo}</h3>
        <p>${missao.descricao}</p>
        
        <div class="card-tags">
          ${tagsHtml}
        </div>
        
        ${botaoHtml}
      </article>
    `;
  });

  // Finalmente, injetamos todo o HTML criado de uma só vez na tela
  container.innerHTML = htmlAcumulado;
}

// 3. GATILHO DE INICIALIZAÇÃO
// Avisamos ao navegador: "Só execute o renderizarCards quando a página inteira terminar de carregar!"
document.addEventListener('DOMContentLoaded', renderizarCards);
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
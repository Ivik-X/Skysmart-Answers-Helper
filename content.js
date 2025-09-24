(async function() {
  // Обновленные стили с кнопкой копирования
  const styles = `
    <style>
      #skysmartAnswersBox {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
        padding: 2px;
        z-index: 99999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      #skysmartAnswersBox .content-wrapper {
        background: white;
        border-radius: 13px;
        padding: 20px;
        max-width: 380px;
        max-height: 400px;
        overflow-y: auto;
      }

      #skysmartAnswersBox h3 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 18px;
        font-weight: 600;
      }

      #skysmartAnswersBox .answers-list {
        margin: 15px 0;
        padding: 15px;
        background: #f7f9fc;
        border-radius: 10px;
        max-height: 250px;
        overflow-y: auto;
      }

      #skysmartAnswersBox .answer-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        margin: 5px 0;
        background: white;
        border-radius: 8px;
        color: #444;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        transition: transform 0.2s;
      }

      #skysmartAnswersBox .answer-item:hover {
        transform: translateX(5px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
      }

      #skysmartAnswersBox .answer-text {
        flex: 1;
        margin-right: 10px;
        word-wrap: break-word;
      }

      #skysmartAnswersBox .copy-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
        min-width: 60px;
      }

      #skysmartAnswersBox .copy-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
      }

      #skysmartAnswersBox .copy-btn.copied {
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
      }

      #skysmartAnswersBox .change-task-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }

      #skysmartAnswersBox .change-task-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }

      #skysmartAnswersBox .no-answers {
        text-align: center;
        color: #999;
        padding: 20px;
        font-style: italic;
      }

      #skysmartAnswersBox .error-message {
        color: #e74c3c;
        padding: 10px;
        background: #ffeaa7;
        border-radius: 8px;
        margin: 10px 0;
        font-size: 14px;
      }

      #roomInputModal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      #roomInputModal .modal-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      #roomInputModal h3 {
        margin: 0 0 20px 0;
        color: #333;
        font-size: 20px;
        font-weight: 600;
      }

      #roomInputModal input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 10px;
        transition: border-color 0.3s;
        box-sizing: border-box;
      }

      #roomInputModal input:focus {
        outline: none;
        border-color: #667eea;
      }

      #roomInputModal .input-hint {
        font-size: 12px;
        color: #999;
        margin-bottom: 15px;
      }

      #roomInputModal .modal-buttons {
        display: flex;
        gap: 10px;
      }

      #roomInputModal button {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      #roomInputModal .save-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      #roomInputModal .save-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
      }

      #roomInputModal .cancel-btn {
        background: #f0f0f0;
        color: #666;
      }

      #roomInputModal .cancel-btn:hover {
        background: #e0e0e0;
      }

      /* Уведомление о копировании */
      .copy-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 184, 148, 0.3);
        z-index: 100001;
        animation: slideInNotification 0.3s ease-out;
        font-size: 14px;
        font-weight: 600;
      }

      @keyframes slideInNotification {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    </style>
  `;

  // Добавляем стили на страницу
  if (!document.getElementById('skysmartStyles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'skysmartStyles';
    styleElement.innerHTML = styles;
    document.body.appendChild(styleElement);
  }

  // Функция для копирования текста в буфер обмена
  async function copyToClipboard(text, buttonElement) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Меняем текст и стиль кнопки
      const originalText = buttonElement.textContent;
      buttonElement.textContent = '✓ Скопировано';
      buttonElement.classList.add('copied');
      
      // Показываем уведомление
      showCopyNotification();
      
      // Возвращаем исходный текст через 2 секунды
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.classList.remove('copied');
      }, 2000);
      
      return true;
    } catch (err) {
      console.error('Ошибка копирования:', err);
      
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        buttonElement.textContent = '✓ Скопировано';
        buttonElement.classList.add('copied');
        showCopyNotification();
        
        setTimeout(() => {
          buttonElement.textContent = '📋';
          buttonElement.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Fallback копирования не сработал:', err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  // Функция для показа уведомления о копировании
  function showCopyNotification() {
    // Удаляем старое уведомление, если есть
    const oldNotification = document.querySelector('.copy-notification');
    if (oldNotification) {
      oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = '✓ Ответ скопирован в буфер обмена';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideInNotification 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Функция для извлечения кода из URL или возврата самого значения
  function extractRoomCode(input) {
    // Проверяем, является ли это URL Skysmart
    const urlPattern = /https?:\/\/edu\.skysmart\.ru\/student\/task\/([a-zA-Z0-9]+)/;
    const match = input.match(urlPattern);
    
    if (match) {
      // Если это URL, извлекаем код
      return match[1];
    } else {
      // Если это не URL, возвращаем как есть (предполагаем, что это уже код)
      return input;
    }
  }

  // Функция для показа модального окна ввода кода
  function showRoomInputModal(callback) {
    // Удаляем старое модальное окно, если есть
    const oldModal = document.getElementById('roomInputModal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'roomInputModal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>🔑 Введите код или ссылку на задание</h3>
        <input 
          id="roomInputField" 
          type="text" 
          placeholder="lehavuvoka или https://edu.skysmart.ru/student/task/lehavuvoka/start"
          autofocus
        >
        <div class="input-hint">
          💡 Можно вставить код задания или полную ссылку
        </div>
        <div class="modal-buttons">
          <button class="save-btn" id="roomSaveBtn">Подтвердить</button>
          <button class="cancel-btn" id="roomCancelBtn">Отмена</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('roomInputField');
    const currentRoom = localStorage.getItem('skysmart_roomName');
    if (currentRoom) {
      input.value = currentRoom;
      input.select();
    }

    // Обработчики событий
    const saveHandler = () => {
      const value = input.value.trim();
      if (value) {
        // Извлекаем код из URL или используем значение как есть
        const roomCode = extractRoomCode(value);
        
        if (roomCode) {
          localStorage.setItem('skysmart_roomName', roomCode);
          modal.remove();
          if (callback) callback(roomCode);
        } else {
          input.style.borderColor = '#e74c3c';
          input.placeholder = 'Неверный формат кода или ссылки!';
        }
      } else {
        input.style.borderColor = '#e74c3c';
        input.placeholder = 'Поле не может быть пустым!';
      }
    };

    const cancelHandler = () => {
      modal.remove();
    };

    document.getElementById('roomSaveBtn').onclick = saveHandler;
    document.getElementById('roomCancelBtn').onclick = cancelHandler;
    
    // Закрытие по клику вне модального окна
    modal.onclick = (e) => {
      if (e.target === modal) {
        cancelHandler();
      }
    };

    // Обработка Enter и Escape
    input.onkeydown = (e) => {
      if (e.key === 'Enter') saveHandler();
      if (e.key === 'Escape') cancelHandler();
    };

    // Фокус на поле ввода
    setTimeout(() => input.focus(), 100);
  }

  // Функция для создания или обновления блока с ответами
  function createAnswersBox() {
    let div = document.getElementById('skysmartAnswersBox');
    if (!div) {
      div = document.createElement('div');
      div.id = 'skysmartAnswersBox';
      document.body.appendChild(div);
    }
    return div;
  }

  // Функция для отображения ответов
  async function showAnswers() {
    try {
      const urlParts = window.location.pathname.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      const stepNumber = parseInt(lastPart, 10);
      
      const div = createAnswersBox();
      
      const roomName = localStorage.getItem('skysmart_roomName');

      if (!roomName) {
        // Если нет кода, показываем только кнопку
        div.innerHTML = `
          <div class="content-wrapper">
            <h3>📚 Помощник Skysmart</h3>
            <div class="no-answers">
              Код задания не установлен
            </div>
            <button class="change-task-btn" id="changeTaskBtn">
              🔄 Установить код задания
            </button>
          </div>
        `;
        
        document.getElementById('changeTaskBtn').onclick = () => {
          showRoomInputModal(() => {
            showAnswers(); // Обновляем после ввода
          });
        };
        return;
      }

      if (isNaN(stepNumber)) {
        // Если не на странице с заданием
        div.innerHTML = `
          <div class="content-wrapper">
            <h3>📚 Помощник Skysmart</h3>
            <div class="no-answers">
              Откройте задание для просмотра ответов
              <br><br>
              <small>Текущий код: ${roomName}</small>
            </div>
            <button class="change-task-btn" id="changeTaskBtn">
              🔄 Сменить задание
            </button>
          </div>
        `;
        
        document.getElementById('changeTaskBtn').onclick = () => {
          showRoomInputModal(() => {
            showAnswers();
          });
        };
        return;
      }

      // Показываем загрузку
      div.innerHTML = `
        <div class="content-wrapper">
          <h3>📚 Помощник Skysmart</h3>
          <div class="no-answers">
            ⏳ Загрузка ответов...
            <br><br>
            <small>Код: ${roomName}</small>
          </div>
        </div>
      `;

      // Делаем запрос
      const response = await fetch('https://skysmart-answers.vercel.app/get_answers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName })
      });

      const data = await response.json();
      const answersArray = data[0];
      const index = stepNumber - 1;

      if (!answersArray || !answersArray[index] || !answersArray[index].answers) {
        div.innerHTML = `
          <div class="content-wrapper">
            <h3>📚 Помощник Skysmart</h3>
            <div class="error-message">
              ⚠️ Ответы не найдены для задания ${stepNumber}
              <br><br>
              <small>Код: ${roomName}</small>
            </div>
            <button class="change-task-btn" id="changeTaskBtn">
              🔄 Сменить задание
            </button>
          </div>
        `;
        
        document.getElementById('changeTaskBtn').onclick = () => {
          showRoomInputModal(() => {
            showAnswers();
          });
        };
        return;
      }

      const answers = answersArray[index].answers;

      // Отображаем ответы с кнопками копирования
      div.innerHTML = `
        <div class="content-wrapper">
          <h3>📚 Ответы (Задание ${stepNumber})</h3>
          <div class="answers-list">
            ${answers.map((answer, idx) => `
              <div class="answer-item">
                <span class="answer-text">${answer}</span>
                <button class="copy-btn" data-answer="${answer.replace(/"/g, '&quot;')}" data-index="${idx}">
                  📋
                </button>
              </div>
            `).join('')}
          </div>
          <button class="change-task-btn" id="changeTaskBtn">
            🔄 Сменить задание
          </button>
        </div>
      `;

      // Добавляем обработчики для кнопок копирования
      const copyButtons = div.querySelectorAll('.copy-btn');
      copyButtons.forEach(button => {
        button.onclick = function() {
          const answer = this.getAttribute('data-answer');
          copyToClipboard(answer, this);
        };
      });

      document.getElementById('changeTaskBtn').onclick = () => {
        showRoomInputModal(() => {
          showAnswers();
        });
      };

    } catch (e) {
      console.error('Ошибка при получении ответов:', e);
      
      const div = createAnswersBox();
      const roomName = localStorage.getItem('skysmart_roomName');
      
      div.innerHTML = `
        <div class="content-wrapper">
          <h3>📚 Помощник Skysmart</h3>
          <div class="error-message">
            ❌ Ошибка при загрузке ответов
            ${roomName ? `<br><br><small>Код: ${roomName}</small>` : ''}
          </div>
          <button class="change-task-btn" id="changeTaskBtn">
            🔄 Сменить задание
          </button>
        </div>
      `;
      
      document.getElementById('changeTaskBtn').onclick = () => {
        showRoomInputModal(() => {
          showAnswers();
        });
      };
    }
  }

  // Следим за изменением URL
  function observeUrlChanges(callback) {
    let oldHref = location.href;
    const body = document.querySelector('body');
    const observer = new MutationObserver(() => {
      if (oldHref !== location.href) {
        oldHref = location.href;
        callback();
      }
    });
    observer.observe(body, { childList: true, subtree: true });
  }

  // Первый запуск
  await showAnswers();

  // При смене задания
  observeUrlChanges(showAnswers);
})();

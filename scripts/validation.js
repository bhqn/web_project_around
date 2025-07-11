
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    
    // Objeto que rastreia quais campos foram tocados
    const touched = {};

    function getErrorElement(input) {
      // Encontra o elemento de erro como próximo irmão ou dentro do grupo do formulário
      return input.nextElementSibling?.classList?.contains('form__error') 
        ? input.nextElementSibling
        : input.closest('.form__group')?.querySelector('.form__error');
    }

    function validateInput(input) {
  const value = input.value.trim();
  const min = parseInt(input.getAttribute("minlength")) || 0;
  const max = parseInt(input.getAttribute("maxlength")) || Infinity;
  const errorElement = getErrorElement(input);
  const name = input.name;
  const isUrl = input.type === "url";

  if (touched[name] || value.length > 0) {
    if (value.length === 0) {
      showError(errorElement, input, config, "O campo deve ser preenchido");
      return false;
    }

    if (value.length < min || value.length > max) {
      showError(errorElement, input, config, `O campo deve ter entre ${min} e ${max} caracteres.`);
      return false;
    }

    if (isUrl && !isValidUrl(value)) {
      showError(errorElement, input, config, "Por favor, insira uma URL válida");
      return false;
    }

    hideError(errorElement, input, config);
  }

  return true;
}

function validateForm() {
  const inputs = document.querySelectorAll('.form__input'); // se ainda não tiver definido
  const inputsArray = Array.from(inputs); // garante que é array

  

  const hasInvalid = inputsArray.some((input, index) => {
    const isValid = validateInput(input);
    return !isValid;
  });

  if (submitButton) {
    submitButton.disabled = hasInvalid;
    submitButton.classList.toggle(config.inactiveButtonClass, hasInvalid);

   
  } else {
    console.warn("Botão submitButton não encontrado.");
  }

  return !hasInvalid;
}


    inputs.forEach((input) => {
      const name = input.name;
      touched[name] = false;

      // Marca como "tocado" no primeiro foco ou alteração
      const markAsTouched = () => {
        if (!touched[name]) {
          touched[name] = true;
          validateInput(input);
          validateForm();
        }
      };

      input.addEventListener('focus', markAsTouched);
      input.addEventListener('input', () => {
        markAsTouched();
        validateInput(input);
        validateForm();
      });
    });

    // Validação inicial
    validateForm();
  });
}

function showError(errorElement, input, config, message) {
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add(config.errorClass);
    errorElement.style.display = 'block';
  }
  input.classList.add(config.inputErrorClass);
}

function hideError(errorElement, input, config) {
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    errorElement.style.display = 'none';
  }
  input.classList.remove(config.inputErrorClass);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".edit__button-save",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });

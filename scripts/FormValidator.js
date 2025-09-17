export class FormValidator {
  constructor(config) {
    this.config = config;
    this.forms = document.querySelectorAll(config.formSelector);
    this.touched = {};
    this.init();
  }

  getErrorElement(input) {
    return input.nextElementSibling?.classList?.contains("form__error")
      ? input.nextElementSibling
      : input.closest(".form__group")?.querySelector(".form__error");
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  showError(errorElement, input, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add(this.config.errorClass);
      errorElement.style.display = "block";
    }
    input.classList.add(this.config.inputErrorClass);
  }

  hideError(errorElement, input) {
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
      errorElement.style.display = "none";
    }
    input.classList.remove(this.config.inputErrorClass);
  }

  validateInput(input) {
    const value = input.value.trim();
    const min = parseInt(input.getAttribute("minlength")) || 0;
    const max = parseInt(input.getAttribute("maxlength")) || Infinity;
    const errorElement = this.getErrorElement(input);
    const name = input.name;
    const isUrl = input.type === "url";

    if (this.touched[name] || value.length > 0) {
      if (value.length === 0) {
        this.showError(errorElement, input, "O campo deve ser preenchido");
        return false;
      }
      if (value.length < min || value.length > max) {
        this.showError(
          errorElement,
          input,
          `O campo deve ter entre ${min} e ${max} caracteres.`
        );
        return false;
      }
      if (isUrl && !this.isValidUrl(value)) {
        this.showError(errorElement, input, "Por favor, insira uma URL válida");
        return false;
      }
      this.hideError(errorElement, input);
      return true;
    }
    return false; // Retorna false se o campo não foi tocado
  }

  validateForm(form, submitButton) {
    const inputs = form.querySelectorAll(this.config.inputSelector);
    const inputsArray = Array.from(inputs);

    // Verifica se TODOS os campos obrigatórios são válidos
    const allValid = inputsArray.every((input) => this.validateInput(input));
    
    // Verifica se TODOS os campos obrigatórios foram tocados
    const allRequiredTouched = inputsArray.every((input) => {
      if (input.required) {
        return this.touched[input.name] || input.value.length > 0;
      }
      return true; // Campos não obrigatórios são considerados "touched"
    });

    if (submitButton) {
      // Desabilita o botão se nem todos os campos estão válidos OU não foram tocados
      submitButton.disabled = !(allValid && allRequiredTouched);
      submitButton.classList.toggle(this.config.inactiveButtonClass, !(allValid && allRequiredTouched));
    }

    return allValid && allRequiredTouched;
  }

  init() {
    this.forms.forEach((form) => {
      const inputs = form.querySelectorAll(this.config.inputSelector);
      const submitButton = form.querySelector(this.config.submitButtonSelector);
      
      // Inicialmente desabilita o botão
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add(this.config.inactiveButtonClass);
      }

      inputs.forEach((input) => {
        const name = input.name;
        this.touched[name] = false;
        
        const markAsTouched = () => {
          if (!this.touched[name]) {
            this.touched[name] = true;
          }
          this.validateInput(input);
          this.validateForm(form, submitButton);
        };

        input.addEventListener("focus", markAsTouched);
        input.addEventListener("input", markAsTouched);
        input.addEventListener("blur", markAsTouched);
      });

      // Validação inicial
      this.validateForm(form, submitButton);
    });
  }
}
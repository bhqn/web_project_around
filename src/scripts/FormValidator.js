export class FormValidator {
  constructor(config, formElement) { // lembrar de passar o formelement  no escopo
    this.config = config;
    this.formElement = formElement; 
    this.touched = {};
    this.urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i; // regex continua aqui
  }

  getErrorElement(input) {
    return input.nextElementSibling?.classList?.contains("form__error")
      ? input.nextElementSibling
      : input.closest(".form__group")?.querySelector(".form__error");
  }

  isValidUrl(str) {
    return this.urlRegex.test(str);
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
    return false;
  }

  validateForm(form, submitButton) {
    const inputs = form.querySelectorAll(this.config.inputSelector);
    const inputsArray = Array.from(inputs);

    const allValid = inputsArray.every((input) => this.validateInput(input));

    const allRequiredTouched = inputsArray.every((input) => {
      if (input.required) {
        return this.touched[input.name] || input.value.length > 0;
      }
      return true;
    });

    if (submitButton) {
      submitButton.disabled = !(allValid && allRequiredTouched);
      submitButton.classList.toggle(
        this.config.inactiveButtonClass,
        !(allValid && allRequiredTouched)
      );
    }

    return allValid && allRequiredTouched;
  }

  init() {
    const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
    const submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector
    );

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
        this.validateForm(this.formElement, submitButton);
      };

      input.addEventListener("focus", markAsTouched);
      input.addEventListener("input", markAsTouched);
      input.addEventListener("blur", markAsTouched);
    });

    this.validateForm(this.formElement, submitButton);
  }

  enableValidation() {
    this.init();
  }
}

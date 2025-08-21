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
    }
    return true;
  }

validateForm(form, submitButton) {
  const inputs = form.querySelectorAll(this.config.inputSelector);
  const inputsArray = Array.from(inputs);

// desabilita o botao antes de ser tocado
  const someTouched = inputsArray.some((input) => this.touched[input.name]);
  if (!someTouched) {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add(this.config.inactiveButtonClass);
    }
    return false;
  }

  const hasInvalid = inputsArray.some((input) => !this.validateInput(input));

  if (submitButton) {
    submitButton.disabled = hasInvalid;
    submitButton.classList.toggle(this.config.inactiveButtonClass, hasInvalid);
  }

  return !hasInvalid;
}

  init() {
    this.forms.forEach((form) => {
      const inputs = form.querySelectorAll(this.config.inputSelector);
      const submitButton = form.querySelector(this.config.submitButtonSelector);
      submitButton.disabled = true;
      inputs.forEach((input) => {
        const name = input.name;
        this.touched[name] = false;
        const markAsTouched = () => {
          if (!this.touched[name]) {
            this.touched[name] = true;
            this.validateInput(input);
            this.validateForm(form, submitButton);
          }
        };
        input.addEventListener("focus", markAsTouched);
        input.addEventListener("input", () => {
          markAsTouched();
          this.validateInput(input);
          this.validateForm(form, submitButton);
        });
      });
      this.validateForm(form, submitButton);
    });
  }
}


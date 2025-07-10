document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputs = form.querySelectorAll(".form__input");
  const errors = form.querySelectorAll(".form__error");
  const submitBtn = form.querySelector(".edit__button-save");

  // Objeto que rastreia quais campos foram tocados
  const touched = {};

  function validateInputs() {
    let allValid = true;

    inputs.forEach((input, index) => {
      const value = input.value.trim();
      const min = parseInt(input.getAttribute("minlength"));
      const max = parseInt(input.getAttribute("maxlength"));
      const errorElement = errors[index];
      const name = input.name;
      

      // Só exibe erro se o campo já foi tocado
      if (touched[name]) {
    if (value.length === 0){
            errorElement.textContent = `O campo deve ser preenchido`
            errorElement.classList.add("active");
            allValid = false;
            console.log("teste")
            input.style.borderBottom = "1px solid red";

        }


        else if (value.length < min || value.length > max) {
          errorElement.textContent = `O campo deve ter entre ${min} e ${max} caracteres.`;
          errorElement.classList.add("active");
          input.style.borderBottom = "1px solid red";
          allValid = false;
        }  else {
          errorElement.textContent = "";
          errorElement.classList.remove("active");
          input.style.borderBottom = "1px solid #545454";
        }
      }

      // Mesmo que o campo não tenha sido tocado, ele ainda pode ser inválido
      if (value.length < min || value.length > max) {
        allValid = false;
      }
    });

    submitBtn.disabled = !allValid;
  }

  inputs.forEach((input) => {
    const name = input.name;

    // Marca como "tocado" no primeiro foco
    input.addEventListener("focus", () => {
      touched[name] = true;
    });

    // Valida ao digitar
    input.addEventListener("input", validateInputs);
  });

  // Desativa botão no carregamento inicial
  submitBtn.disabled = true;
});

//
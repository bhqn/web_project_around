  const initialCards = [
    {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
      name: "Parque Nacional da Vanoise ",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
  ];

  function createGalleryCard({ name, link }) {
    const template = document.getElementById('gallery__template');
    const clone = template.content.cloneNode(true);

    const image = clone.querySelector('.gallery__image');
    const title = clone.querySelector('.card__title');
    const removeButton = clone.querySelector('.card__button-remove');

    image.src = link;
    image.alt = name;
    title.textContent = name;

    removeButton.addEventListener('click', () => {
        removeButton.closest('.gallery__card').remove();
      console.log("remove");
    });

    document.querySelector('.gallery').appendChild(clone);
  }

  // Gerar todos os cards
  initialCards.forEach(createGalleryCard);
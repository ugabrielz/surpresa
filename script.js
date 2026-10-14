(() => {
  "use strict";
  const loader = document.getElementById("loader");
  const reveal = document.getElementById("reveal");
  const image = document.getElementById("surprise-image");
  const petalField = document.querySelector(".petal-field");
  const LOADER_DURATION = 3000;

  // Pétalas decorativas criadas sem bibliotecas externas.
  const petals = ["✿", "❀", "♥"];
  for (let i = 0; i < 12; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = petals[i % petals.length];
    petal.style.left = `${(i * 37 + 9) % 100}%`;
    petal.style.fontSize = `${10 + (i % 4) * 4}px`;
    petal.style.setProperty("--duration", `${7 + (i % 5) * 1.4}s`);
    petal.style.setProperty("--delay", `${(i % 7) * -1.1}s`);
    petalField.appendChild(petal);
  }

  image.addEventListener("error", () => {
    console.error('Não foi possível carregar "imagem.jpg". Confira se está na mesma pasta que index.html.');
    image.alt = "Não foi possível carregar a foto. Confira o arquivo imagem.jpg.";
  });

  function revealSurprise() {
    loader.classList.add("is-hidden");
    reveal.classList.add("is-visible");
    reveal.setAttribute("aria-hidden", "false");
  }

  const start = performance.now();
  const revealAfterLoader = () => {
    const remaining = Math.max(0, LOADER_DURATION - (performance.now() - start));
    window.setTimeout(revealSurprise, remaining);
  };

  if (image.complete) {
    revealAfterLoader();
  } else {
    image.addEventListener("load", revealAfterLoader, { once: true });
    image.addEventListener("error", revealAfterLoader, { once: true });
    // Evita deixar o loader preso se a imagem demorar demais para carregar.
    window.setTimeout(() => {
      if (!reveal.classList.contains("is-visible")) revealSurprise();
    }, LOADER_DURATION + 1500);
  }
})();

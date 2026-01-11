  const follajeIzq = document.getElementById("follaje-izquierdo");
  const follajeDer = document.getElementById("follaje-derecho");

  let animacionesTerminadas = 0;

  function mostrarContenido() {
    animacionesTerminadas++;
    if (animacionesTerminadas === 2) {
      document.querySelector("header").classList.add("mostrar");
      document.querySelector("main").classList.add("mostrar");
    }
  }

  follajeIzq.addEventListener("animationend", mostrarContenido);
  follajeDer.addEventListener("animationend", mostrarContenido);

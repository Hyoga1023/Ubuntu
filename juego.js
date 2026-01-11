// Estado del juego
let gameState = {
  currentTeam: 1,
  team1Position: 0,
  team2Position: 0,
  team1Score: 0,
  team2Score: 0,
  rolling: false,
  currentChallenge: null,
};

// Configuración del dado
const DICE_MAX = 4;

// Definición de desafíos por pilar
const challenges = {
  perspectiva: [
    {
      title: "Perspectiva",
      description:
        "Porque una buena idea también se puede dibujar, aunque no seas artista.",
      prompt:
        "Un integrante recibe una palabra por chat interno y la representa visualmente. El equipo intenta adivinar antes de que termine el tiempo.",
      time: 60,
      points: 150,
      icon: "🎨",
    },
    {
      title: "Perspectiva",
      description:
        "Aquí se mide la capacidad de representar ideas sin decir ni una palabra.",
      prompt:
        "Un integrante recibe por chat interno un concepto abstracto. Lo representa y el equipo intenta descifrarlo.",
      time: 60,
      points: 160,
      icon: "🧠",
    },
  ],
  humildad: [
    {
      title: "Humildad",
      description: "La humildad es reconocer lo que NO sabemos. Unica casilla en que no se dibuja",
      prompt:
        "Cada miembro comparta algo que no domina pero que otro compañero sí. Reconozcan las fortalezas ajenas.",
      time: 50,
      points: 130,
      icon: "🙏",
    },
  ],
  humor: [
    {
      title: "Humor - Desastre Visual Controlado",
      description:
        "Mientras más raro quede, más se ríen. Eso también cuenta como éxito.",
      prompt:
        "Un integrante recibe una palabra relacionada con situaciones cómicas de trabajo y la representa. El equipo intenta adivinar.",
      time: 50,
      points: 150,
      icon: "🤣",
    },
  ],
  aceptacion: [
    {
      title: "Aceptación",
      description:
        "Aceptar realidades también puede verse reflejado con trazos y creatividad.",
      prompt:
        "Un integrante recibe una palabra relacionada con aceptación y la representa visualmente. El equipo intenta descifrarla.",
      time: 55,
      points: 150,
      icon: "🌊",
    },
  ],
  perdon: [
    {
      title: "Perdón",
      description:
        "Aquí se representa el acto de liberar carga emocional… versión dibujo casero.",
      prompt:
        "Un integrante recibe una palabra relacionada con perdón y la representa. El equipo debe adivinar.",
      time: 55,
      points: 150,
      icon: "🕊️",
    },
  ],
  gratitud: [
    {
      title: "Gratitud",
      description: "Agradecer también puede volverse visual y significativo.",
      prompt:
        "Un integrante recibe por chat interno una palabra relacionada con gratitud y la representa para que el equipo la adivine.",
      time: 60,
      points: 170,
      icon: "🙌",
    },
  ],
  compasion: [
    {
      title: "Compasión",
      description:
        "Comprender al otro también puede empezar con un dibujo torcido.",
      prompt:
        "Un integrante recibe una palabra relacionada con empatía y apoyo. La representa y el equipo intenta descifrarla.",
      time: 60,
      points: 150,
      icon: "💞",
    },
  ],
  generosidad: [
    {
      title: "Generosidad",
      description:
        "Aquí se refleja cuando alguien ofrece, comparte o acompaña.",
      prompt:
        "Un integrante recibe por chat interno una palabra relacionada con generosidad. La representa y el equipo intenta acertar.",
      time: 55,
      points: 160,
      icon: "🎁",
    },
  ],
};

// Definición del tablero
const boardSpaces = [
  { type: "inicio", label: "INICIO", icon: "🚀", color: "inicio" },
  {
    type: "perspectiva",
    label: "Perspectiva",
    icon: "🔍",
    color: "perspectiva",
  },
  { type: "humildad", label: "Humildad", icon: "🙏", color: "humildad" },
  { type: "union", label: "Unión", icon: "🤝", color: "union" },
  { type: "humor", label: "Humor", icon: "😄", color: "humor" },
  { type: "aceptacion", label: "Aceptación", icon: "🌊", color: "aceptacion" },
  { type: "obstaculo", label: "Obstáculo", icon: "⚠️", color: "obstaculo" },
  { type: "perdon", label: "Perdón", icon: "🕊️", color: "perdon" },
  { type: "gratitud", label: "Gratitud", icon: "🙌", color: "gratitud" },
  { type: "union", label: "Unión", icon: "🤝", color: "union" },
  { type: "compasion", label: "Compasión", icon: "💝", color: "compasion" },
  {
    type: "generosidad",
    label: "Generosidad",
    icon: "🎁",
    color: "generosidad",
  },
  { type: "obstaculo", label: "Obstáculo", icon: "⚠️", color: "obstaculo" },
  {
    type: "perspectiva",
    label: "Perspectiva",
    icon: "🔍",
    color: "perspectiva",
  },
  { type: "gratitud", label: "Gratitud", icon: "🙌", color: "gratitud" },
  { type: "meta", label: "META", icon: "🏆", color: "meta" },
];

// Variables para el temporizador del modal
let modalInterval = null;
let modalTimeLeft = 0;

// Utilidad: Generar número aleatorio entre 1 y max
function getRandomDiceValue(max = DICE_MAX) {
  return Math.floor(Math.random() * max) + 1;
}

// Utilidad: Actualizar puntuación de un equipo
function addPointsToTeam(team, points) {
  if (team === 1) {
    gameState.team1Score = Math.max(0, gameState.team1Score + points);
  } else {
    gameState.team2Score = Math.max(0, gameState.team2Score + points);
  }
  updateScores();
}

// Crear el tablero
function createBoard() {
  const board = document.getElementById("board");
  const totalSpaces = boardSpaces.length;
  const radius = 280;

  boardSpaces.forEach((space, index) => {
    const angle = (index / totalSpaces) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius + 350;
    const y = Math.sin(angle) * radius + 350;

    const spaceDiv = document.createElement("div");
    spaceDiv.className = `board-space ${space.color}`;
    spaceDiv.style.left = `${x - 45}px`;
    spaceDiv.style.top = `${y - 45}px`;
    spaceDiv.innerHTML = `
            <div class="icon">${space.icon}</div>
            <div class="label">${space.label}</div>
        `;
    spaceDiv.id = `space-${index}`;

    board.appendChild(spaceDiv);
  });

  updateMarkers();
}

// Actualizar marcadores de equipos
function updateMarkers() {
  // Limpiar marcadores anteriores
  document.querySelectorAll(".team-marker").forEach((m) => m.remove());

  // Función helper para crear marcador
  const createMarker = (teamNum, position) => {
    const space = document.getElementById(`space-${position}`);
    if (space) {
      const marker = document.createElement("div");
      marker.className = `team-marker marker-team${teamNum}`;
      marker.textContent = teamNum;
      space.appendChild(marker);
    }
  };

  // Agregar marcadores
  createMarker(1, gameState.team1Position);
  createMarker(2, gameState.team2Position);

  // Actualizar posiciones en UI
  document.getElementById("pos1").textContent = gameState.team1Position + 1;
  document.getElementById("pos2").textContent = gameState.team2Position + 1;
}

// Lanzar dado
function rollDice() {
  if (gameState.rolling) return;

  gameState.rolling = true;
  const dice = document.getElementById("dice");
  const rollBtn = document.getElementById("rollBtn");

  dice.classList.add("rolling");
  rollBtn.disabled = true;

  let rolls = 0;
  const rollInterval = setInterval(() => {
    document.getElementById("diceValue").textContent = getRandomDiceValue();
    rolls++;

    if (rolls > 15) {
      clearInterval(rollInterval);
      const finalValue = getRandomDiceValue();
      document.getElementById("diceValue").textContent = finalValue;
      dice.classList.remove("rolling");

      setTimeout(() => {
        movePlayer(finalValue);
        gameState.rolling = false;
        rollBtn.disabled = false;
      }, 500);
    }
  }, 100);
}

// Mover jugador
function movePlayer(steps) {
  const currentPos =
    gameState.currentTeam === 1
      ? gameState.team1Position
      : gameState.team2Position;
  const newPos = Math.min(currentPos + steps, boardSpaces.length - 1);

  if (gameState.currentTeam === 1) {
    gameState.team1Position = newPos;
  } else {
    gameState.team2Position = newPos;
  }

  updateMarkers();

  setTimeout(() => {
    handleSpaceLanding(newPos);
  }, 600);
}

// Manejar llegada a casilla
function handleSpaceLanding(position) {
  const space = boardSpaces[position];

  if (space.type === "inicio" || space.type === "meta") {
    if (space.type === "meta") {
      alert(`🏆 ¡El Equipo ${gameState.currentTeam} ha llegado a la META!`);
    }
    switchTeam();
  } else if (space.type === "union") {
    // Ambos equipos ganan puntos
    addPointsToTeam(1, 75);
    addPointsToTeam(2, 75);
    alert(
      '🤝 ¡Casilla de Unión! Ambos equipos ganan 75 puntos. "Yo soy porque nosotros somos"'
    );
    switchTeam();
  } else if (space.type === "obstaculo") {
    alert(
      "⚠️ Obstáculo: El miedo, la ira o la tristeza bloquean la alegría. Pierden 50 puntos y un turno."
    );
    addPointsToTeam(gameState.currentTeam, -50);
    switchTeam();
  } else if (challenges[space.type]) {
    // Mostrar desafío del pilar
    showChallenge(space.type);
  }
}

// Mostrar desafío
function showChallenge(pillarType) {
  const pillarChallenges = challenges[pillarType];
  const challenge =
    pillarChallenges[Math.floor(Math.random() * pillarChallenges.length)];

  gameState.currentChallenge = challenge;

  const modal = document.getElementById("challengeModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.className = `modal-content ${pillarType}`;

  document.getElementById("modalIcon").textContent = challenge.icon;
  document.getElementById("modalTitle").textContent = challenge.title;
  document.getElementById("challengeDescription").textContent =
    challenge.description;
  document.getElementById("challengePrompt").textContent = challenge.prompt;
  document.getElementById("challengePoints").textContent = challenge.points;

  // Mostrar temporizador pero NO iniciarlo automáticamente
  const timerBox = document.getElementById("timer");
  timerBox.style.display = "flex";
  document.getElementById("timeLeft").textContent = challenge.time;

  modal.classList.add("show");
}

// Iniciar temporizador del modal (unificado)
function startModalTimer() {
  const timeSpan = document.getElementById("timeLeft");

  if (modalInterval) clearInterval(modalInterval);

  modalTimeLeft = parseInt(timeSpan.textContent);

  modalInterval = setInterval(() => {
    modalTimeLeft--;
    timeSpan.textContent = modalTimeLeft;

    if (modalTimeLeft <= 0) {
      clearInterval(modalInterval);
      finishChallengeByTime();
    }
  }, 1000);
}

// Finalizar desafío por tiempo
function finishChallengeByTime() {
  const modal = document.getElementById("challengeModal");
  modal.classList.remove("show");

  Swal.fire({
    title: "⏱️ Tiempo terminado",
    text: "¿El equipo logró completar el desafío?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "✅ Sí lo lograron",
    cancelButtonText: "❌ No lo lograron",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      addPointsToTeam(gameState.currentTeam, gameState.currentChallenge.points);

      Swal.fire({
        title: "🎉 ¡Bien hecho!",
        text: `Se sumaron ${gameState.currentChallenge.points} puntos`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "😥 No pasó nada",
        text: "El equipo no consiguió superar el reto",
        icon: "info",
        timer: 1200,
        showConfirmButton: false,
      });
    }

    setTimeout(() => {
      switchTeam();
    }, 1200);
  });
}

// Completar desafío manualmente (si existe el botón)
function completeChallenge(success) {
  if (modalInterval) {
    clearInterval(modalInterval);
    modalInterval = null;
  }

  const modal = document.getElementById("challengeModal");
  modal.classList.remove("show");

  if (success && gameState.currentChallenge) {
    addPointsToTeam(gameState.currentTeam, gameState.currentChallenge.points);
  }

  setTimeout(() => {
    switchTeam();
  }, 300);
}

// Cambiar turno
function switchTeam() {
  gameState.currentTeam = gameState.currentTeam === 1 ? 2 : 1;
  updateUI();
}

// Actualizar puntuaciones
function updateScores() {
  document.getElementById("score1").textContent = gameState.team1Score;
  document.getElementById("score2").textContent = gameState.team2Score;
}

// Actualizar UI
function updateUI() {
  const team1Card = document.getElementById("team1Card");
  const team2Card = document.getElementById("team2Card");
  const currentTeamDisplay = document.getElementById("currentTeamDisplay");

  if (gameState.currentTeam === 1) {
    team1Card.classList.add("active");
    team2Card.classList.remove("active");
    currentTeamDisplay.textContent = "Equipo 1";
  } else {
    team2Card.classList.add("active");
    team1Card.classList.remove("active");
    currentTeamDisplay.textContent = "Equipo 2";
  }
}

// Inicializar juego
window.onload = function () {
  createBoard();
  updateUI();
};

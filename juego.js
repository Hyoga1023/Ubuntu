// Estado del juego
let gameState = {
  currentTeam: 1,
  team1Position: 0,
  team2Position: 0,
  team1Score: 0,
  team2Score: 0,
  rolling: false,
  currentChallenge: null,
  lastRollValue: null,
  lastRollTeam: null,
  team1LastObstaclePosition: null,
  team2LastObstaclePosition: null,
  team1TurnBlocked: false,
  team2TurnBlocked: false,
};

// ============= SISTEMA DE AUDIO (DECLARADO AL INICIO) =============

// Gestor de audio (declarado como variable global en window)
window.audioManager = {
  challengeSongs: [
    "audio/the_benny_hill_show.mp3",
    "audio/monkeys_spinning_monkeys.mp3",
    "audio/curb_your_enthusiasm.mp3",
  ],
  lastChallengeIndex: null,
  currentAudio: null,
  audioEnabled: true,

  // Precargar audios
  preloadAudio() {
    console.log("🎵 Precargando audios...");

    this.missionImpossible = new Audio("audio/mission_impossible.mp3");
    this.jingleAllTheWay = new Audio("audio/jingle_all_the_way.mp3");
    this.elJuegoDelCalamar = new Audio("audio/el_juego_del_calamar.mp3");

    this.missionImpossible.loop = false;
    this.jingleAllTheWay.loop = false;
    this.elJuegoDelCalamar.loop = false;

    this.missionImpossible.addEventListener("loadeddata", () => {
      console.log("✅ Mission Impossible cargado");
    });
    this.missionImpossible.addEventListener("error", (e) => {
      console.error("❌ Error cargando Mission Impossible:", e);
    });

    this.elJuegoDelCalamar.addEventListener("loadeddata", () => {
      console.log("✅ El Juego del Calamar cargado");
    });
    this.elJuegoDelCalamar.addEventListener("error", (e) => {
      console.error("❌ Error cargando El Juego del Calamar:", e);
    });

    this.jingleAllTheWay.addEventListener("loadeddata", () => {
      console.log("✅ Jingle All The Way cargado");
    });
    this.jingleAllTheWay.addEventListener("error", (e) => {
      console.error("❌ Error cargando Jingle All The Way:", e);
    });

    console.log("🎵 Audios preconfigurados");
  },

  getRandomChallengeSong() {
    let availableIndices = [0, 1, 2];

    if (this.lastChallengeIndex !== null) {
      availableIndices = availableIndices.filter(
        (i) => i !== this.lastChallengeIndex,
      );
    }

    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.lastChallengeIndex = randomIndex;

    return this.challengeSongs[randomIndex];
  },

  playChallenge() {
    console.log("🎵 playChallenge() llamado");

    if (!this.audioEnabled) {
      console.log("🔇 Audio deshabilitado");
      return;
    }

    this.stop();

    const songUrl = this.getRandomChallengeSong();
    console.log("🎵 Intentando reproducir:", songUrl);

    this.currentAudio = new Audio(songUrl);
    this.currentAudio.volume = 0.1;

    this.currentAudio.addEventListener("loadeddata", () => {
      console.log("✅ Audio de desafío cargado:", songUrl);
    });

    this.currentAudio.addEventListener("error", (e) => {
      console.error("❌ Error cargando audio de desafío:", songUrl, e);
    });

    this.currentAudio
      .play()
      .then(() => {
        console.log("▶️ Reproduciendo:", songUrl);
      })
      .catch((err) => {
        console.error("❌ Error al reproducir:", err);
      });
  },

  playElJuegoDelCalamar() {
    console.log('🎵 Reproduciendo El Juego del Calamar');
    
    if (!this.audioEnabled) {
      console.log('🔇 Audio deshabilitado');
      return;
    }
    
    this.stop();
    this.currentAudio = this.elJuegoDelCalamar;
    this.currentAudio.currentTime = 0;
    this.currentAudio.volume = 0.1;
    
    this.currentAudio.play()
      .then(() => {
        console.log('▶️ El Juego del Calamar sonando');
      })
      .catch(err => {
        console.error('❌ Error al reproducir El Juego del Calamar:', err);
      });
  },

  playMissionImpossible() {
    console.log("🎵 Reproduciendo Mission Impossible");

    if (!this.audioEnabled) {
      console.log("🔇 Audio deshabilitado");
      return;
    }

    this.stop();
    this.currentAudio = this.missionImpossible;
    this.currentAudio.currentTime = 0;
    this.currentAudio.volume = 0.1;

    this.currentAudio
      .play()
      .then(() => {
        console.log("▶️ Mission Impossible sonando");
      })
      .catch((err) => {
        console.error("❌ Error al reproducir Mission Impossible:", err);
      });
  },

  playJingleAllTheWay() {
    console.log("🎵 Reproduciendo Jingle All The Way");

    if (!this.audioEnabled) {
      console.log("🔇 Audio deshabilitado");
      return;
    }

    this.stop();
    this.currentAudio = this.jingleAllTheWay;
    this.currentAudio.currentTime = 0;
    this.currentAudio.volume = 0.1;

    this.currentAudio
      .play()
      .then(() => {
        console.log("▶️ Jingle All The Way sonando");
      })
      .catch((err) => {
        console.error("❌ Error al reproducir Jingle All The Way:", err);
      });
  },

  stop() {
    if (this.currentAudio) {
      console.log("⏹️ Deteniendo audio");
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  },

  // Prueba de audio (para desbloquear autoplay)
  testAudio() {
    console.log("🔊 Prueba de audio iniciada");
    const testSound = new Audio("audio/the_benny_hill_show.mp3");
    testSound.volume = 0.1;
    testSound
      .play()
      .then(() => {
        console.log("✅ Audio funcionando correctamente");
        testSound.pause();
        alert(
          "✅ Audio habilitado! Ahora el juego reproducirá música automáticamente.",
        );
      })
      .catch((err) => {
        console.error("❌ Error en prueba de audio:", err);
        alert(
          "❌ No se pudo reproducir el audio. Revisa la consola (F12) para más detalles.",
        );
      });
  }
};

// Inicializar audios inmediatamente
window.audioManager.preloadAudio();

/*-------------------------------------------------------------------------------------------------------------- */

// Configuración del dado
const DICE_MAX = 3;

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
      description: "Reconocer nuestras limitaciones también puede dibujarse.",
      prompt:
        "Un integrante recibe una palabra relacionada con humildad y la representa visualmente. El equipo intenta adivinar.",
      time: 55,
      points: 140,
      icon: "🙏",
    },
  ],
  humor: [
    {
      title: "Humor - Desastre Visual Controlado",
      description: "Mientras más raro quede, mejor.",
      prompt:
        "Un integrante recibe una palabra, la dibuja y sus compañeros deben adivinar que representa.",
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
  locontrario: [
    {
      title: "Lo Contrario",
      description: "A veces lo mejor es pensar al revés para ver con claridad.",
      prompt:
        "Un integrante recibe una palabra por chat interno. Debe dibujar LO CONTRARIO de esa palabra y el equipo debe adivinar cuál era la palabra CONTRARIA.",
      time: 70,
      points: 180,
      icon: "🔄",
    },
  ],
};

// Definición del tablero
const boardSpaces = [
  { type: "inicio", label: "INICIO", icon: "inicio", color: "inicio" },
  {
    type: "perspectiva",
    label: "Perspectiva",
    icon: "perspectiva",
    color: "perspectiva",
  },
  { type: "humildad", label: "Humildad", icon: "humildad", color: "humildad" },
  { type: "union", label: "Unión", icon: "union", color: "union" },
  { type: "humor", label: "Humor", icon: "humor", color: "humor" },
  {
    type: "aceptacion",
    label: "Aceptación",
    icon: "aceptacion",
    color: "aceptacion",
  },
  {
    type: "retoequipo",
    label: "Reto en Equipo",
    icon: "retoequipo",
    color: "retoequipo",
  },
  {
    type: "obstaculo",
    label: "Obstáculo",
    icon: "obstaculo",
    color: "obstaculo",
  },
  { type: "perdon", label: "Perdón", icon: "perdon", color: "perdon" },
  { type: "gratitud", label: "Gratitud", icon: "gratitud", color: "gratitud" },
  { type: "union", label: "Unión", icon: "union", color: "union" },
  {
    type: "compasion",
    label: "Compasión",
    icon: "compasion",
    color: "compasion",
  },
  {
    type: "locontrario",
    label: "Lo Contrario",
    icon: "locontrario",
    color: "locontrario",
  },
  {
    type: "generosidad",
    label: "Generosidad",
    icon: "generosidad",
    color: "generosidad",
  },
  {
    type: "perspectiva",
    label: "Perspectiva",
    icon: "perspectiva",
    color: "perspectiva",
  },
  {
    type: "trampa",
    label: "Juntos pero no revueltos",
    icon: "trampa",
    color: "trampa",
  },
  {
    type: "obstaculo",
    label: "Obstáculo",
    icon: "obstaculo",
    color: "obstaculo",
  },
  { type: "gratitud", label: "Gratitud", icon: "gratitud", color: "gratitud" },
  { type: "meta", label: "META", icon: "meta", color: "meta" },
];

// Variables para el temporizador del modal
let modalInterval = null;
let modalTimeLeft = 0;

// ============= UTILIDADES =============

// Generar número aleatorio entre 1 y max
function getRandomDiceValue(max = DICE_MAX) {
  return Math.floor(Math.random() * max) + 1;
}

// Generar número con sesgo (evitar repetir el último valor)
function getBiasedDiceValue(lastValue, max = DICE_MAX) {
  // Solo 10% de probabilidad de que salga el mismo número
  const avoidRepeat = Math.random() > 0.1;

  if (avoidRepeat && lastValue !== null) {
    // Crear array con todos los números excepto el último
    const availableNumbers = [];
    for (let i = 1; i <= max; i++) {
      if (i !== lastValue) {
        availableNumbers.push(i);
      }
    }
    // Retornar un número aleatorio del array
    return availableNumbers[
      Math.floor(Math.random() * availableNumbers.length)
    ];
  }

  // Si no evitamos repetición, generar normal
  return getRandomDiceValue(max);
}

// Actualizar puntuación de un equipo
function addPointsToTeam(team, points) {
  if (team === 1) {
    gameState.team1Score = Math.max(0, gameState.team1Score + points);
  } else {
    gameState.team2Score = Math.max(0, gameState.team2Score + points);
  }
  updateScores();
}

// ============= TABLERO =============

// Crear el tablero
function createBoard() {
  const board = document.getElementById("board");
  const totalSpaces = boardSpaces.length;
  const radius = 330;

  boardSpaces.forEach((space, index) => {
    const angle = (index / totalSpaces) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius + 350;
    const y = Math.sin(angle) * radius + 350;

    const spaceDiv = document.createElement("div");
    spaceDiv.className = `board-space ${space.color}`;
    spaceDiv.style.left = `${x - 40}px`;
    spaceDiv.style.top = `${y - 40}px`;
    spaceDiv.innerHTML = `
      <div class="icon icon-${space.icon}"></div>
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

  // Función helper para crear marcadores
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

// ============= DADO =============

// Lanzar dado
function rollDice() {
  if (gameState.rolling) return;

  // Verificar si el turno está bloqueado
  const isBlocked =
    gameState.currentTeam === 1
      ? gameState.team1TurnBlocked
      : gameState.team2TurnBlocked;

  if (isBlocked) {
    Swal.fire({
      title: "🚫 Turno Bloqueado",
      text: `El Equipo ${gameState.currentTeam} pierde este turno por haber perdido el Reto en Equipo`,
      icon: "warning",
      timer: 3000,
      showConfirmButton: false,
    });

    // Desbloquear y cambiar turno
    if (gameState.currentTeam === 1) {
      gameState.team1TurnBlocked = false;
    } else {
      gameState.team2TurnBlocked = false;
    }

    setTimeout(() => {
      switchTeam();
    }, 3000);

    return;
  }

  gameState.rolling = true;

  const dice = document.getElementById("dice");
  const rollBtn = document.getElementById("rollBtn");
  const diceValueEl = document.getElementById("diceValue");

  rollBtn.disabled = true;
  dice.classList.add("rolling");

  const fakeRolls = 12;
  let count = 0;

  const animate = () => {
    // Mostrar números aleatorios durante la animación
    diceValueEl.textContent = getRandomDiceValue(DICE_MAX);
    count++;

    if (count < fakeRolls) {
      requestAnimationFrame(() => setTimeout(animate, 80));
    } else {
      const team1Pos = gameState.team1Position;
      const team2Pos = gameState.team2Position;
      const diff = Math.abs(team1Pos - team2Pos);

      const currentTeamPos = gameState.currentTeam === 1 ? team1Pos : team2Pos;
      const otherTeamPos = gameState.currentTeam === 1 ? team2Pos : team1Pos;

      const isLeading = currentTeamPos > otherTeamPos;
      const shouldNerf = isLeading && diff >= 3;

      let finalValue;

      if (shouldNerf) {
        // Solo puede sacar 1 o 2
        finalValue = Math.random() < 0.5 ? 1 : 2;
      } else {
        finalValue =
          gameState.lastRollValue !== null
            ? getBiasedDiceValue(gameState.lastRollValue, DICE_MAX)
            : getRandomDiceValue(DICE_MAX);
      }

      diceValueEl.textContent = finalValue;
      dice.classList.remove("rolling");

      // Guardar el último valor y equipo
      gameState.lastRollValue = finalValue;
      gameState.lastRollTeam = gameState.currentTeam;

      setTimeout(() => {
        movePlayer(finalValue);
        gameState.rolling = false;
        rollBtn.disabled = false;
      }, 300);
    }
  };

  animate();
}

// ============= MOVIMIENTO =============

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
      // 🎵 Reproducir Jingle All The Way
      window.audioManager.playJingleAllTheWay();

      addPointsToTeam(gameState.currentTeam, 1000);
      alert(
        `🏆 ¡El Equipo ${gameState.currentTeam} ha llegado a la META y gana 1000 puntos!`,
      );
    }
    switchTeam();
  } else if (space.type === "union") {
    // Ambos equipos ganan puntos
    addPointsToTeam(1, 75);
    addPointsToTeam(2, 75);
    alert(
      '🤝 ¡Casilla de Unión! Ambos equipos ganan 75 puntos. "Yo soy porque nosotros somos"',
    );
    switchTeam();
  } else if (space.type === "obstaculo") {
    // Verificar si ya cayó en este obstáculo
    const lastObstaclePos =
      gameState.currentTeam === 1
        ? gameState.team1LastObstaclePosition
        : gameState.team2LastObstaclePosition;

    if (lastObstaclePos === position) {
      // Ya cayó aquí antes, solo cambiar turno sin penalización
      alert("⚠️ Ya pasaste por este obstáculo. ¡Continúa tu camino!");
      switchTeam();
      return;
    }

    // Guardar la posición del obstáculo
    if (gameState.currentTeam === 1) {
      gameState.team1LastObstaclePosition = position;
    } else {
      gameState.team2LastObstaclePosition = position;
    }

    // Retroceder 2 casillas
    const currentPos =
      gameState.currentTeam === 1
        ? gameState.team1Position
        : gameState.team2Position;
    const newPos = Math.max(0, currentPos - 2);

    if (gameState.currentTeam === 1) {
      gameState.team1Position = newPos;
    } else {
      gameState.team2Position = newPos;
    }

    updateMarkers();

    alert(
      "⚠️ Obstáculo: El miedo, la ira o la tristeza bloquean la alegría. Retroceden 2 casillas, pierden 50 puntos y un turno.",
    );
    addPointsToTeam(gameState.currentTeam, -50);
    switchTeam();
  } else if (space.type === "trampa") {
    handleTrampaSpace();
  } else if (space.type === "retoequipo") {
    handleRetoEquipo();
  } else if (challenges[space.type]) {
    // Limpiar el registro de obstáculo cuando avanzan a otra casilla
    if (gameState.currentTeam === 1) {
      gameState.team1LastObstaclePosition = null;
    } else {
      gameState.team2LastObstaclePosition = null;
    }

    // Mostrar desafío del pilar
    showChallenge(space.type);
  }
}

// ============= DESAFÍOS =============

// Manejar casilla "Reto en Equipo"
function handleRetoEquipo() {
  const team1Pos = gameState.team1Position;
  const team2Pos = gameState.team2Position;

  // 🎵 Reproducir Mission Impossible
  window.audioManager.playMissionImpossible();

  Swal.fire({
    title: "⚔️ ¡RETO EN EQUIPO!",
    html: `
      <div style="text-align: left; padding: 20px;">
        <h3 style="color: #8b5cf6; margin-bottom: 15px;">📋 Reglas del Reto:</h3>
        <ul style="line-height: 2; font-size: 1.1em;">
          <li>🎨 <strong>AMBOS equipos</strong> dibujan la MISMA palabra al mismo tiempo</li>
          <li>⏱️ El <strong>primer equipo</strong> en enviar la palabra correcta al moderador por Teams <strong>GANA</strong></li>
          <li>📍 <strong>Posición actual:</strong> Equipo 1 (Casilla ${team1Pos + 1}) vs Equipo 2 (Casilla ${team2Pos + 1})</li>
        </ul>
        <h3 style="color: #ec4899; margin-top: 20px; margin-bottom: 10px;">🏆 Premio:</h3>
        <ul style="line-height: 2; font-size: 1.1em;">
          <li><strong>Si el ganador va DETRÁS:</strong> El perdedor retrocede a su misma casilla</li>
          <li><strong>Si el ganador va ADELANTE:</strong> El perdedor pierde 1 turno</li>
        </ul>
        <p style="margin-top: 20px; font-size: 1.2em; color: #fbbf24;"><strong>💡 ¡Que empiece la batalla de dibujo!</strong></p>
      </div>
    `,
    icon: "info",
    width: "700px",
    confirmButtonText: "🎨 Iniciar Reto",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(() => {
    Swal.fire({
      title: "🏁 ¿Qué equipo ganó?",
      html: `
        <p style="font-size: 1.2em; margin-bottom: 20px;">El moderador debe indicar qué equipo envió primero la respuesta correcta por Teams</p>
      `,
      icon: "question",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "🔵 Equipo 1 Ganó",
      denyButtonText: "🔴 Equipo 2 Ganó",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      // 🎵 Detener música cuando se resuelve el reto
      window.audioManager.stop();

      if (result.isConfirmed) {
        // Equipo 1 ganó
        applyRetoEquipoResult(1);
      } else if (result.isDenied) {
        // Equipo 2 ganó
        applyRetoEquipoResult(2);
      }
    });
  });
}

// Aplicar resultado del Reto en Equipo
function applyRetoEquipoResult(winnerTeam) {
  const team1Pos = gameState.team1Position;
  const team2Pos = gameState.team2Position;
  const loserTeam = winnerTeam === 1 ? 2 : 1;

  let resultMessage = "";
  let resultIcon = "success";

  // Determinar si el ganador va detrás o adelante
  if (winnerTeam === 1) {
    if (team1Pos < team2Pos) {
      // Equipo 1 va detrás, retroceder equipo 2
      gameState.team2Position = team1Pos;
      resultMessage = `🔵 ¡Equipo 1 ganó! 
El Equipo 2 retrocede a la casilla ${team1Pos + 1} (misma posición del Equipo 1)`;
    } else {
      // Equipo 1 va adelante, bloquear turno del equipo 2
      gameState.team2TurnBlocked = true;
      resultMessage = `🔵 ¡Equipo 1 ganó! 
El Equipo 2 pierde su próximo turno`;
    }
  } else {
    if (team2Pos < team1Pos) {
      // Equipo 2 va detrás, retroceder equipo 1
      gameState.team1Position = team2Pos;
      resultMessage = `🔴 ¡Equipo 2 ganó! 
El Equipo 1 retrocede a la casilla ${team2Pos + 1} (misma posición del Equipo 2)`;
    } else {
      // Equipo 2 va adelante, bloquear turno del equipo 1
      gameState.team1TurnBlocked = true;
      resultMessage = `🔴 ¡Equipo 2 ganó! 
El Equipo 1 pierde su próximo turno`;
    }
  }

  updateMarkers();

  Swal.fire({
    title: "⚔️ Resultado del Reto",
    text: resultMessage,
    icon: resultIcon,
    timer: 4000,
    showConfirmButton: true,
    confirmButtonText: "Continuar",
  }).then(() => {
    switchTeam();
  });
}

// Manejar casilla "Juntos pero no revueltos"
function handleTrampaSpace() {
  const victimTeam = gameState.currentTeam;
  const attackerTeam = victimTeam === 1 ? 2 : 1;
  const victimPos =
    victimTeam === 1 ? gameState.team1Position : gameState.team2Position;

  // 🎵 REPRODUCIR LA CANCIÓN DEL JUEGO DEL CALAMAR
  window.audioManager.playElJuegoDelCalamar();

  Swal.fire({
    title: "🎯 ¡Juntos pero no revueltos!",
    html: `
      <p><strong>Equipo ${attackerTeam}</strong>, tienen el poder de devolver al <strong>Equipo ${victimTeam}</strong></p>
      <p>¿Cuántas casillas quieren que retroceda? (maximo 5 casillas)</p>
      <small style="opacity:.6">¿Habra Misericordia?</small>
    `,
    input: "number",
    inputAttributes: {
      min: 0,
      max: 5,
      step: 1,
    },
    inputValue: 1,
    icon: "warning",
    showCancelButton: false,
    confirmButtonText: "⬅️ Aplicar",
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0) {
        return "Debe ser un número entre 1 y 5";
      }
      if (num > 5) {
        return "No puedes devolver más de 5 casillas";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const spacesToGoBack = parseInt(result.value);

      if (spacesToGoBack === 0) {
        Swal.fire({
          title: "😇 Perdón concedido",
          text: `El Equipo ${victimTeam} no retrocede. Hoy ganaron en karma.`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });

        // 🎵 Detener música cuando termina la acción
        window.audioManager.stop();

        setTimeout(() => switchTeam(), 2000);
        return;
      }

      const newPos = Math.max(0, victimPos - spacesToGoBack);

      if (victimTeam === 1) {
        gameState.team1Position = newPos;
      } else {
        gameState.team2Position = newPos;
      }

      updateMarkers();

      Swal.fire({
        title: "😈 ¡Retroceso aplicado!",
        text: `El Equipo ${victimTeam} retrocedió ${spacesToGoBack} casilla${
          spacesToGoBack > 1 ? "s" : ""
        }`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // 🎵 Detener música después de mostrar el resultado
      setTimeout(() => {
        window.audioManager.stop();
        switchTeam();
      }, 2000);
    }
  });
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

  const modalIcon = document.getElementById("modalIcon");
  modalIcon.className = `modal-icon icon icon-${pillarType}`;

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

// Iniciar temporizador del modal
function startModalTimer() {
  const timeSpan = document.getElementById("timeLeft");

  if (modalInterval) clearInterval(modalInterval);

  modalTimeLeft = parseInt(timeSpan.textContent);

  // 🎵 Reproducir música de desafío
  console.log("🎬 Iniciando timer y reproduciendo música");
  window.audioManager.playChallenge();

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

  // 🎵 Detener música
  window.audioManager.stop();

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

// Completar desafío manualmente
function completeChallenge(success) {
  if (modalInterval) {
    clearInterval(modalInterval);
    modalInterval = null;
  }

  // 🎵 Detener música
  window.audioManager.stop();

  const modal = document.getElementById("challengeModal");
  modal.classList.remove("show");

  if (success && gameState.currentChallenge) {
    addPointsToTeam(gameState.currentTeam, gameState.currentChallenge.points);
  }

  setTimeout(() => {
    switchTeam();
  }, 300);
}

// ============= TURNOS Y UI =============

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

// ============= INICIALIZACIÓN =============

// Inicializar juego
window.onload = function () {
  createBoard();
  updateUI();
};
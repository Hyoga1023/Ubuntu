// ============= SISTEMA DE EFECTOS VISUALES MEJORADO V2 =============
// Archivo: efectosVisuales.js
// Versión limpia - Solo lluvia global para celebraciones

console.log('🎨 Cargando Sistema de Efectos Visuales V2...');

const EffectsManager = {
  // Configuración
  config: {
    enabled: true,
    particles: true,
    confettiRain: true,
    glow: true,
    shake: true,
    animations: true,
    // VOLUMEN INDEPENDIENTE para efectos de victoria/derrota
    victoryVolume: 0.15,  // 15% - Más fuerte que la música del juego
    defeatVolume: 0.12    // 12% - También más fuerte
  },

  // ============= LLUVIA DE CONFETTI GLOBAL (CELEBRACIÓN DE VICTORIA) =============
  confettiRain() {
    if (!this.config.confettiRain) return;

    console.log('🎉 Activando lluvia de confetti');
    
    const width = window.innerWidth;
    const particles = 80;
    
    for (let i = 0; i < particles; i++) {
      setTimeout(() => {
        const x = Math.random() * width;
        const y = -50;
        
        const particle = document.createElement('div');
        const symbols = ['🎉', '🎊', '⭐', '✨', '🌟', '💥', '🎆', '🎈', '🎁', '💫'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = symbol;
        particle.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          color: hsl(${Math.random() * 360}, 100%, 60%);
          font-size: ${Math.random() * 30 + 25}px;
          pointer-events: none;
          z-index: 10000;
          animation: confettiFall ${Math.random() * 1.5 + 1.5}s ease-in forwards;
          transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3500);
      }, i * 30);
    }
  },

  // ============= REPRODUCIR SONIDOS DE VICTORIA Y DERROTA =============
  playApplause() {
    if (!window.audioManager || !window.audioManager.audioEnabled) return;
    
    console.log('👏 Reproduciendo aplausos');
    window.audioManager.stop();
    
    const applause = new Audio('audio/468302__kriptonauta001__05aplausos.wav');
    applause.volume = this.config.victoryVolume; // Volumen independiente y más fuerte
    applause.play().catch(err => console.error('Error reproduciendo aplausos:', err));
  },

  playSadTrombone() {
    if (!window.audioManager || !window.audioManager.audioEnabled) return;
    
    console.log('🎺 Reproduciendo sad trombone');
    window.audioManager.stop();
    
    const sadTrombone = new Audio('audio/73581__benboncan__sad-trombone.wav');
    sadTrombone.volume = this.config.defeatVolume; // Volumen independiente y más fuerte
    sadTrombone.play().catch(err => console.error('Error reproduciendo sad trombone:', err));
  },

  // ============= PARTÍCULAS PEQUEÑAS (SOLO PARA MOVIMIENTO) =============
  createSmallParticles(x, y, count = 8, symbols = ['✨', '💨']) {
    if (!this.config.particles) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = symbol;
        particle.style.cssText = `
          position: fixed;
          left: ${x + (Math.random() - 0.5) * 50}px;
          top: ${y + (Math.random() - 0.5) * 50}px;
          color: rgba(255, 255, 255, 0.8);
          font-size: ${Math.random() * 15 + 10}px;
          pointer-events: none;
          z-index: 10000;
          animation: particleFloat ${Math.random() * 1 + 1}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
      }, i * 20);
    }
  },

  // ============= BRILLO EN CASILLA =============
  glowSpace(spaceId) {
    if (!this.config.glow) return;

    const space = document.getElementById(spaceId);
    if (!space) return;

    space.style.transition = 'all 0.3s ease';
    space.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.9)';
    space.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
      space.style.boxShadow = '';
      space.style.transform = '';
    }, 1000);
  },

  // ============= SACUDIR ELEMENTO =============
  shake(element) {
    if (!this.config.shake) return;

    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
  },

  // ============= PUNTOS FLOTANTES =============
  floatingPoints(element, points) {
    const rect = element.getBoundingClientRect();
    const popup = document.createElement('div');
    
    popup.textContent = `+${points}`;
    popup.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top - 20}px;
      transform: translateX(-50%);
      color: #FFD700;
      font-size: 3em;
      font-weight: bold;
      pointer-events: none;
      z-index: 10000;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5);
      animation: floatUp 2s ease-out forwards;
    `;
    
    document.body.appendChild(popup);
    
    element.style.transform = 'scale(1.3)';
    element.style.color = '#FFD700';
    element.style.textShadow = '0 0 20px rgba(255, 215, 0, 1)';
    
    setTimeout(() => {
      element.style.transform = '';
      element.style.color = '';
      element.style.textShadow = '';
    }, 400);
    
    setTimeout(() => popup.remove(), 2000);
  },

  // ============= DADO 3D =============
  diceRoll3D(diceElement) {
    if (!this.config.animations) return;

    let frame = 0;
    const maxFrames = 15;
    
    const animate = () => {
      if (frame < maxFrames) {
        const rotX = Math.random() * 720 - 360;
        const rotY = Math.random() * 720 - 360;
        const rotZ = Math.random() * 720 - 360;
        const scale = 1 + Math.sin(frame * 0.5) * 0.3;
        
        diceElement.style.transform = `
          rotateX(${rotX}deg) 
          rotateY(${rotY}deg) 
          rotateZ(${rotZ}deg) 
          scale(${scale})
        `;
        
        frame++;
        requestAnimationFrame(animate);
      } else {
        diceElement.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
      }
    };
    
    animate();
  },

  // ============= TRANSICIÓN DE TURNO =============
  teamTransition(teamNumber) {
    const overlay = document.createElement('div');
    const color = teamNumber === 1 ? 
      'rgba(255, 68, 68, 0.2)' : 
      'rgba(68, 68, 255, 0.2)';
    
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${color};
      pointer-events: none;
      z-index: 9999;
      animation: fadeInOut 1s ease-out forwards;
    `;
    
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
  },

  // ============= INYECTAR CSS =============
  injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        0% {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
        }
      }

      @keyframes particleFloat {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(-100px) scale(0.3) rotate(360deg);
        }
      }

      @keyframes floatUp {
        0% {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        70% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-150px) scale(1.8);
        }
      }

      @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-2deg); }
        20%, 40%, 60%, 80% { transform: translateX(10px) rotate(2deg); }
      }

      @keyframes victoryPulse {
        0%, 100% { 
          transform: scale(1); 
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
        }
        50% { 
          transform: scale(1.08); 
          box-shadow: 0 0 60px rgba(255, 215, 0, 1);
        }
      }

      .board-space {
        transition: all 0.3s ease !important;
      }

      .board-space:hover {
        transform: scale(1.2) !important;
        box-shadow: 0 10px 40px rgba(255, 255, 255, 0.5) !important;
        filter: brightness(1.3);
      }

      .team-card.active {
        animation: cardPulse 2s ease-in-out infinite;
      }

      @keyframes cardPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }

      .dice {
        transition: transform 0.1s ease-out !important;
      }

      .marker-team1, .marker-team2 {
        transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// ============= INTERCEPTAR FUNCIONES DEL JUEGO =============
window.addEventListener('load', () => {
  console.log('🎮 Integrando efectos con el juego...');
  
  EffectsManager.injectCSS();

  // INTERCEPTAR: addPointsToTeam
  const originalAddPoints = window.addPointsToTeam;
  if (originalAddPoints) {
    window.addPointsToTeam = function(team, points) {
      originalAddPoints(team, points);
      
      if (points > 0) {
        const scoreElement = document.getElementById(`score${team}`);
        if (scoreElement) {
          EffectsManager.floatingPoints(scoreElement, points);
        }
      }
    };
    console.log('✅ Hook: addPointsToTeam');
  }

  // INTERCEPTAR: rollDice
  const originalRollDice = window.rollDice;
  if (originalRollDice) {
    window.rollDice = function() {
      const dice = document.getElementById('dice');
      if (dice && !gameState.rolling) {
        EffectsManager.diceRoll3D(dice);
      }
      originalRollDice();
    };
    console.log('✅ Hook: rollDice');
  }

  // INTERCEPTAR: movePlayer
  const originalMovePlayer = window.movePlayer;
  if (originalMovePlayer) {
    window.movePlayer = function(steps) {
      originalMovePlayer(steps);
      
      const currentTeam = gameState.currentTeam;
      const newPos = currentTeam === 1 ? gameState.team1Position : gameState.team2Position;
      
      setTimeout(() => {
        EffectsManager.glowSpace(`space-${newPos}`);
        
        // Solo partículas pequeñas de movimiento
        const space = document.getElementById(`space-${newPos}`);
        if (space) {
          const rect = space.getBoundingClientRect();
          EffectsManager.createSmallParticles(
            rect.left + rect.width/2, 
            rect.top + rect.height/2, 
            6,
            ['💨', '✨']
          );
        }
      }, 600);
    };
    console.log('✅ Hook: movePlayer');
  }

  // INTERCEPTAR: switchTeam
  const originalSwitchTeam = window.switchTeam;
  if (originalSwitchTeam) {
    window.switchTeam = function() {
      const oldTeam = gameState.currentTeam;
      originalSwitchTeam();
      const newTeam = gameState.currentTeam;
      
      if (oldTeam !== newTeam) {
        EffectsManager.teamTransition(newTeam);
      }
    };
    console.log('✅ Hook: switchTeam');
  }

  // INTERCEPTAR: handleSpaceLanding
  const originalHandleSpace = window.handleSpaceLanding;
  if (originalHandleSpace) {
    window.handleSpaceLanding = function(position) {
      const space = boardSpaces[position];
      
      // Efectos según tipo de casilla
      if (space.type === 'obstaculo') {
        const spaceElement = document.getElementById(`space-${position}`);
        if (spaceElement) {
          EffectsManager.shake(spaceElement);
          setTimeout(() => {
            const rect = spaceElement.getBoundingClientRect();
            EffectsManager.createSmallParticles(
              rect.left + rect.width/2, 
              rect.top + rect.height/2, 
              15,
              ['💥', '😱', '⚠️']
            );
          }, 200);
        }
      } else if (space.type === 'meta') {
        // SOLO LLUVIA GLOBAL - NADA MÁS
        console.log('🏆 META alcanzada - Activando solo lluvia global');
        EffectsManager.confettiRain();
        
        const teamCard = document.getElementById(`team${gameState.currentTeam}Card`);
        if (teamCard) {
          teamCard.style.animation = 'victoryPulse 1s ease-in-out infinite';
        }
      } else if (space.type === 'union') {
        EffectsManager.createSmallParticles(
          window.innerWidth / 2, 
          window.innerHeight / 2, 
          20,
          ['🤝', '❤️', '✨']
        );
      }
      
      originalHandleSpace(position);
    };
    console.log('✅ Hook: handleSpaceLanding');
  }

  // INTERCEPTAR: completeChallenge (cuando completan antes del tiempo)
  const originalCompleteChallenge = window.completeChallenge;
  if (originalCompleteChallenge) {
    window.completeChallenge = function(success) {
      if (success) {
        // VICTORIA: Lluvia global + Aplausos
        console.log('✅ Desafío completado - Activando lluvia global + aplausos');
        EffectsManager.confettiRain();
        EffectsManager.playApplause();
      } else {
        // DERROTA: Sad Trombone (sin efectos visuales)
        console.log('❌ Desafío fallado - Reproduciendo sad trombone');
        EffectsManager.playSadTrombone();
      }
      originalCompleteChallenge(success);
    };
    console.log('✅ Hook: completeChallenge');
  }

  // INTERCEPTAR: Swal.fire para detectar respuestas cuando se acaba el tiempo
  if (window.Swal) {
    const originalSwalFire = Swal.fire;
    Swal.fire = function(...args) {
      const config = args[0];
      
      // Detectar si es el modal de "Tiempo terminado"
      if (config && config.title && config.title.includes('Tiempo terminado')) {
        const originalThen = config.then || (() => {});
        
        // Modificar el then para capturar la respuesta
        return originalSwalFire.apply(this, args).then((result) => {
          // Si confirmaron (dijeron que SÍ lo lograron)
          if (result.isConfirmed) {
            console.log('✅ Tiempo agotado pero completado - Activando efectos');
            setTimeout(() => {
              EffectsManager.confettiRain();
              EffectsManager.playApplause();
            }, 500);
          } 
          // Si cancelaron (dijeron que NO lo lograron)
          else if (result.dismiss || result.isDenied) {
            console.log('❌ Tiempo agotado y fallado - Reproduciendo sad trombone');
            setTimeout(() => {
              EffectsManager.playSadTrombone();
            }, 500);
          }
          
          // Llamar al then original si existía
          if (originalThen) {
            return originalThen(result);
          }
          return result;
        });
      }
      
      // Si no es ese modal, ejecutar normal
      return originalSwalFire.apply(this, args);
    };
    console.log('✅ Hook: Swal.fire para detección de tiempo agotado');
  }

  // Efectos en hover de casillas
  setTimeout(() => {
    document.querySelectorAll('.board-space').forEach((space) => {
      space.addEventListener('mouseenter', () => {
        if (EffectsManager.config.glow) {
          space.style.filter = 'brightness(1.3)';
        }
      });
      
      space.addEventListener('mouseleave', () => {
        space.style.filter = '';
      });
    });
  }, 1000);

  console.log('✅ Sistema de Efectos Visuales V2 Activado!');
  
  // Mensaje de bienvenida
  setTimeout(() => {
    EffectsManager.createSmallParticles(
      window.innerWidth / 2, 
      100, 
      15,
      ['🎮', '🎨', '✨']
    );
  }, 500);
});

// Exponer para uso manual
window.EffectsManager = EffectsManager;
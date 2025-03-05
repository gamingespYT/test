document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos la imagen del logo
    const logo = document.querySelector("img[src='./img/logo.png']");
    
    // Creamos un elemento de audio
    const audio = new Audio("./Sonidos/BTsong.mp3"); // Reemplaza con la URL de la canción
    
    // Crear un contenedor para los emojis que caerán
    const emojiContainer = document.createElement("div");
    emojiContainer.style.position = "fixed"; // Usamos fixed para que esté en una capa flotante
    emojiContainer.style.top = "0";
    emojiContainer.style.left = "0";
    emojiContainer.style.pointerEvents = "none"; // Asegura que no interfieran con la interacción del usuario
    emojiContainer.style.zIndex = "999"; // Aseguramos que esté encima de otros elementos pero sin interferir
    document.body.appendChild(emojiContainer);

    // Agregamos un evento de clic al logo
    logo.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            startFallingEmojis(); // Iniciar emojis al reproducir la canción
        } else {
            audio.pause();
            audio.currentTime = 0;
            stopFallingEmojis(); // Detener la creación de nuevos emojis al pausar la canción
        }
    });

    // Crear tooltip con mejor diseño
    const tooltip = document.createElement("div");
    tooltip.textContent = "🔊✨ ¡Púlsame para escuchar la canción! 🎤🎧";
    tooltip.style.position = "absolute";
    tooltip.style.background = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "white";
    tooltip.style.padding = "8px 12px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "14px";
    tooltip.style.fontWeight = "bold";
    tooltip.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    tooltip.style.visibility = "hidden";
    tooltip.style.transition = "opacity 0.3s ease-in-out";
    tooltip.style.opacity = "0";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "1000";
    document.body.appendChild(tooltip);

    // Mostrar tooltip al pasar el mouse
    logo.addEventListener("mouseover", function (event) {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        tooltip.style.top = event.pageY + 15 + "px";
        tooltip.style.left = event.pageX + 15 + "px";
    });

    // Mover tooltip con el mouse
    logo.addEventListener("mousemove", function (event) {
        tooltip.style.top = event.pageY + 15 + "px";
        tooltip.style.left = event.pageX + 15 + "px";
    });

    // Ocultar tooltip cuando el mouse sale
    logo.addEventListener("mouseout", function () {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
    });

    // Función para crear emojis que caen
    let emojiInterval;

    function startFallingEmojis() {
        const emojis = ["🎉", "🎧"]; // Lista de emojis
        emojiInterval = setInterval(function () {
            const emoji = document.createElement("div");
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Seleccionar un emoji aleatorio
            emoji.style.position = "absolute";
            emoji.style.left = `${Math.random() * (window.innerWidth - 30)}px`; // Ajustar para que caigan dentro de los márgenes
            emoji.style.top = "-30px"; // Comienza desde arriba
            emoji.style.fontSize = "30px"; // Tamaño del emoji
            emoji.style.animation = "fall 4s forwards"; // Cambié "infinite" por "forwards" para que solo caigan una vez
            emoji.style.pointerEvents = "none"; // Para que no interfieran con otros elementos
            emojiContainer.appendChild(emoji);

            // Eliminar el emoji después de que termine la animación
            emoji.addEventListener('animationend', function () {
                emoji.remove();
            });
        }, 100); // Intervalo reducido para crear más emojis
    }

    // Función para detener la creación de nuevos emojis
    function stopFallingEmojis() {
        clearInterval(emojiInterval);
        // No eliminamos los emojis existentes, permitimos que terminen su animación
    }

    // CSS adicional para la animación de los emojis (para hacer que caigan)
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes fall {
        0% {
            top: -30px;
        }
        100% {
            top: 100vh; /* Debería caer fuera del área visible sin afectar el desplazamiento */
        }
    }
    `;
    document.head.appendChild(style);
});

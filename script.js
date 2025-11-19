document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    if (!header) return;

    function createSpooky() {
        const emojis = ["🌧️", "☔", "❄️", "🌬️"];
        const spooky = document.createElement("div");
        spooky.classList.add("spooky");
        spooky.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        spooky.style.left = Math.random() * 100 + "%";
        spooky.style.animationDuration = Math.random() * 3 + 3 + "s";
        spooky.style.fontSize = Math.random() * 20 + 20 + "px";
        header.appendChild(spooky);

        setTimeout(() => spooky.remove(), 6000);
    }

    setInterval(createSpooky, 700);
});


document.addEventListener("DOMContentLoaded", () => {
    const productos = Array.from(document.querySelectorAll(".producto"));
    const boton = document.getElementById("verMasBtn");
    if (!boton) return;

    const inicial = 10;   // Cuántos se ven al inicio
    const paso = 20;       // Cuántos mostrar por clic
    let mostrados = inicial;

    // Ocultar los productos excedentes al inicio
    productos.forEach((p, i) => {
        if (i >= inicial) p.classList.add("oculto");
        else p.classList.remove("oculto");
    });

    // Función para actualizar visualmente el botón (flecha)
    const actualizarBotonVisual = () => {
        if (mostrados >= productos.length) {
            // Cuando ya están todos visibles
            boton.classList.add("active");
            boton.innerHTML = `<span class="flecha"></span>`;
        } else {
            // Cuando hay más por mostrar
            boton.classList.remove("active");
            boton.innerHTML = `<span class="flecha"></span>`;
        }
    };

    actualizarBotonVisual();
    boton.addEventListener("click", () => {
        if (mostrados >= productos.length) {
            // Oculta los productos extra con animación suave
            productos.forEach((p, i) => {
                if (i >= inicial) {
                    p.classList.add("oculto");
                }
            });

            mostrados = inicial;
            const top = document.querySelector(".productos-destacados");
            if (top) window.scrollTo({ top: top.offsetTop - 20, behavior: "smooth" });
        } else {
            // Muestra los siguientes productos con transición suave
            const objetivo = Math.min(productos.length, mostrados + paso);
            for (let i = mostrados; i < objetivo; i++) {
                const p = productos[i];
                p.classList.remove("oculto");
                p.classList.add("fadeIn");
                setTimeout(() => p.classList.remove("fadeIn"), 500);
            }
            mostrados = objetivo;

            // Hace scroll al último producto mostrado
            productos[Math.min(mostrados - 1, productos.length - 1)].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        actualizarBotonVisual();
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musicaFondo");
    if (!musica) return;

    musica.volume = 0.3;
    musica.loop = true;

    // Intento automático (funciona si el navegador lo permite)
    musica.play().catch(() => {
        console.warn("🎵 Autoplay bloqueado. Se activará al hacer clic.");
    });

    // Reproducir al primer clic en cualquier parte
    document.addEventListener("click", () => {
        musica.play().catch(err => console.error("No se pudo reproducir:", err));
    }, { once: true });
});


// ==== MENÚ HAMBURGUESA Y FILTROS ====

function toggleCategorias() {
    const panel = document.getElementById("panelCategorias");
    panel.classList.toggle("show");

    const menu = document.getElementById("menuDropdown");
    if (menu && menu.classList.contains("show")) {
        menu.classList.remove("show");
    }
}

function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.classList.toggle("active");

    const panel = document.getElementById("panelFiltros");
    if (panel && panel.classList.contains("show")) {
        panel.classList.remove("show");
    }
}

// Cierra ambos al hacer clic fuera
document.addEventListener("click", (e) => {
    const dentroCategoria = e.target.closest(".dropdown");
    const dentroMenu = e.target.closest(".menu-container");
    if (!dentroCategoria && !dentroMenu) {
        document.getElementById("panelCategorias")?.classList.remove("show");
        document.getElementById("menuDropdown")?.classList.remove("active");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".filtro-btn");
    const productosMujer = document.getElementById("productosMujer");
    const productosHombre = document.getElementById("productosHombre");
    const verMasBtn = document.getElementById("verMasBtn");

    let hombresMostrados = false; // bandera para saber si ya se desplegaron los hombres

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.id.replace("filtro", "").toLowerCase();

            // función auxiliar: fuerza a mostrar los hombres si están ocultos por la flecha
            function asegurarHombresVisibles(callback) {
                const estilo = window.getComputedStyle(productosHombre);
                const oculto = productosHombre.offsetHeight === 0 || estilo.visibility === "hidden" || estilo.opacity === "0";

                if (oculto && !hombresMostrados && verMasBtn) {
                    verMasBtn.click(); // fuerza mostrar
                    hombresMostrados = true;
                    setTimeout(callback, 400); // espera a que aparezcan visualmente
                } else {
                    callback();
                }
            }

            if (filtro === "mujer") {
                productosMujer.style.display = "grid";
                productosHombre.style.display = "none";
            }
            else if (filtro === "hombre") {
                asegurarHombresVisibles(() => {
                    productosMujer.style.display = "none";
                    productosHombre.style.display = "grid";
                });
            }
            else {
                asegurarHombresVisibles(() => {
                    productosMujer.style.display = "grid";
                    productosHombre.style.display = "grid";
                });
            }
        });
    });
});





// Chatbot UI handler — pegar al final de script.js (asegúrate que script.js se incluya 1 sola vez)
document.addEventListener("DOMContentLoaded", () => {
    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbotWindow = document.getElementById("chatbot-window");
    const cerrarChat = document.getElementById("cerrarChat");
    const iniciarChat = document.getElementById("iniciarChat");
    const loginScreen = document.getElementById("login-screen");
    const preguntasScreen = document.getElementById("preguntas-screen");
    const chatScreen = document.getElementById("chat-screen");
    const chatLog = document.getElementById("chat-log");
    const chatInput = document.getElementById("chat-input");
    const enviarMsg = document.getElementById("enviarMsg");

    if (!chatbotBtn || !chatbotWindow) {
        console.warn("Chatbot: falta el HTML necesario (chatbot-btn o chatbot-window).");
        return;
    }

    // Toggle open/close
    chatbotBtn.addEventListener("click", () => {
        // Si está oculto -> mostrar como flex-column, si visible -> ocultar
        if (getComputedStyle(chatbotWindow).display === "none") {
            chatbotWindow.style.display = "flex";
            chatbotWindow.style.flexDirection = "column";
            chatbotWindow.style.alignItems = "stretch";
        } else {
            chatbotWindow.style.display = "none";
        }
    });

    // cerrar botón
    if (cerrarChat) {
        cerrarChat.addEventListener("click", () => {
            chatbotWindow.style.display = "none";
        });
    }

    // Iniciar Chat (login simulado)
    if (iniciarChat) {
        iniciarChat.addEventListener("click", () => {
            const correo = document.getElementById("correo")?.value || "";
            const contrasena = document.getElementById("contrasena")?.value || "";
            if (!correo || !contrasena) {
                alert("Por favor ingrese correo y contraseña para continuar.");
                return;
            }
            // Pasar a preguntas
            if (loginScreen && preguntasScreen) {
                loginScreen.style.display = "none";
                preguntasScreen.style.display = "block";
            }
        });
    }

    // Preguntas -> click en una pregunta
    document.querySelectorAll(".pregunta-item").forEach(item => {
        item.addEventListener("click", () => {
            const pregunta = item.textContent.trim();
            if (preguntasScreen && chatScreen && chatLog) {
                preguntasScreen.style.display = "none";
                chatScreen.style.display = "block";
                agregarMensaje("bot", `Has seleccionado: "${pregunta}". Cuéntame más sobre tu problema.`);
            }
        });
    });

    // Enviar mensaje desde input
    if (enviarMsg) {
        enviarMsg.addEventListener("click", () => {
            enviarUsuario();
        });
    }
    // También Enter en el input
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                enviarUsuario();
            }
        });
    }

    function enviarUsuario() {
        const texto = (chatInput?.value || "").trim();
        if (!texto) return;
        agregarMensaje("user", texto);
        chatInput.value = "";
        // respuesta simulada del bot
        setTimeout(() => {
            agregarMensaje("bot", obtenerRespuestaAutomatica());
        }, 800);
    }

    function agregarMensaje(remitente, texto) {
        if (!chatLog) return;
        const div = document.createElement("div");
        div.className = `chat-msg ${remitente}`;
        div.textContent = texto;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function obtenerRespuestaAutomatica() {
        const respuestas = [
            "Entiendo. Estamos revisando tu caso y te daremos una solución en breve.",
            "Por favor verifica tu correo de confirmación y número de seguimiento.",
            "Puedes contactar al proveedor por WhatsApp: +51 987 654 321.",
            "Hemos registrado tu incidencia. Te contactaremos al correo proporcionado."
        ];
        return respuestas[Math.floor(Math.random() * respuestas.length)];
    }

    // Si quieres que el chat abra automáticamente minimizado o centrado, lo puedes controlar aquí.
});

document.addEventListener("DOMContentLoaded", function () {

    const btnOpen = document.getElementById("btnOpenLogin");
    const modal = document.getElementById("loginModal");
    const btnClose = document.getElementById("closeLogin");
    const btnLogin = document.getElementById("btnLogin");

    // ELEMENTOS DEL REGISTRO
    const modalRegister = document.getElementById("registerModal");
    const btnCloseRegister = document.getElementById("closeRegister");
    const btnVolverLogin = document.getElementById("btnVolverLogin");
    const btnRegistrar = document.getElementById("btnRegistrar");

    // ⭐⭐⭐ FALTA EN TU CÓDIGO — AÑADIDO ⭐⭐⭐
    const btnShowRegister = document.getElementById("btnShowRegister");

    // ⭐⭐⭐ EVENTO QUE ABRE EL REGISTRO — AÑADIDO ⭐⭐⭐
    btnShowRegister.addEventListener("click", function () {
        modal.style.display = "none";
        modalRegister.style.display = "flex";
    });


    // ABRIR LOGIN
    btnOpen.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
    });

    // CERRAR LOGIN CON X
    btnClose.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // CERRAR LOGIN CLIC FUERA
    modal.addEventListener("click", function (e) {
        if (e.target === modal) modal.style.display = "none";
    });

    btnLogin.addEventListener("click", function (e) {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const contra = document.getElementById("contra").value.trim();

        console.log("Correo:", correo);
        console.log("Contra:", contra);

        alert("Valor de correo: [" + correo + "]");
        alert("Valor de contra: [" + contra + "]");

        if (correo === "" || contra === "") {
            alert("Completa los campos");
            return;
        }

        modal.style.display = "none";
        window.location.href = "index.html";
    });

    // CERRAR REGISTRO CON X
    btnCloseRegister.addEventListener("click", function () {
        modalRegister.style.display = "none";
    });

    // VOLVER A LOGIN
    btnVolverLogin.addEventListener("click", function () {
        modalRegister.style.display = "none";
        modal.style.display = "flex";
    });

    // VALIDAR REGISTRO
    btnRegistrar.addEventListener("click", function () {
        const nombre = document.getElementById("regNombre").value.trim();
        const correo = document.getElementById("regCorreo").value.trim();
        const contra = document.getElementById("regContra").value.trim();

        if (nombre === "" || correo === "" || contra === "") {
            alert("Completa los campos para registrarte");
            return;
        }

        alert("Registrado correctamente");

        modalRegister.style.display = "none";
        modal.style.display = "flex";
    });

});



// ===============================
// FUNCIÓN GLOBAL (VA FUERA DEL DOC)
// ===============================
function mostrarMensaje(texto) {
    let msg = document.createElement("div");
    msg.className = "alert-msg";
    msg.innerText = texto;
    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add("show"), 50);

    setTimeout(() => {
        msg.classList.remove("show");
        setTimeout(() => msg.remove(), 300);
    }, 2500);
}

// ===============================
// EVENTOS DE PRODUCTOS (VA FUERA O DENTRO DEL DOC)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".producto").forEach((producto) => {

        const favButton = producto.querySelector(".fav-button");
        const cartButton = producto.querySelector(".cart-button");
        const viewButton = producto.querySelector(".view-button");

        // === CARRITO ===
        cartButton.addEventListener("click", () => {
            mostrarMensaje("Producto agregado al carrito 🛒");
        });

        // === FAVORITO ===
        favButton.addEventListener("click", () => {
            favButton.classList.toggle("fav-active");

            if (favButton.classList.contains("fav-active")) {
                mostrarMensaje("Añadido a favoritos ❤️");
            } else {
                mostrarMensaje("Eliminado de favoritos 💔");
            }
        });

        // === VER DETALLE ===
        viewButton.addEventListener("click", () => {
            mostrarMensaje("Mostrando detalles 👁");
        });

    });
});





































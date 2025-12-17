(function () {
  const PASSWORD = "CAMBIA_ESTA_PASSWORD";
  const STORAGE_KEY = "mol_auth_ok";

  function deny() {
    document.documentElement.innerHTML = "";
    try {
      window.location.replace("about:blank");
    } catch (_) {
      window.location.href = "about:blank";
    }
  }

  function pedirPasswordYValidar() {
    const pass = prompt("Acceso restringido. Ingrese la contraseña:");
    if (pass !== PASSWORD) {
      alert("Contraseña incorrecta");
      deny();
      return false;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
    return true;
  }

  function isAuthed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  if (!isAuthed()) {
    pedirPasswordYValidar();
  }

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (!isAuthed()) pedirPasswordYValidar();
  });

  document.addEventListener("keydown", function (e) {
    const key = (e.key || "").toLowerCase();

    if (e.key === "F12") {
      e.preventDefault();
      if (!isAuthed()) pedirPasswordYValidar();
      return;
    }

    if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) {
      e.preventDefault();
      if (!isAuthed()) pedirPasswordYValidar();
      return;
    }

    if (e.ctrlKey && ["u", "s", "p"].includes(key)) {
      e.preventDefault();
      if (!isAuthed()) pedirPasswordYValidar();
    }
  });
})();

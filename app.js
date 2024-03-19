const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const xv = document.querySelector("#xv");
const yv = document.querySelector("#yv");
const x1 = document.querySelector("#x1");
const x2 = document.querySelector("#x2");
const expression = document.querySelector("#expression");
const result = document.querySelector("#result ");

function verify(item) {
  if (item.length > 0) {
    return false;
  }
  return true;
}

function solveDelta(a, b, c) {
  return b * b - 4 * a * c;
}

function solveRoots(a, b, c) {
  const delta = solveDelta(a, b, c);
  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);

  return { x1, x2 };
}

function solveVertice(a, b, c) {
  const delta = solveDelta(a, b, c);
  if (!Number.isInteger(Math.sqrt(delta))) {
    const vx = "indefinido";
    const vy = "indefinido";
    return { vx, vy };
    return;
  }
  const roots = solveRoots(a, b, c);

  const vx = (roots.x1 + roots.x2) / 2;
  const vy = -delta / (4 * a);
  return { vx, vy };
}

function solveBhaskara(a, b, c) {
  const roots = solveRoots(a, b, c);
  const vertices = solveVertice(a, b, c);

  console.log(vertices);

  const bhaskaraResult = {
    delta: solveDelta(a, b, c),
    x1: roots.x1,
    x2: roots.x2,
    vx: vertices.vx,
    vy: vertices.vy,
  };

  return bhaskaraResult;
}

function change() {
  if (verify(a.value)) {
    return;
  }
  if (verify(b.value)) {
    return;
  }
  if (verify(c.value)) {
    return;
  }

  result.style.display = "block";
  const bhaskaraResult = solveBhaskara(a.value, b.value, c.value);
  result.classList.remove("anime");
  result.classList.add("anime");

  document.querySelector("#resultp").innerHTML = "Resultado ↓";

  expression.textContent = `f(x) = ${a.value}x² + ${b.value}x + ${c.value}`;
  document.querySelector(
    "#delta"
  ).innerHTML = `Δ(Delta)  = <span>${bhaskaraResult.delta}</span> `;

  if (Number.isInteger(Math.sqrt(bhaskaraResult.delta))) {
    document.querySelector("#deltar").innerHTML = `Δ(Raiz)  = <span>${Math.sqrt(
      bhaskaraResult.delta
    )}</span> `;
  } else {
    document.querySelector("#deltar").innerHTML = ``;
  }

  if (!Number.isInteger(Math.sqrt(bhaskaraResult.delta))) {
    x1.textContent = "";
    x2.textContent = "";
    xv.textContent = "";
    yv.textContent = "";
    return;
  }
  x1.innerHTML = `x1  = <span>${bhaskaraResult.x1}</span>`;
  x2.innerHTML = `x2  = <span>${bhaskaraResult.x2}</span>`;
  xv.innerHTML = `X vertice  = <span>${bhaskaraResult.vx}</span>`;
  yv.innerHTML = `Y vertice  = <span>${bhaskaraResult.vy}</span>`;
}

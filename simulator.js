const stepsInput = document.getElementById("steps");
const probabilityInput = document.getElementById("probability");
const stepsValue = document.getElementById("stepsValue");
const probValue = document.getElementById("probValue");
const canvas = document.getElementById("walkChart");
const ctx = canvas.getContext("2d");
const PATH_COUNT = 20;

function simulate() {
  const n = Number(stepsInput.value);
  const p = Number(probabilityInput.value);
  stepsValue.textContent = n;
  probValue.textContent = p.toFixed(2);

  const paths = [];
  for (let k = 0; k < PATH_COUNT; k++) {
    const path = [0];
    for (let i = 0; i < n; i++) {
      const move = Math.random() < p ? 1 : -1;
      path.push(path[path.length - 1] + move);
    }
    paths.push(path);
  }

  const average = Array.from({ length: n + 1 }, (_, i) =>
    paths.reduce((sum, path) => sum + path[i], 0) / PATH_COUNT
  );
  const theoretical = Array.from({ length: n + 1 }, (_, i) =>
    i * (2 * p - 1)
  );

  const endpoints = paths.map(path => path[n]);
  const sampleMean = endpoints.reduce((a, b) => a + b, 0) / PATH_COUNT;
  const sampleVariance = endpoints.reduce((sum, x) =>
    sum + (x - sampleMean) ** 2, 0
  ) / (PATH_COUNT - 1);
  const theoreticalMean = n * (2 * p - 1);
  const theoreticalVariance = 4 * n * p * (1 - p);

  document.getElementById("sampleMean").textContent = sampleMean.toFixed(2);
  document.getElementById("theoreticalMean").textContent = theoreticalMean.toFixed(2);
  document.getElementById("sampleVariance").textContent = sampleVariance.toFixed(2);
  document.getElementById("theoreticalVariance").textContent = theoreticalVariance.toFixed(2);

  drawChart(paths, average, theoretical, n);
}

function drawChart(paths, average, theoretical, n) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = rect.width;
  const height = rect.height;
  const margin = { left: 48, right: 18, top: 18, bottom: 35 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const allValues = paths.flat().concat(average, theoretical);
  let minY = Math.min(...allValues);
  let maxY = Math.max(...allValues);
  minY = Math.floor((minY - 2) / 5) * 5;
  maxY = Math.ceil((maxY + 2) / 5) * 5;
  if (minY === maxY) { minY -= 5; maxY += 5; }

  const x = i => margin.left + (i / n) * plotW;
  const y = value => margin.top + ((maxY - value) / (maxY - minY)) * plotH;

  ctx.clearRect(0, 0, width, height);
  ctx.font = "12px Arial, sans-serif";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(180,195,215,0.16)";
  ctx.fillStyle = "#a9b8ca";

  const yTicks = 5;
  for (let j = 0; j <= yTicks; j++) {
    const value = minY + (maxY - minY) * j / yTicks;
    const yy = y(value);
    ctx.beginPath(); ctx.moveTo(margin.left, yy); ctx.lineTo(width - margin.right, yy); ctx.stroke();
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    ctx.fillText(value.toFixed(0), margin.left - 9, yy);
  }
  const xTicks = Math.min(5, n);
  for (let j = 0; j <= xTicks; j++) {
    const value = Math.round(n * j / xTicks);
    const xx = x(value);
    ctx.beginPath(); ctx.moveTo(xx, margin.top); ctx.lineTo(xx, height - margin.bottom); ctx.stroke();
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(String(value), xx, height - margin.bottom + 9);
  }

  function drawLine(values, color, lineWidth, alpha = 1, dashed = false) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(dashed ? [8, 6] : []);
    ctx.beginPath();
    values.forEach((value, i) => {
      if (i === 0) ctx.moveTo(x(i), y(value));
      else ctx.lineTo(x(i), y(value));
    });
    ctx.stroke();
    ctx.restore();
  }

  paths.forEach(path => drawLine(path, "#10b9ed", 1.25, 0.48));
  drawLine(theoretical, "#37d6c4", 2.3, 1, true);
  drawLine(average, "#ffad24", 3.2);

  ctx.fillStyle = "#a9b8ca";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("Number of Steps", margin.left + plotW / 2, height - 2);
  ctx.save();
  ctx.translate(13, margin.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("Position", 0, 0);
  ctx.restore();
}

document.getElementById("simulate").addEventListener("click", simulate);
stepsInput.addEventListener("input", simulate);
probabilityInput.addEventListener("input", simulate);
window.addEventListener("resize", simulate);
simulate();

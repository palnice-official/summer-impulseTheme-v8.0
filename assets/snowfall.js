document.addEventListener("DOMContentLoaded", function () {
  const snowContainer = document.createElement("div");
  snowContainer.id = "snow-container";
  document.body.appendChild(snowContainer);

  const snowflakeCount = 30;

  for (let i = 0; i < snowflakeCount; i++) {
    let snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.innerHTML = "❄";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = 3 + Math.random() * 5 + "s";
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = 10 + Math.random() * 20 + "px";
    snowContainer.appendChild(snowflake);
  }
});

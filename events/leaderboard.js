fetch("./data.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const data = lines.map((line) => {
      const parts = line.split(",").map((item) => item.trim());
      return { name: parts[0], time: parts[1], date: parts[2] };
    });

    const tbody = document.querySelector("#rankingTable");

    const fastestTime = data[0].time;

    function timeToSeconds(timeStr) {
      const parts = timeStr.split(".");
      return parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 1000;
    }

    function secondsToGap(seconds) {
      if (seconds === 0) return "Leader";
      return "+" + seconds.toFixed(3);
    }

    const fastestSeconds = timeToSeconds(fastestTime);

    data.forEach((item, index) => {
      const rank = index + 1;
      const tr = document.createElement("tr");

      const tdRank = document.createElement("td");
      tdRank.className = "rank";
      if (rank === 1) tdRank.classList.add("gold");
      else if (rank === 2) tdRank.classList.add("silver");
      else if (rank === 3) tdRank.classList.add("bronze");
      tdRank.textContent = rank;

      const tdDriver = document.createElement("td");
      tdDriver.className = "driver";
      tdDriver.textContent = item.name;

      const tdTime = document.createElement("td");
      tdTime.className = "lap-time";
      if (item.time === fastestTime) tdTime.classList.add("fastest");
      tdTime.textContent = item.time;

      const currentSeconds = timeToSeconds(item.time);
      const gap = currentSeconds - fastestSeconds;

      const tdGap = document.createElement("td");
      tdGap.className = "lap-time";
      tdGap.textContent = secondsToGap(gap);

      const tdDate = document.createElement("td");
      tdDate.className = "date";
      tdDate.textContent = item.date;

      tr.appendChild(tdRank);
      tr.appendChild(tdDriver);
      tr.appendChild(tdTime);
      tr.appendChild(tdGap);
      tr.appendChild(tdDate);
      tbody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
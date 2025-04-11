document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
  
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
  
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
  
    const cardStatsContainer = document.querySelector(".stats-cards");
  
    function validateUsername(username) {
      if (username.trim() === "") {
        alert("Username should not be empty");
        return false;
      }
      const regex = /^[a-zA-Z0-9_-]{1,15}$/;
      const isMatching = regex.test(username);
      if (!isMatching) {
        alert("Invalid Username");
      }
      return isMatching;
    }
  
    async function fetchUserDetails(username) {
      const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
      try {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Unable to fetch the User Details");
        }
  
        const data = await response.json();
        console.log("Logging data:", data);
  
        displayUserData(data);
      } catch (error) {
        statsContainer.innerHTML = `<p>No data found</p>`;
      } finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
      }
    }
  
    function displayUserData(data) {
      const {
        easySolved,
        totalEasy,
        mediumSolved,
        totalMedium,
        hardSolved,
        totalHard,
        totalSolved,
        totalQuestions,
        acceptanceRate,
        ranking,
        reputation,
        contributionPoints
      } = data;
  
      // Update progress labels
      easyLabel.textContent = `${easySolved}/${totalEasy}`;
      mediumLabel.textContent = `${mediumSolved}/${totalMedium}`;
      hardLabel.textContent = `${hardSolved}/${totalHard}`;
  
      // Update progress circle
      easyProgressCircle.style.setProperty("--progress-degree", `${(easySolved / totalEasy) * 100}%`);
      mediumProgressCircle.style.setProperty("--progress-degree", `${(mediumSolved / totalMedium) * 100}%`);
      hardProgressCircle.style.setProperty("--progress-degree", `${(hardSolved / totalHard) * 100}%`);
  
      // Update stat cards
      cardStatsContainer.innerHTML = `
        <div class="card"><strong>Total Solved:</strong> ${totalSolved}/${totalQuestions}</div>
        <div class="card"><strong>Acceptance Rate:</strong> ${acceptanceRate}%</div>
        <div class="card"><strong>Ranking:</strong> ${ranking}</div>
        <div class="card"><strong>Reputation:</strong> ${reputation}</div>
        <div class="card"><strong>Contribution Points:</strong> ${contributionPoints}</div>
      `;
    }
  
    searchButton.addEventListener("click", function () {
      const username = usernameInput.value;
      if (validateUsername(username)) {
        fetchUserDetails(username);
      }
    });
  });

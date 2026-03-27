// Quiz data
const quizData = [
  {
    question: "1. Hva måles i Ohm (Ω)?",
    options: ["Strøm", "Motstand", "Spenning", "Effekt"],
    correctAnswer: "Motstand",
  },
  {
    question: "2. Hva er normal kroppstemperatur hos mennesker?",
    options: ["35°C", "37°C", "39°C", "40°C"],
    correctAnswer: "37°C",
  },
  {
    question: "3. Hva er kroppens viktigste energikilde under hard trening?",
    options: ["Protein", "Karbohydrater", "Vann", "Vitaminer"],
    correctAnswer: "Karbohydrater",
  },
  {
    question: "4. Hva betyr målgruppe i media?",
    options: [
      "Hvor reklamen sendes",
      "Hvem budskapet er laget for",
      "Hvor videoen spilles inn",
      "Hvor mange som ser",
    ],
    correctAnswer: "Hvem budskapet er laget for",
  },
  {
    question: "5. Hvilket fagområde studerer samfunn og politikk?",
    options: ["Sosiologi", "Biologi", "Fysikk", "Geografi"],
    correctAnswer: "Sosiologi",
  },
  {
    question: "6. Hva er god kundeservice?",
    options: [
      "Å ignorere kunder",
      "Å hjelpe kunder på en vennlig og profesjonell måte",
      "Å selge mest mulig",
      "Å snakke lite",
    ],
    correctAnswer: "Å hjelpe kunder på en vennlig og profesjonell måte",
  },
  {
    question: "7. Hva brukes en dreiebenk til?",
    options: [
      "Sveising",
      "Bearbeiding av roterende materialer",
       "Maling",
      "Montering",
    ],
    correctAnswer: "Bearbeiding av roterende materialer",
  },
  {
    question: "8. Hva betyr HTML?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Media Link",
      "Home Tool Markup Language",
    ],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "9. Hvilket styresett har Norge?",
    options: [
      "Republikk",
      "Militærstyre",
      "Konstitusjonelt monarki",
      "Diktatur",
    ],
    correctAnswer: "Konstitusjonelt monarki",
  },
  {
    question: "10. Hva regnes som mobbing?",
    options: [
      "En enkelt krangel mellom venner",
      "Gjentatt negativ atferd mot en person over tid",
      "Å være uenig med noen",
      "Å gi konstruktiv kritikk",
    ],
    correctAnswer: "Gjentatt negativ atferd mot en person over tid",
  },
  {
    question: "11. Velg en video å se:",
    options: ["1", "2", "3", "Ingen av videoene"],
    videos: [
      "https://www.youtube.com/embed/BwOV6zNckSU",
      "https://www.youtube.com/embed/Eu812CHxbRk",
      "https://www.youtube.com/embed/mAkR76jdR6E"
    ],
    correctAnswer: "1",
  },
];


const scoreElement = document.getElementById("score");

function updateScore() {
  if (!scoreElement) return;
  scoreElement.textContent = `Your score: ${score}`;
}

window.addEventListener("DOMContentLoaded", () => {
  
  const question = document.getElementById("question");
  const option0 = document.getElementById("option0");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");
  const option3 = document.getElementById("option3");
  const nameInput = document.getElementById("name-input");
  const resultsDisplay = document.getElementById("results-display");
  const nameField = document.getElementById("name");
  const startQuizBtn = document.getElementById("start-quiz");

  
  question.style.display = "none";
  option0.style.display = "none";
  option1.style.display = "none";
  option2.style.display = "none";
  option3.style.display = "none";


  nameInput.style.display = "block";


  let currentQuestionIndex = 0;
  let score = 0;

  // Function to display latest quiz results
  function displayLatestResults() {
    const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
    if (results.length === 0) {
      resultsDisplay.innerHTML = "<p style='font-family: Arial, sans-serif;'>Spill til å se resultater!</p>";
      return;
    }
    // Show the last 5 results or all if less, sorted by score descending
    const latestResults = results.slice(-5).sort((a, b) => b.score - a.score);
    let html = "<h3 style='font-family: Arial, sans-serif;'>Top 5 best spillerne:</h3><ul>";
    latestResults.forEach(result => {
      html += `<li>${result.name}: ${result.score}/${quizData.length}</li>`;
    });
    html += "</ul>";
    resultsDisplay.innerHTML = html;
  }

  // Display results on load
  displayLatestResults();
  
  startQuizBtn.addEventListener("click", () => {
    const name = nameField.value.trim();
    if (name) {
      
      let names = JSON.parse(localStorage.getItem("quizNames") || "[]");
      
      names.push(name);
      
      localStorage.setItem("quizNames", JSON.stringify(names));
      
      nameInput.style.display = "none";
      
      question.style.display = "block";
      option0.style.display = "block";
      option1.style.display = "block";
      option2.style.display = "block";
      option3.style.display = "block";
      
      loadQuestion();
    } else {
      alert("Nuh-uh, skriv inn navn");
    }
  });
  
  function loadQuestion() {
      const currentQuestion = quizData[currentQuestionIndex];
      if (!currentQuestion) return;
      question.textContent = currentQuestion.question;
      
      const buttons = [option0, option1, option2, option3];
      
      // Remove existing video container if present
      const existingVideoContainer = document.getElementById("video-container");
      if (existingVideoContainer) {
        existingVideoContainer.remove();
      }
      
      // If this question has videos, display them separately
      if (currentQuestion.videos && currentQuestion.videos.length > 0) {
        const videoContainer = document.createElement("div");
        videoContainer.id = "video-container";
        videoContainer.style.cssText = "display: flex; flex-direction: row; gap: 15px; margin: 20px 0; width: 100%; max-width: 1200px; justify-content: center; align-items: flex-start;";
        
        currentQuestion.videos.forEach((videoUrl, index) => {
          const videoWrapper = document.createElement("div");
          videoWrapper.style.cssText = "text-align: center; flex: 1; min-width: 0;";
          videoWrapper.innerHTML = `<iframe width="100%" height="260" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="aspect-ratio: 9/16;"></iframe>`;
          videoContainer.appendChild(videoWrapper);
        });
        
        // Insert before the options container
        const optionsDiv = document.getElementById("options");
        optionsDiv.parentNode.insertBefore(videoContainer, optionsDiv);
      }
      
      buttons.forEach((btn, index) => {
        const optionContent = currentQuestion.options[index];
        // For video questions, show just the text (1, 2, 3, etc)
        btn.textContent = optionContent;
      });
      
      option0.onclick = () => checkAnswer(currentQuestion.options[0]);
      option1.onclick = () => checkAnswer(currentQuestion.options[1]);
      option2.onclick = () => checkAnswer(currentQuestion.options[2]);
      option3.onclick = () => checkAnswer(currentQuestion.options[3]);
    }
    
    // Check the user's answer
    function checkAnswer(selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (!currentQuestion) return;
        
        const buttons = [option0, option1, option2, option3];
        const selectedButton = buttons.find((btn, index) => currentQuestion.options[index] === selectedOption);
        
        if (selectedOption === currentQuestion.correctAnswer) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
        }
        
        // Disable all buttons during feedback
        buttons.forEach(btn => btn.disabled = true);
        
        // Update score display
        updateScore();
        
        // Delay before moving to 
        setTimeout(() => {
            selectedButton.classList.remove('correct', 'incorrect');
            buttons.forEach(btn => btn.disabled = false);
            
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {

                question.textContent = `Quizzen gjennomført! Du klarte til å få så mye: ${score}/${quizData.length} `;
                option0.style.display = "none";
                option1.style.display = "none";
                option2.style.display = "none";
                option3.style.display = "none";
                
                // Remove video container if it exists
                const existingVideoContainer = document.getElementById("video-container");
                if (existingVideoContainer) {
                    existingVideoContainer.remove();
                }
                
                let names = JSON.parse(localStorage.getItem("quizNames") || "[]");
                let lastName = names[names.length - 1] || "Anonymous";
                let results = JSON.parse(localStorage.getItem("quizResults") || "[]");
                results.push({ name: lastName, score: score });
                localStorage.setItem("quizResults", JSON.stringify(results));

                // Add back button
                const backButton = document.createElement("button");
                backButton.textContent = "Resultater/Spill igjen";
                backButton.style.marginTop = "20px";
                backButton.addEventListener("click", () => {
                  // Reset quiz state
                  currentQuestionIndex = 0;
                  score = 0;
                  nameInput.style.display = "block";
                  question.style.display = "none";
                  option0.style.display = "none";
                  option1.style.display = "none";
                  option2.style.display = "none";
                  option3.style.display = "none";
                  // Remove video container if it exists
                  const existingVideoContainer = document.getElementById("video-container");
                  if (existingVideoContainer) {
                      existingVideoContainer.remove();
                  }
                  // Remove the back button
                  backButton.remove();
                  // Refresh results display
                  displayLatestResults();
                });
                // Append button after the question
                question.parentNode.insertBefore(backButton, question.nextSibling);
            }
        }, 1000);
    }
    
});

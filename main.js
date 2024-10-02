let entity = {};
let subjectsData = {};

const elements = {
  aboutSection: document.getElementById("about__section"),
  aboutCloseBtn: document.getElementById("close__btn"),
  aboutHref: document.getElementById("about__href"),
  mainSection: document.getElementById("main__section"),
  branchOptions: document.getElementById("branch"),
  semOptions: document.getElementById("semester"),
  schemeOptions: document.getElementById("scheme"),
  mainForm: document.getElementById("form__main"),
  resultWish: document.getElementById("result__wish"),
  resultText: document.getElementById("result__gpa"),
  resultSection: document.getElementById("result__section"),
  navlinks: document.querySelector(".navlinks"),
  studentName: document.getElementById('studentName')
};

function createElement(tag, innerHtml = "", attributes = {}) {
  const elem = document.createElement(tag);
  if (innerHtml) elem.innerHTML = innerHtml;
  Object.entries(attributes).forEach(([key, value]) => elem.setAttribute(key, value));
  return elem;
}

function deleteAllChild(elem) {
  elem.innerHTML = '';
}

function getPoints(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 55) return 6;
  if (marks >= 50) return 5;
  if (marks >= 45) return 4;
  if (marks >= 40) return 3;
  return 0;
}

function calculateResult() {
  const { scheme, branch, semester } = getFormValues();
  const semData = entity[scheme]?.[branch.toLowerCase()]?.[semester] || [];

  let totalPoints = 0;
  let totalCredits = 0;

  semData.forEach(subCode => {
    const marks = Number(document.getElementById(subCode)?.value || 0);
    const credit = Number(subjectsData[subCode][1]);
    totalPoints += getPoints(marks) * credit;
    totalCredits += credit;
    console.log(`${subCode} ${getPoints(marks)}x${credit} = ${getPoints(marks) * credit}`);
  });
  console.log("final result: ", (totalPoints / totalCredits).toFixed(2));
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
}

function getInputField(subjectCode, subjectName, credits) {
  return createElement("div", "", { class: "field" }).appendChild(
    createElement("label", `${subjectName}` , { for: subjectCode, title: subjectName })
  ).parentNode.appendChild(
    createElement("input", "", {
      type: "number",
      id: subjectCode,
      placeholder: `${subjectCode}    credits: ${credits}`,
      min: "0",
      max: "100"
    })
  ).parentNode;
}

function populateMainForm() {
  const { scheme, branch, semester } = getFormValues();
  const semData = entity[scheme]?.[branch.toLowerCase()]?.[semester];

  if (!semData) {
    console.error(`Data not found for ${scheme} ${branch} semester ${semester}`);
    deleteAllChild(elements.mainForm);
    return;
  }

  deleteAllChild(elements.mainForm);

  semData.forEach(subCode => {
    elements.mainForm.appendChild(getInputField(subCode, subjectsData[subCode][0], subjectsData[subCode][1]));
  });

  appendFormButtons();
}

function appendFormButtons() {
  const submitBtn = createElement("input", "", {
    type: "button",
    value: "Calculate",
    id: "submit_btn",
    class: "form_btn submit_btn"
  });

  const resetBtn = createElement("input", "", {
    type: "reset",
    value: "Reset",
    class: "form_btn reset_btn"
  });

  elements.mainForm.appendChild(submitBtn);
  elements.mainForm.appendChild(resetBtn);

  submitBtn.addEventListener("click", handleSubmit);
  resetBtn.addEventListener("click", handleReset);
}


function handleSubmit() {
  elements.resultSection.style.display = 'flex';
  elements.resultSection.scrollIntoView({ behavior: "smooth" });
  elements.resultText.innerHTML = calculateResult();
}

function handleReset() {
  elements.mainSection.scrollIntoView({ behavior: "smooth" });
  elements.resultSection.style.display = 'none';
}

function setupOptions(selectElement, options) {
  deleteAllChild(selectElement);
  options.forEach(option => {
    selectElement.appendChild(createElement("option", option.toUpperCase(), { value: option }));
  });
}

function setupEventListeners() {
  elements.schemeOptions.addEventListener("change", () => {
    setupOptions(elements.branchOptions, Object.keys(entity[elements.schemeOptions.value] || {}));
    populateMainForm();
  });
  elements.branchOptions.addEventListener("change", populateMainForm);
  elements.semOptions.addEventListener("change", populateMainForm);

  elements.aboutHref.addEventListener("click", toggleAboutSection);
  elements.aboutCloseBtn.addEventListener("click", () => {
    elements.aboutSection.style.display = 'none';
    elements.mainForm.style.filter = 'blur(0px)';
  });
}

function toggleAboutSection() {
  const isVisible = elements.aboutSection.style.display !== 'none';
  elements.aboutSection.style.display = isVisible ? 'none' : 'flex';
  elements.mainForm.style.filter = isVisible ? 'blur(0px)' : 'blur(20px)';
}

async function loadJSON() {
  try {
    const [dataResponse, subjectsResponse] = await Promise.all([
      fetch('data.json'),
      fetch('subjects.json')
    ]);

    if (!dataResponse.ok || !subjectsResponse.ok) {
      throw new Error("Network error");
    }

    entity = await dataResponse.json();
    subjectsData = await subjectsResponse.json();

    initialize();
  } catch (error) {
    console.error('Error fetching the JSON:', error);
  }
}

function initialize() {
  setupOptions(elements.schemeOptions, Object.keys(entity));
  setupOptions(elements.branchOptions, Object.keys(entity[elements.schemeOptions.value] || {}));
  setupEventListeners();
  populateMainForm();
}

function getFormValues() {
  return {
    scheme: elements.schemeOptions.value,
    branch: elements.branchOptions.value,
    semester: elements.semOptions.value
  };
}

const toggleMenu = () => {
  if (window.innerWidth < 600) {
    elements.navlinks.style.display = elements.navlinks.style.display === "flex" ? "none" : "flex";
    elements.navlinks.classList.toggle('active');
  }
};

const shareData = {
  title: "VTU SGPA Calculator",
  text: "Calculate your grade points with ease",
  url: "https://thisisnihal.github.io/gpa-calculator/",
};

function shareHref() {
  if (navigator.share && navigator.canShare(shareData)) {
    navigator.share(shareData);
    console.log("Data shared successfully");
  } else {
    console.log("Error:: Data cannot be shared");
  }
}


function takeScreenShot() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, 500, 200);

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';

  ctx.fillText(`VTU Semester - ${elements.semOptions.value}`, 40, 50);
  ctx.fillText(`${studentName.value} Scored ${elements.resultText.innerHTML} SGPA`, 40, 80);

  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'screenshot.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



document.addEventListener("DOMContentLoaded", loadJSON);
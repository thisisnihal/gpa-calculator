/**
 * key: value
 * course : [{ {subject_short_name, subject_full_name, credit}, ...}]
 *
 */
const entity = {
    // Branch: Computer Science (Data Science)
    csds: [
      // 0th index means 1st semester
      {
        Maths: ["MATHEMATICS FOR CSE STREAM-I", 4],
        Chemistry: ["CHEMISTRY FOR CSE STREAM", 4],
        CAED: ["COMPUTER-AIDED ENGINEERING DRAWING", 3],
        English: ["COMMUNICATIVE ENGLISH", 1],
        CIP: ["INDIAN CONSTITUTION", 1],
        SFH: ["SCIENTIFIC FOUNDATIONS OF HEALTH", 1],
        Python: ["INTRODUCTION TO PYTHON PROGRAMMING", 3],
        Electrical: ["INTRODUCTION TO ELECTRICAL ENGINEERING", 3],
      },
      {
        Maths: ["MATHEMATICS-II FOR CSE STREAM", 4],
        Physics: ["APPLIED PHYSICS CSE STREAM", 4],
        POP: ["PRINCIPLES OF PROGRAMMING USING C", 3],
        English: ["PROFESSIONAL WRITING SKILLS IN ENGLISH", 1],
        Kannada: ["BALAKE KANNADA", 1],
        IDT: ["INNOVATION AND DESIGN THINKING", 1],
        Electronics: ["INTRODUCTION TO ELECTRONICS COMMUNICATIONG", 3],
        IOT: [" INTRODUCTION TO INTERNET OF THINGS", 3],
      },
    ],
    ise: [
      {
        Mathematics: ["MATHEMATICS FOR CSE STREAM-I", 4],
        Chemistry: ["CHEMISTRY FOR CSE STREAM", 4],
        CAED: ["COMPUTER-AIDED ENGINEERING DRAWING", 3],
        English: ["COMMUNICATIVE ENGLISH", 1],
        CIP: ["INDIAN CONSTITUTION", 1],
        SFH: ["SCIENTIFIC FOUNDATIONS OF HEALTH", 1],
        Python: ["INTRODUCTION TO PYTHON PROGRAMMING", 3],
        Electrical: ["INTRODUCTION TO ELECTRICAL ENGINEERING", 3],
      },
      {
        Mathematics: ["MATHEMATICS-II FOR CSE STREAM", 4],
        Physics: ["APPLIED PHYSICS CSE STREAM", 4],
        POP: ["PRINCIPLES OF PROGRAMMING USING C", 3],
        English: ["PROFESSIONAL WRITING SKILLS IN ENGLISH", 1],
        Kannada: ["BALAKE KANNADA", 1],
        IDT: ["INNOVATION AND DESIGN THINKING", 1],
        Electronics: ["INTRODUCTION TO ELECTRONICS COMMUNICATIONG", 3],
        IOT: [" INTRODUCTION TO INTERNET OF THINGS", 3],
      },
    ],
      cse: [{}],
       ece: [{}],
      aiml: [{}],
      aids: [{}],
  };
  entity.cse = entity.csds;
  entity.aiml = entity.csds;
  entity.aids = entity.csds;
  entity.ece = entity.csds;
  
  
  
  /**ENTITY ENDS HERE */
  
  /**  */
  function getElement(tag, innerHtml = "", attr) {
    const elem = document.createElement(String(tag));
    if (innerHtml !== "") elem.innerHTML = String(innerHtml);
    for (let i = 0; i < attr.length - 1; i += 2) {
      elem.setAttribute(String(attr[i]), String(attr[i + 1]));
    }
    return elem;
  }
  const branchOptions = document.getElementById("branch");
  const semOptions = document.getElementById("semester");
  Object.keys(entity).forEach((key) => {
    const option = getElement("option", key.toUpperCase(), ["value", key]);
    branchOptions.appendChild(option);
  });
  
  // console.log(entity.csds[0].Maths[1]);
  
  {
    /* 
  <form class="form__main" id="form__main">
  <div class="field">
    <label for="firstName1">First name</label>
    <input type="text" id="firstName1" />
  </div> 
  */
  }
  const mainForm = document.getElementById("form__main");
  let currBranchName = String(branchOptions.value);
  let currSem = Number(semOptions.value);
  
  branchOptions.addEventListener("change", (e) => {
    //  e.preventDefault();
    currBranchName = branchOptions.value;
    currSem = semOptions.value;
    rePopulateMainForm();
  });
  semOptions.addEventListener("change", () => {
      currBranchName = branchOptions.value;
      currSem = semOptions.value;
    rePopulateMainForm();
  });
  
  Object.entries(entity).forEach(([branch, arr]) => {
    const sem = 0;
    Object.entries(arr[sem]).forEach(([sub, vaArr]) => {
      // console.log(`${sub} ---- ${vaArr[1]}`);
    });
  });
  const getPoints = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 55 && marks <= 59) return 6;
    if (marks >= 50 && marks <= 54) return 5;
    if (marks >= 45 && marks <= 49) return 4;
    if (marks >= 40 && marks <= 44) return 3;
    else return 0;
  };
  const calculateResult = () => {
    let gpa = 0;
    const branchName = currBranchName;
    const sem = currSem - 1;
    const obj = entity[branchName];
    console.log(branchName, sem, obj[0]);
    let totalCredits = 0;
  
    Object.entries(obj[sem]).forEach(([sub, valArrray]) => {
      console.log(`${sub} -- ${valArrray[1]}`);
      let marks = document.getElementById(sub.toString()).value.toString();
      if (marks === "") marks = 0;
      if (marks.length > 2 && marks !== "100" && Number(marks) > 100)
        marks = marks.slice(0, 2);
      marks = Number(marks);
      const credit = Number(valArrray[1]);
      gpa = gpa + getPoints(marks) * credit;
      totalCredits += credit;
  
      console.log("marks=", marks);
      console.log("gpa --", gpa);
      console.log("point * credit = ", getPoints(marks) * credit);
    });
    console.log("total credit = ", totalCredits);
    gpa = gpa / totalCredits;
    gpa = gpa.toFixed(2);
    console.log("final gpa --", gpa);
    return gpa;
  };
  
  const getInputField = (sub, subject) => {
    const div = getElement("div", "", ["class", "field"]);
    const label = getElement("label", sub, ["for", sub, "title", subject]);
    const input = getElement("input", sub, [
      "type",
      "number",
      "id",
      sub,
      "min",
      "0",
      "max",
      "100",
    ]);
    div.appendChild(label);
    div.appendChild(input);
    return div;
  };
  
  let submitBtn, resetBtn;
  const populateMainForm = (branchName = "csds", sem = 1) => {
    branchName = String(branchName);
    sem = Number(sem) - 1;
    if (sem < 0 && sem > 8) sem = 0;
    for (const branch in entity) {
      if (entity.hasOwnProperty(branch) && branch === branchName) {
        //  console.log(branch, entity[branch]);
        const semdata = entity[branch][sem];
        // console.log("sem data: " ,semdata)
  
        Object.entries(semdata).forEach(([key, value]) => {
          // console.log(value[0], value[1], key);
          mainForm.appendChild(getInputField(key, value[0]));
        });
        const result__span = document.querySelector("#result__span");
        const resultText = document.querySelector("#result__section div h1");
        resultText.style.display = "none";
        submitBtn = getElement("input", "", [
          "type",
          "button",
          "value",
          "Calculate",
          "id",
          "submit_btn",
          "class",
          "form_btn submit_btn",
        ]);
        submitBtn.addEventListener("click", () => {
          const element = document.getElementById("result__section"); // this must be an Id
          element.scrollIntoView({ behavior: "smooth" });
          const gpa = calculateResult();
          result__span.innerHTML = String(gpa);
          // result__span.style.display = "inline-block";
          resultText.style.display = "block";
        });
        mainForm.appendChild(submitBtn);
  
        resetBtn = getElement("input", "", [
          "type",
          "reset",
          "value",
          "Reset",
          "class",
          "form_btn reset_btn",
        ]);
        mainForm.appendChild(resetBtn);
        resetBtn.addEventListener("click", () => {
          const element = document.getElementById("main__section"); // this must be an Id
          element.scrollIntoView({ behavior: "smooth" });
          resultText.style.display = "none";
        });
  
        //   for (const sub in semdata) {
        //     if (semdata.hasOwnProperty(sub)) {
        //       console.log(sub);
        //     }
        //   }
      }
    }
  };
  const deleteAllChild = (elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.lastChild);
    }
  };
  
  // populateMainForm("csds", 1);
  populateMainForm(currBranchName, currSem);
  
  const rePopulateMainForm = () => {
    deleteAllChild(mainForm);
    populateMainForm(currBranchName, currSem);
  };
  
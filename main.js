window.onload = function ()
{

    const cycle = document.getElementById("cycleOptions");

    const input_c_cycle = document.getElementById("inp-c-cycle");
    const input_p_cycle = document.getElementById("inp-p-cycle");

    const calculate_btn = document.getElementById("calc-btn");
    const result = document.getElementById("result");
    const reset = document.getElementById("reset-btn");
    const gpa = document.getElementById("gpa");

    var to_calc_p_cycle = true;

    cycle.addEventListener("click", () =>
    {

        switch (cycle.value)
        {
            case "phyCycle":
                input_p_cycle.style.display = 'block';
                input_c_cycle.style.display = 'none';
                to_calc_p_cycle = true;
                break;
            case "chemCycle":
                input_p_cycle.style.display = 'none';
                input_c_cycle.style.display = 'block';
                to_calc_p_cycle = false;
                break;
        }

        // if default value is changed
        cycle.addEventListener("change", () =>
        {
            switch (cycle.value)
            {
                case "phyCycle":
                    input_p_cycle.style.display = 'block';
                    input_c_cycle.style.display = 'none';
                    to_calc_p_cycle = true;
                    break;
                case "chemCycle":
                    input_p_cycle.style.display = 'none';
                    input_c_cycle.style.display = 'block';
                    to_calc_p_cycle = false;
                    break;
            }
        });
    });



    const maths_p = document.getElementById("maths-p");
    const maths_c = document.getElementById("maths-c");
    const phy = document.getElementById("phy");
    const chem = document.getElementById("chem");
    const iot = document.getElementById("iot");
    const ele = document.getElementById("ele");
    const eln = document.getElementById("eln");
    const caed = document.getElementById("caed");
    const pop = document.getElementById("pop");

    const pws = document.getElementById("pws");
    const idt = document.getElementById("idt");
    const eng = document.getElementById("eng");
    const sfh = document.getElementById("sfh");
    const kann = document.getElementById("kann");
    const cip = document.getElementById("cip");


    calculate_btn.addEventListener("click", () =>
    {
        result.style.display = 'block';
        var gpa_value = 0;
        if (to_calc_p_cycle)
        {
            gpa_value = get_credit(maths_p) * get_points(maths_p) +
                get_credit(phy) * get_points(phy) +
                get_credit(pop) * get_points(pop) +
                get_credit(iot) * get_points(iot) +
                get_credit(eln) * get_points(eln) +
                get_credit(pws) * get_points(pws) +
                get_credit(idt) * get_points(idt) +
                get_credit(kann) * get_points(kann);
        }
        else
        {
            gpa_value = get_credit(maths_c) * get_points(maths_c) +
                get_credit(chem) * get_points(chem) +
                get_credit(python) * get_points(python) +
                get_credit(caed) * get_points(caed) +
                get_credit(ele) * get_points(ele) +
                get_credit(eng) * get_points(eng) +
                get_credit(sfh) * get_points(sfh) +
                get_credit(cip) * get_points(cip);
        }
        gpa_value = gpa_value * 1.00 / 20.00;
        gpa_value = gpa_value.toFixed(2);
        gpa.innerText = (gpa_value).toString();
        console.log("clicked the button!");
    });


    reset.addEventListener("click", () =>
    {
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++)
        {
            if (elements[i].type == "number")
            {
                elements[i].value = "";
            }
        }
    });



    function get_points(s)
    {
        var marks = Number(s.value);
        if (marks >= 90) return 10;
        if (marks >= 80) return 9;
        if (marks >= 70) return 8;
        if (marks >= 60) return 7;
        if (marks >= 55 && marks <= 59) return 6;
        if (marks >= 50 && marks <= 54) return 5;
        if (marks >= 49 && marks <= 45) return 4;
        if (marks >= 44 && marks <= 40) return 3;
        if (marks < 40) return 0;
    }


    function get_credit(s)
    {

        switch (s.id)
        {
            case "maths-p":
            case "maths-c":
            case "phy":
            case "chem":
                return 4;
                break;
            case "pop":
            case "iot":
            case "eln":
            case "ele":
            case "caed":
            case "python":
                return 3;
                break;
            case "eng":
            case "pws":
            case "kann":
            case "cip":
            case "sfh":
            case "idt":
                return 1;
                break;
        }
    }

}
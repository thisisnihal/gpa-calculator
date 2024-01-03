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



    var input_elements = document.getElementsByTagName("input");
    var p_input_elements = document.querySelector("#inp-p-cycle").getElementsByTagName("input");
    var c_input_elements = document.querySelector("#inp-c-cycle").getElementsByTagName("input");
    calculate_btn.addEventListener("click", () =>
    {
        result.style.display = 'block';
        var gpa_value = 0;
        if (to_calc_p_cycle)
        {
            for (let i = 0; i < p_input_elements.length; i++)
            {
                const element = p_input_elements[i];
                gpa_value += get_credit(element) * get_points(element);
            }
        }
        else
        {
            for (let i = 0; i < c_input_elements.length; i++)
            {
                const element = c_input_elements[i];
                gpa_value += get_credit(element) * get_points(element);
            }
        }
        gpa_value = (gpa_value * 1.00) / 20.00;
        gpa_value = gpa_value.toFixed(2);
        gpa.innerText = (gpa_value).toString();
        console.log("clicked the button!");
    });


    reset.addEventListener("click", () =>
    {

        for (var i = 0; i < input_elements.length; i++)
        {
            if (input_elements[i].type == "number")
            {
                input_elements[i].value = "";
            }
        }
        result.style.display = "none";
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
        if (marks >= 45 && marks <= 49) return 4;
        if (marks >= 40 && marks <= 44) return 3;
        else return 0;
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
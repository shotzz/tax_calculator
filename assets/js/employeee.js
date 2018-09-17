var employees = [];

function init() {
    var employeeLS = localStorage.getItem("employeeRoster");

    if (employeeLS) {
        document.getElementById("empty").classList.add("hidden");
        document.getElementById("employees").classList.remove("hidden");
        document.getElementById("subnav").classList.remove("hidden");
        employees = JSON.parse(employeeLS);
        for(var i=0; i<employees.length; i++) {
            addEmployeee(employees[i]);
        }
    } else {
        document.getElementById("empty").classList.remove("hidden");
        document.getElementById("employees").classList.add("hidden");
        document.getElementById("subnav").classList.add("hidden");
    }
}

init();

function showTray(obj) {
    document.getElementById("addEmployee").classList.add("show");

    if(obj) {
        document.getElementById("fullName").value = obj.name;
        document.getElementById("email").value = obj.email;
        document.getElementById("salary").value = obj.salary;
        document.getElementById("investment").value = obj.investment;
        document.getElementById("taxIncome").value = obj.taxIncome;
        document.getElementById("taxPayable").value = obj.taxPayable;
    }
}

function hideTray() {
    document.getElementById("addEmployee").classList.remove("show");
}

function clearTray() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("investment").value = "";
    document.getElementById("taxIncome").value = "";
    document.getElementById("taxPayable").value = "";
    hideTray();
}

function createEmployeee() {
    document.getElementById("employees").classList.remove("hidden");
    document.getElementById("subnav").classList.remove("hidden");
    document.getElementById("empty").classList.add("hidden");
    var emp = {};
    var isValid = checkValidation();

    if(isValid) {

        var tempName = document.getElementById("fullName").value;
        var tempEmail = document.getElementById("email").value;
        var tempSalary = document.getElementById("salary").value;
        var tempInvestment = document.getElementById("investment").value;
        var tempTaxIncome = document.getElementById("taxIncome").value;
        var tempTaxPayable = document.getElementById("taxPayable").value;

        var userFound = false;
        for (var i =0;i < employees.length; i++){
            if(employees[i].email === tempEmail){
                userFound = true;

                employees[i].name = tempName;
                employees[i].email = tempEmail;
                employees[i].salary = tempSalary;
                employees[i].investment = tempInvestment;
                employees[i].taxIncome = tempTaxIncome;
                employees[i].taxPayable = tempTaxPayable;

                clearTray();
            }
        }

        if(!userFound){
            emp.name = tempName;
            emp.email = tempEmail;
            emp.salary = tempSalary;
            emp.investment = tempInvestment;
            emp.taxIncome = tempTaxIncome;
            emp.taxPayable = tempTaxPayable;

            clearTray();

            employees.push(emp);
            addEmployeee(emp);
            console.log(employees);
        } else {

            document.getElementById("employees").innerHTML = "";

            for(var j=0; j<employees.length; j++) {
                addEmployeee(employees[j]);
            }
        }

        localStorage.setItem("employeeRoster", JSON.stringify(employees));

    }
}

function addEmployeee(emp) {
    var employeees = document.getElementById("employees");
    var empCard = document.createElement("div");
    var empName = document.createElement("div");
    var empDetails = document.createElement("div");
    var role = document.createElement("div");
    var editIcon = document.createElement("div");
    var details = document.createElement("div");
    var taxDetails = document.createElement("div");
    var taxincome = document.createElement("div");
    var taxpayable = document.createElement("div");
    var income = document.createElement("div");
    var incomeText = document.createElement("div");
    var payable = document.createElement("div");
    var payabletext = document.createElement("div");

    payable.innerHTML = emp.taxPayable;
    payabletext.innerHTML = "Tax Payable";
    taxpayable.appendChild(payable);
    taxpayable.appendChild(payabletext);
    income.innerHTML = emp.taxIncome;
    incomeText.innerHTML = "Taxable Income";
    taxincome.appendChild(income);
    taxincome.appendChild(incomeText);
    role.innerHTML = "Team Lead";
    empDetails.appendChild(empName);
    empDetails.appendChild(editIcon);
    empDetails.appendChild(role);
    taxDetails.appendChild(taxincome);
    taxDetails.appendChild(taxpayable);
    details.appendChild(empDetails);
    details.appendChild(taxDetails);
    empName.innerHTML = emp.name;
    empCard.appendChild(details);
    empCard.classList.add("empCard");
    editIcon.classList.add("edit");
    details.classList.add("details");
    empDetails.classList.add("empDetails");
    taxincome.classList.add("taxincome");
    taxpayable.classList.add("taxpayable");
    taxDetails.classList.add("taxDetails");
    employeees.appendChild(empCard);

    editIcon.onclick = function () {
        showTray(emp);

    }
}

function computeTax() {
    var salary = document.getElementById("salary").value;
    var investment = document.getElementById("investment").value;

    if(investment>150000) {
        document.getElementById("investment").parentElement.classList.add("error");
        document.getElementById("investment").focus();
        document.getElementsByClassName("errorspan")[3].innerHTML = "Investment only upto 1500000.";
        return;
    } else {
        document.getElementById("investment").parentElement.classList.remove("error");
    }

    if(salary) {
        document.getElementById("salary").parentElement.classList.remove("error");
        var taxIncome = salary - investment;
        if(taxIncome > 0) {
            if (taxIncome<250000) {
                document.getElementById("taxPayable").value = 0;
                document.getElementById("taxIncome").value = 0;
            } else if(taxIncome>=250000 && taxIncome<500000) {
                document.getElementById("taxPayable").value = taxIncome*5/100;
                document.getElementById("taxIncome").value = taxIncome;
            } else if(taxIncome>=500000 && taxIncome<1000000) {
                document.getElementById("taxPayable").value = taxIncome*20/100;
                document.getElementById("taxIncome").value = taxIncome;
            } else if(taxIncome>=1000000) {
                document.getElementById("taxPayable").value = taxIncome*30/100;
                document.getElementById("taxIncome").value = taxIncome;
            }
        }
    }
}

function checkValidation() {
    var fname = document.getElementById("fullName");
    var email = document.getElementById("email");
    var salary = document.getElementById("salary");
    var investment = document.getElementById("investment");

    if (fname.value == "") {
        fname.parentElement.classList.add("error");
        document.getElementsByClassName("errorspan")[0].innerHTML = "Please Enter Name of Employeee";
        fname.focus();
        return false;
    } else if (fname.value !== "") {
        fname.parentElement.classList.remove("error");
        if (email.value == "") {
            email.parentElement.classList.add("error");
            document.getElementsByClassName("errorspan")[1].innerHTML = "Please Enter Email";
            email.focus();
            return false;
        } else if (email.value !== "") {
            email.parentElement.classList.remove("error");
            if (salary.value == "") {
                salary.parentElement.classList.add("error");
                document.getElementsByClassName("errorspan")[2].innerHTML = "Please Enter Salary";
                salary.focus();
                return false;
            } else if (salary.value !== "") {
                salary.parentElement.classList.remove("error");

                if(investment.value > 150000) {
                    return false;
                } else {
                    return true
                }
            }
        }
    }
}
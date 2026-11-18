// ==========================================
// Baby Shield
// ==========================================


// ==========================================
// Vaccination Schedule
// ==========================================

const vaccinationSchedule = [

    {
        name: "BCG",
        dose: "الجرعة الأساسية",
        months: 0
    },

    {
        name: "شلل الأطفال",
        dose: "الجرعة الصفرية",
        months: 0
    },

    {
        name: "التطعيم الخماسي",
        dose: "الجرعة الأولى",
        months: 2
    },

    {
        name: "شلل الأطفال",
        dose: "الجرعة الأولى",
        months: 2
    },

    {
        name: "التطعيم الخماسي",
        dose: "الجرعة الثانية",
        months: 4
    },

    {
        name: "شلل الأطفال",
        dose: "الجرعة الثانية",
        months: 4
    },

    {
        name: "التطعيم الخماسي",
        dose: "الجرعة الثالثة",
        months: 6
    },

    {
        name: "شلل الأطفال",
        dose: "الجرعة الثالثة",
        months: 6
    },

    {
        name: "MMR",
        dose: "الجرعة الأولى",
        months: 9
    },

    {
        name: "شلل الأطفال",
        dose: "الجرعة الرابعة",
        months: 12
    },

    {
        name: "MMR",
        dose: "الجرعة الثانية",
        months: 18
    }

];


// ==========================================
// Calculate Vaccination Date
// ==========================================

function calculateVaccinationDate(birthDate, months) {

    // التاريخ المدخل:
    // DD/MM/YYYY

    const parts = birthDate.split("/");

    const day = Number(parts[0]);

    const birthMonth = Number(parts[1]);

    const birthYear = Number(parts[2]);


    // حساب الشهر الجديد

    let newMonth = birthMonth + months;

    let newYear = birthYear;


    // لو الشهر عدى 12

    while (newMonth > 12) {

        newMonth = newMonth - 12;

        newYear = newYear + 1;

    }


    return {

        day: day,

        month: newMonth,

        year: newYear

    };

}


// ==========================================
// Format Date
// ==========================================

function formatDate(date) {

    const day =
        String(date.day).padStart(2, "0");

    const month =
        String(date.month).padStart(2, "0");

    const year =
        date.year;


    return `${day}/${month}/${year}`;

}


// ==========================================
// Generate Vaccination Table
// ==========================================

function generateVaccinationTable() {

    const childName =
        document.getElementById(
            "childName"
        ).value.trim();


    const birthDate =
        document.getElementById(
            "birthDate"
        ).value.trim();


    // Check child name

    if (childName === "") {

        alert("من فضلك اكتبي اسم الطفل");

        return;

    }


    // Check birth date

    if (birthDate === "") {

        alert(
            "من فضلك اكتبي تاريخ الميلاد بالشكل 12/05/2026"
        );

        return;

    }


    // Check date format

    const dateParts =
        birthDate.split("/");


    if (
        dateParts.length !== 3 ||
        isNaN(Number(dateParts[0])) ||
        isNaN(Number(dateParts[1])) ||
        isNaN(Number(dateParts[2]))
    ) {

        alert(
            "اكتبي التاريخ بالشكل 12/05/2026"
        );

        return;

    }


    // Check day

    const day =
        Number(dateParts[0]);


    // Check month

    const month =
        Number(dateParts[1]);


    if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12
    ) {

        alert(
            "من فضلك اكتبي تاريخ صحيح"
        );

        return;

    }


    // Start table

    let tableHTML = `

        <h3 class="child-title">
            جدول تطعيمات الطفل: ${childName}
        </h3>

        <table class="vaccination-table">

            <tr>

                <th>
                    التطعيم
                </th>

                <th>
                    الجرعة
                </th>

                <th>
                    تاريخ التطعيم
                </th>

            </tr>

    `;


    // Add vaccinations

    vaccinationSchedule.forEach(
        function(vaccine) {

            const vaccinationDate =
                calculateVaccinationDate(
                    birthDate,
                    vaccine.months
                );


            const formattedDate =
                formatDate(
                    vaccinationDate
                );


            tableHTML += `

                <tr>

                    <td>
                        ${vaccine.name}
                    </td>

                    <td>
                        ${vaccine.dose}
                    </td>

                    <td>
                        ${formattedDate}
                    </td>

                </tr>

            `;

        }
    );


    // Finish table

    tableHTML += `

        </table>

    `;


    // Display table

    document.getElementById(
        "vaccinationResult"
    ).innerHTML = tableHTML;

}


// ==========================================
// Growth Data
// ==========================================

let growthData = [];


// ==========================================
// Save Growth Data
// ==========================================

function saveGrowthData() {

    const month =
        document.getElementById(
            "growthMonth"
        ).value;


    const weight =
        document.getElementById(
            "weight"
        ).value;


    const height =
        document.getElementById(
            "height"
        ).value;


    if (month === "") {

        alert(
            "من فضلك اختاري الشهر"
        );

        return;

    }


    if (weight === "") {

        alert(
            "من فضلك أدخلي وزن الطفل"
        );

        return;

    }


    if (height === "") {

        alert(
            "من فضلك أدخلي طول الطفل"
        );

        return;

    }


    const measurement = {

        month: month,

        weight: weight,

        height: height

    };


    growthData.push(
        measurement
    );


    displayGrowthTable();


    document.getElementById(
        "growthMonth"
    ).value = "";


    document.getElementById(
        "weight"
    ).value = "";


    document.getElementById(
        "height"
    ).value = "";

}


// ==========================================
// Display Growth Table
// ==========================================

function displayGrowthTable() {

    let tableHTML = `

        <h3 class="growth-title">
            سجل نمو الطفل
        </h3>

        <table class="growth-table">

            <tr>

                <th>
                    الشهر
                </th>

                <th>
                    الوزن
                </th>

                <th>
                    الطول
                </th>

            </tr>

    `;


    growthData.forEach(
        function(data) {

            tableHTML += `

                <tr>

                    <td>
                        ${data.month}
                    </td>

                    <td>
                        ${data.weight} كجم
                    </td>

                    <td>
                        ${data.height} سم
                    </td>

                </tr>

            `;

        }
    );


    tableHTML += `

        </table>

    `;


    document.getElementById(
        "growthResult"
    ).innerHTML = tableHTML;

}
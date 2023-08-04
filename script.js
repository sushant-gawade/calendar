document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentMonthEl = document.getElementById("currentMonth");
    const calendarBody = document.getElementById("calendarBody");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function updateCalendar() {
        calendarBody.innerHTML = "";

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        let dayCount = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.textContent = daysInPrevMonth - firstDay + j + 1;
                    cell.classList.add("text-muted");
                } else if (dayCount <= lastDay) {
                    cell.textContent = dayCount;

                    if (
                        dayCount === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                    ) {
                        cell.classList.add("font-weight-bold");
                    }
                    dayCount++;
                } else {
                    cell.textContent = dayCount - lastDay;
                    cell.classList.add("text-muted");
                    dayCount++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }

        currentMonthEl.textContent = new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
    }

    updateCalendar();

    prevBtn.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextBtn.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
});

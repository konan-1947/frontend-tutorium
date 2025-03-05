import React, { useState } from "react";
import "../../../assets/css/scheduleTutor.css";
import { Navigate,useNavigate } from "react-router-dom";

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const generateCalendar = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(month, year);
  let days = [];
  let week = new Array(7).fill("");
  let dayCounter = 1;

  for (let i = firstDay; i < 7; i++) {
    week[i] = dayCounter.toString();
    dayCounter++;
  }
  days.push(week);

  while (dayCounter <= totalDays) {
    week = new Array(7).fill("");
    for (let i = 0; i < 7 && dayCounter <= totalDays; i++) {
      week[i] = dayCounter.toString();
      dayCounter++;
    }
    days.push(week);
  }

  return days;
};

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const Navigate = useNavigate();
  // Mảng công việc cố định cho các ngày
  const fixedTasks = {
    "2025-3-3": ["Dạy Toán"],
    "2025-3-5": ["Học Tiếng Anh"],
    "2025-3-7": ["Giảng dạy Lập trình"],
    "2025-3-10": ["Chữa bài tập cho học sinh"],
    // Thêm các ngày và công việc khác tại đây
  };

  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const weeks = generateCalendar(currentMonth, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleRegisterTask = () => {
    if (!selectedDate) return;

    const taskKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;

    // Nếu có công việc cho ngày đó, thực hiện đăng ký
   
  };

  return (
    <main className="calendar-contain">
      <section className="calendar__sidebar">
        <div className="sidebar__header">
          <span className="sidebar__title">Lịch dạy gia sư</span>
          <h2 className="sidebar__heading">
            {selectedDate
              ? ` ${selectedDate}/${currentMonth + 1}/${currentYear}`
              : "Chọn ngày"}
          </h2>
        </div>

      
   

        {selectedDate && fixedTasks[`${currentYear}-${currentMonth + 1}-${selectedDate}`] && (
          <div>
            <h3>Công việc:</h3>
            <ul>
              {fixedTasks[`${currentYear}-${currentMonth + 1}-${selectedDate}`].map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <button onClick={() => Navigate("/learner/cashing")}>Đăng ký</button>
          </div>
        )}
      </section>

      <section className="calendar__days">
        <section className="calendar-header">
          <button className="btn-schedule" onClick={handlePrevMonth}>{"<"}</button>
          <span>{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}</span>
          <button className="btn-schedule" onClick={handleNextMonth}>{">"}</button>
        </section>

        <section className="calendar__top-bar">
          {daysOfWeek.map((day) => (
            <span key={day} className="top-bar__days">{day}</span>
          ))}
        </section>

        {weeks.map((week, weekIndex) => (
          <section key={weekIndex} className="calendar__week">
            {week.map((day, dayIndex) => {
              const taskKey = `${currentYear}-${currentMonth + 1}-${day}`;
              return (
                <div
                  key={dayIndex}
                  className={`calendar__day ${day ? "" : "inactive"} ${selectedDate === day ? "selected" : ""}`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  <span className="calendar__date">{day}</span>
                  {day && fixedTasks[taskKey] && (
                    <span className="calendar__task">{fixedTasks[taskKey].length}</span>
                  )}
                </div>
              );
            })}
          </section>
        ))}
      </section>
    </main>
  );
};

export default Calendar;

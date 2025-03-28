import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useGetWorkingTime } from "../../../hooks/learner/getWorkingTime";
import "../../../assets/css/lich2.css"; // Import file CSS

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const generateCalendar = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(month, year);
  const days = [];
  let week = Array(7).fill("");
  let dayCounter = 1;

  for (let i = firstDay; i < 7; i++) week[i] = String(dayCounter++);
  days.push(week);

  while (dayCounter <= totalDays) {
    week = Array(7).fill("");
    for (let i = 0; i < 7 && dayCounter <= totalDays; i++) week[i] = String(dayCounter++);
    days.push(week);
  }

  return days;
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const { username } = useParams();

  const { mutate, data: workingTimesData, isPending, isError, error } = useGetWorkingTime();
  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const weeks = generateCalendar(currentMonth, currentYear);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (username) mutate(username);
  }, [username, mutate]);

  const registerMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await fetch("/api/tutor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Registration failed");
      return response.json();
    },
    onSuccess: () => navigate("/learner/cashing"),
    onError: (err) => {
      console.error("Registration error:", err);
      alert("Đăng ký thất bại, vui lòng thử lại!");
    },
  });

  const getTasksByDate = (workingTimes) => {
    if (!workingTimes?.workingTimes) return {};
    const tasksByDate = {};
    workingTimes.workingTimes.forEach((task) => {
      const date = new Date(task.starttime);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      tasksByDate[dateKey] = tasksByDate[dateKey] || [];
      const timeString = `${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${new Date(task.endtime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      tasksByDate[dateKey].push({ id: task.workingtimeid, time: timeString });
    });
    return tasksByDate;
  };

  const tasksByDate = getTasksByDate(workingTimesData);

  const handleMonthChange = (direction) => {
    setSelectedDate(null);
    if (direction === "prev") {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    }
  };

  const handleRegisterTask = () => {
    if (!selectedDate) return;
    const taskKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
    const tasks = tasksByDate[taskKey];
    if (tasks?.length) {
      registerMutation.mutate({
        date: taskKey,
        workingTimeIds: tasks.map((task) => task.id),
      });
    }
  };

  if (isPending) return <div className="text-center my-5"><Spinner animation="border" variant="primary" /> Đang tải lịch làm việc...</div>;
  if (isError) return <Alert variant="danger" className="text-center my-5">Lỗi: {error.message}</Alert>;

  return (
    <div>
      <Container className="my-7">
        <Row className="g-4"> {/* Tăng gap từ g-3 lên g-4 để xa nhau hơn */}
          <Col md={8} data-aos="fade-left">
            <section className="calendar__days">
              <header className="calendar-header">
                <Button className="btn-schedule" onClick={() => handleMonthChange("prev")}>
                  {"<"}
                </Button>
                <span>
                  {new Date(currentYear, currentMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Button className="btn-schedule" onClick={() => handleMonthChange("next")}>
                  {">"}
                </Button>
              </header>

              <div className="calendar__top-bar">
                {daysOfWeek.map((day) => (
                  <span key={day} className="top-bar__days">
                    {day}
                  </span>
                ))}
              </div>

              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="calendar__week">
                  {week.map((day, dayIndex) => {
                    const taskKey = `${currentYear}-${currentMonth + 1}-${day}`;
                    const hasTasks = day && tasksByDate[taskKey];
                    return (
                      <div
                        key={dayIndex}
                        className={`calendar__day ${day ? "active" : "inactive"} ${
                          selectedDate === day ? "selected" : ""
                        } ${hasTasks ? "has-tasks" : ""}`}
                        onClick={() => day && setSelectedDate(day)}
                      >
                        <span className="calendar__date">{day}</span>
                        {hasTasks && <span className="calendar__task">{tasksByDate[taskKey].length}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </section>
          </Col>
          <Col md={3} data-aos="fade-right">
            <aside className="calendar__sidebar2">
              <header className="sidebar__header">
                <h1 className="sidebar__title">Lịch dạy gia sư</h1>
                <h2 className="sidebar__heading">
                  {selectedDate ? `${selectedDate}/${currentMonth + 1}/${currentYear}` : "Chọn ngày"}
                </h2>
              </header>

              {!workingTimesData?.workingTimes || workingTimesData.workingTimes.length === 0 ? (
                <div className="sidebar__tasks">
                  <p className="text-muted">Không có lịch làm việc.</p>
                </div>
              ) : (
                selectedDate ? (
                  tasksByDate[`${currentYear}-${currentMonth + 1}-${selectedDate}`] ? (
                    <div className="sidebar__tasks">
                      <h3>Thời gian:</h3>
                      <ul>
                        {tasksByDate[`${currentYear}-${currentMonth + 1}-${selectedDate}`].map((task, index) => (
                          <li key={index}>{task.time}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="sidebar__tasks">
                      <p className="text-muted">Không có thời gian khả dụng cho ngày này.</p>
                    </div>
                  )
                ) : null
              )}
            </aside>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Calendar;

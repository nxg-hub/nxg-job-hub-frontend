import { useContext, useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { tasks } from "../../../../../utils/data/employerTasks";
import { UserContext } from "../../..";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
register();

const Swiper = () => {
  const user = useContext(UserContext);
  const userID = user.id;
  // console.log(userID);
  const { data } = useApiRequest(`/api/interviews/employer/${userID}`);
  // console.log(data);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}-${month < 10 ? "0" : null}${month}-${
    day < 10 ? "0" : null
  }${day}`;

  const swipe = useRef();
  useEffect(() => {
    const labels = ["New", "Updated", "Completed"];
    const mySwiper = swipe.current;
    const params = {
      pagination: {
        clickable: true,
        el: ".pagination-container",
        renderBullet: function (index, className) {
          return '<div class="' + className + '">' + labels[index] + "</div>";
        },
      },
    };

    Object.assign(mySwiper, params);
    mySwiper.initialize();
  }, []);
  return (
    <>
      <header
        style={{
          padding: 0,
          margin: "0 0 10px 0",
          background: "#f2f2f2",
          borderRadius: "4px",
        }}
        className="pagination-container pagination-container1">
        <p className="swiper-pagination-bullet new">New</p>
        <p className="swiper-pagination-bullet updated">Updated </p>
        <p className="swiper-pagination-bullet completed">Completed</p>
      </header>
      <swiper-container className="container" init="false" ref={swipe}>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate > currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate === currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate < currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
      </swiper-container>
    </>
  );
};
export const Swiper2 = () => {
  const user = useContext(UserContext);
  const userID = user.id;
  const { data } = useApiRequest(`/api/interviews/employer/${userID}`);
  // console.log(data);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}-${month < 10 ? "0" : null}${month}-${
    day < 10 ? "0" : null
  }${day}`;
  const swipe2 = useRef();
  useEffect(() => {
    const labels2 = ["New", "Updated", "Completed"];
    const mySwiper2 = swipe2.current;
    const params2 = {
      pagination: {
        clickable: true,
        el: ".pagination-container2",
        renderBullet: function (index, className) {
          return '<div class="' + className + '">' + labels2[index] + "</div>";
        },
      },
    };

    Object.assign(mySwiper2, params2);
    mySwiper2.initialize();
  }, []);
  return (
    <>
      <header
        style={{
          padding: 0,
          margin: "0 0 10px 0",
          background: "#f2f2f2",
          borderRadius: "4px",
        }}
        className="pagination-container2 pagination-container2">
        <p className="swiper-pagination-bullet new">New</p>
        <p className="swiper-pagination-bullet updated">Updated </p>
        <p className="swiper-pagination-bullet completed">Completed</p>
      </header>
      <swiper-container className="container" init="false" ref={swipe2}>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate > currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id + 50}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate === currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id + 50}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
        <swiper-slide className="blue-slide">
          {data
            .filter((task) => {
              return task.interviewDate < currentDate;
            })
            .map((task, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderBottom: " 1px solid #006a90",
                  textAlign: "center",
                }}
                key={id + 50}>
                <p className="task">Interview with {task.talentName}</p>
                <small>{task.interviewDate}</small>
              </div>
            ))}{" "}
        </swiper-slide>
      </swiper-container>
    </>
  );
};

export default Swiper;

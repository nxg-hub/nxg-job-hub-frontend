import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { tasks } from "../../../../../utils/data/employerTasks";
register();

const Swiper = () => {
  const swipe = useRef();
  const labels = ["New", "Updated", "Completed"];
  useEffect(() => {
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
      <header style={{
        padding: 0,
        margin: "0 0 10px 0",
        background: "#f2f2f2",
        borderRadius:"4px"
      }} class="pagination-container pagination-container1">
        <p class="swiper-pagination-bullet new">New</p>
        <p class="swiper-pagination-bullet updated">Updated </p>
        <p class="swiper-pagination-bullet completed">Completed</p>
      </header>
      <swiper-container class="container" init="false" ref={swipe}>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
      
      </swiper-container>
    </>
  );
};
export const Swiper2 = () => {
  const swipe2 = useRef();
  const labels2 = ["New", "Updated", "Completed"];
  useEffect(() => {
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
      <header style={{
        padding: 0,
        margin: "0 0 10px 0",
        background: "#f2f2f2",
        borderRadius:"4px"
      }} class="pagination-container2 pagination-container2">
        <p class="swiper-pagination-bullet new">New</p>
        <p class="swiper-pagination-bullet updated">Updated </p>
        <p class="swiper-pagination-bullet completed">Completed</p>
      </header>
      <swiper-container class="container" init="false" ref={swipe2}>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id+50}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id+50}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
        <swiper-slide class="blue-slide">
          {tasks.map((task, id) => (
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
                borderBottom: " 1px solid #006a90",
                textAlign:"center"
            }} key={id+50}>
              <p
                class="task"
              >
                {task.type}
              </p>
              <small >{task.date}</small>
            </div>
          ))}{" "}
        </swiper-slide>
      
      </swiper-container>
    </>
  );
};

export default Swiper;

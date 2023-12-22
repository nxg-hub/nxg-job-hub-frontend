import { register } from "swiper/element/bundle";
register();

const Swiper = () => {
  return (
    <swiper-container navigation="true" pagination={{clickable: true}}>
      <swiper-slide class="blue-slide">Slide 1</swiper-slide>
      <swiper-slide class="yellow-slide">Slide 2</swiper-slide>
      <swiper-slide class="green-slide">Slide 3</swiper-slide>
    </swiper-container>
  );
};

export default Swiper;

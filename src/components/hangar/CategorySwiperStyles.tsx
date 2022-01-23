const CategorySwiperStyles: React.FC = () => {
  return (
    <style global jsx>{`
      .swiper {
        width: 100%;
        height: 130px;
      }

      .swiper-slide {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1px;
        color: #46474d;
        background-size: contain;
        background-repeat: no-repeat;
        border: 3px solid black;
        background-color: rgb(255, 255, 255);
      }

      .swiper-slide-active {
        outline: 6px solid black;
        outline-offset: -6px;
      }

      .swiper-slide:first-of-type,
      .swiper-slide:last-of-type {
        display: flex;
        background-color: unset;
        border: none;
        outline: none;
      }

      .swiper-slide-active p {
        background: #ffc246;
        width: 100%;
      }
    `}</style>
  );
};

export default CategorySwiperStyles;

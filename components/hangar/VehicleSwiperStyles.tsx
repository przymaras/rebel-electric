const VehicleSwiperStyles: React.FC = () => {
  return (
    <style global jsx>{`
      .swiper {
        width: 100%;
        height: calc(100vw / 1.33);
        max-height: 650px;
        margin-left: 0;
        margin-right: 0;
        --swiper-navigation-color: #ffc246;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .mySwiper {
        height: 100%;
        box-sizing: border-box;
      }

      .mySwiper .swiper-slide {
        width: 25%;
        height: calc((90vw / 4) / 1.33);
        opacity: 0.8;
      }

      .mySwiper .swiper-slide-thumb-active {
        opacity: 1;
        outline: 2px solid var(--accent-color);
        outline-offset: -2px;
      }

      .swiper-horizontal:nth-child(2) {
        padding: 0.5em 0 0.5em 0;
      }

      @media (min-width: 1280px) {
        .swiper {
          max-height: 600px;
        }

        .mySwiper {
          max-height: 115px;
        }

        .mySwiper .swiper-slide {
          max-height: 100px;
        }
      }
    `}</style>
  );
};

export default VehicleSwiperStyles;

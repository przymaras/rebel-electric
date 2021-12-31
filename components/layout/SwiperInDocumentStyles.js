function SwiperInDocumentStyles() {
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
        box-shadow: 0px 4px 4px #bbbbbb;
        background-size: contain;
        background-repeat: no-repeat;
        border: 3px solid black;
        background-color: rgb(255, 255, 255);
      }

      .swiper-slide-active {
        outline: 6px solid black;
        outline-offset: -6px;
      }

      .swiper-slide-active p {
        background: var(--accent-color);
        width: 100%;
      }
    `}</style>
    //Card styles
    //   <style global jsx>{`
    //   .swiper {
    //     width: 240px;
    //     height: 180px;
    //   }

    //   .swiper-slide {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     justify-content: space-evenly;
    //     /* border-radius: 18px; */
    //     font-size: 22px;
    //     font-weight: bold;
    //     letter-spacing: 1px;
    //     color: #46474d;
    //     padding-bottom: 0.5em;
    //     box-shadow: 0px 4px 4px #bbbbbb;
    //     background-size: contain;
    //     background-repeat: no-repeat;
    //     border: 3px solid black;
    //     background-color: rgb(255, 255, 255);
    //   }
    // `}</style>
  );
}

export default SwiperInDocumentStyles;

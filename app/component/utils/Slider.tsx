import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from '~/styles/slider.css';

const Slideshow = ({ slideImages }: any) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextButton: any = useRef();
  const prevButton: any = useRef();

  const nextButtonSlide = (e: any) => {
    e.preventDefault();

    if (slideIndex !== slideImages.length) {
      setSlideIndex(slideIndex + 1);
    }

    if (slideIndex === slideImages.length) {
      setSlideIndex(1);
    }
  };

  const prevButtonSlide = (e: any) => {
    e?.preventDefault();

    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    }

    if (slideIndex === 1) {
      setSlideIndex(slideImages.length);
    }
  };

  const nextSlide = () => {
    if (slideIndex !== slideImages.length) {
      setSlideIndex(slideIndex + 1);
    }

    if (slideIndex === slideImages.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    }

    if (slideIndex === 1) {
      setSlideIndex(slideImages.length);
    }
  };

  const moveDot = (i: number, e: any) => {
    e.preventDefault();
    setSlideIndex(i);
  };

  const onMouseOver = (): any => {
    prevButton.current.style.opacity = 1;
    nextButton.current.style.opacity = 1;
  };

  const onMouseOut = (): any => {
    prevButton.current.style.opacity = 0;
    nextButton.current.style.opacity = 0;
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      // console.log('User Swiped!', eventData);
      if (eventData.dir === 'Right') prevSlide();
      if (eventData.dir === 'Left') nextSlide();
    },
  });

  return (
    <div
      className="container-slider"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...handlers}
    >
      {slideImages.map((el: any, i: any) => {
        return (
          <div
            key={i}
            className={slideIndex === i + 1 ? 'slide active-img' : 'slide'}
          >
            <img src={el} alt="ant" />
          </div>
        );
      })}
      <div className="btn-slide-container">
        <button
          ref={prevButton}
          onClick={(e) => prevButtonSlide(e)}
          className="btn-slide prev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          ref={nextButton}
          onClick={(e) => nextButtonSlide(e)}
          className="btn-slide next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="container-dots">
        {Array.from({ length: slideImages.length }).map((item, i) => {
          return (
            <div
              onClick={(e) => moveDot(i + 1, e)}
              className={slideIndex === i + 1 ? 'dot active' : 'dot'}
              key={i}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Slideshow;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

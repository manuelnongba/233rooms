import { useRef, useState } from 'react';
import styles from '~/styles/slider.css';

const slideImages = [
  {
    url: 'accra.png',
    caption: 'city',
  },
  {
    url: 'kumasi.png',
    caption: 'city1',
  },
  {
    url: 'accra.png',
    caption: 'city2',
  },
  {
    url: 'kumasi.png',
    caption: 'city1',
  },
];

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextButton: any = useRef();
  const prevButton: any = useRef();

  const nextSlide = (e: any) => {
    e.preventDefault();

    if (slideIndex !== slideImages.length) {
      setSlideIndex(slideIndex + 1);
    }

    if (slideIndex === slideImages.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = (e: any) => {
    e.preventDefault();

    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    }

    if (slideIndex === 1) {
      setSlideIndex(slideImages.length);
    }
  };

  const moveDot = (i: number) => {
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

  return (
    <div
      className="container-slider"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {slideImages.map((el, i) => {
        return (
          <div
            key={i}
            className={slideIndex === i + 1 ? 'slide active-img' : 'slide'}
          >
            <img src={el.url} alt="ant" />
          </div>
        );
      })}
      <button
        ref={prevButton}
        onClick={(e) => prevSlide(e)}
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
        onClick={(e) => nextSlide(e)}
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

      <div className="container-dots">
        {Array.from({ length: slideImages.length }).map((item, i) => {
          return (
            <div
              onClick={() => moveDot(i + 1)}
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

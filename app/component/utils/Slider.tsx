import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Blurhash } from 'react-blurhash';

import styles from '~/styles/slider.css';

const Slideshow = ({ slideImages }: { slideImages: string[] }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [width, setWidth] = useState(300);
  const nextButton = useRef() as MutableRefObject<HTMLButtonElement>;
  const prevButton = useRef() as MutableRefObject<HTMLButtonElement>;

  console.log(slideImages);

  const nextButtonSlide = (e: React.MouseEvent) => {
    e.preventDefault();

    if (slideIndex !== slideImages.length) {
      setSlideIndex(slideIndex + 1);
    }

    if (slideIndex === slideImages.length) {
      setSlideIndex(1);
    }
  };

  const prevButtonSlide = (e: React.MouseEvent) => {
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

  const moveDot = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSlideIndex(i);
  };

  const onMouseOver = (): void => {
    prevButton.current.style.opacity = '1';
    nextButton.current.style.opacity = '1';
  };

  const onMouseOut = (): void => {
    prevButton.current.style.opacity = '0';
    nextButton.current.style.opacity = '0';
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      // console.log('User Swiped!', eventData);
      if (eventData.dir === 'Right') prevSlide();
      if (eventData.dir === 'Left') nextSlide();
    },
  });

  useEffect(() => {
    const innerWidth = window?.innerWidth;
    if (innerWidth <= 695) {
      setWidth(370);
    } else setWidth(300);
  }, []);

  return (
    <div
      className="container-slider"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...handlers}
    >
      {slideImages.map((el: string, i: number) => {
        return (
          <div key={i}>
            <div
              className={slideIndex === i + 1 ? 'slide active-img' : 'slide'}
              style={{
                display: imageLoaded ? 'none' : '',
              }}
            >
              <Blurhash
                hash={'L9Qcn{IUWBt7~qayWBayIUayWBay'}
                width={width}
                height={width}
                resolutionX={34}
                resolutionY={34}
                punch={1}
              />
            </div>
            <div
              className={slideIndex === i + 1 ? 'slide active-img' : 'slide'}
              style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            >
              <img
                src={el}
                alt="ant"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
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

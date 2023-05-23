import { Fade, Zoom, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: 'public/accra.png',
    caption: 'city',
  },
  {
    url: 'public/accra.png',
    caption: 'city1',
  },
  {
    url: 'public/accra.png',
    caption: 'city2',
  },
];

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000',
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px',
};

// const imgs = slideImages.map((img, i) => {
//   return (
//     <div
//       key={i}
//       style={{
//         ...divStyle,
//         backgroundImage: `url(${img.url})`,
//       }}
//     >
//       <div>
//         <span style={spanStyle}>{img.caption}</span>
//       </div>
//     </div>
//   );
// });

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default Slideshow;

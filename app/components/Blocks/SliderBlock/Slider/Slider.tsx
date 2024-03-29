import React, { ReactChild, ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './styles.module.css';

const CustomSlider = ({ children }: { children: React.ReactNode }) => {
  const renderCustomThumbs = (items: ReactNode[]) => {
    return items.map((item, index) => (
      <div key={index} className="custom-thumb">
        <img
          src={`/uploads/${(item as React.ReactElement).props.img}`}
          alt={(item as React.ReactElement).props.img}
        />
      </div>
    ));
  };
  return (
    <>
      <Carousel
        renderThumbs={renderCustomThumbs}
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        className={styles.slider}
      >
        {React.Children.toArray(children) as ReactChild[]}
      </Carousel>
    </>
  );
};

export default CustomSlider;

export type SlideType = {
  img: string;
  text?: string;
};

export const Slide = ({ img, text }: SlideType) => {
  return (
    <>
      <img className={styles.img} src={`/uploads/${img}`} alt={img} />
      <p>{text}</p>
    </>
  );
};

import { RefObject } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { TIMELINE_DATA } from '@/shared/config';
import { formatCounter } from '../model'

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './styles.scss';

interface EventSliderProps {
  sliderRef: RefObject<HTMLDivElement>;
  activeIdx: number;
  onSelect: (index: number) => void;
}

export const EventSlider = ({
  sliderRef,
  activeIdx,
  onSelect
}: EventSliderProps) => {
  const currentEvents = TIMELINE_DATA[activeIdx].events;

  const prevEvent = () => onSelect(activeIdx - 1);
  const nextEvent = () => onSelect(activeIdx + 1);

  const disablePrev = activeIdx === 0;
  const disableNext = activeIdx === TIMELINE_DATA.length - 1;

  return (
    <>
      <div className="slider__navigation navigation">
        <p className="navigation__total">{formatCounter(TIMELINE_DATA.length, activeIdx)}</p>
        <div className="navigation__buttons control-buttons">
          <button
            className={`control-buttons__default control-buttons__prev ${
              disablePrev ? 'control-buttons__disabled' : ''
            }`}
            onClick={prevEvent}
            disabled={disablePrev}
            aria-label="Previous event"
          />
          <button
            className={`control-buttons__default control-buttons__next ${
              disableNext ? 'control-buttons__disabled' : ''
            }`}
            onClick={nextEvent}
            disabled={disableNext}
            aria-label="Next event"
          />
        </div>
      </div>

      <div ref={sliderRef} className="slider__container slider">
        <p className="slider__mobile-title">{TIMELINE_DATA[activeIdx].title}</p>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={80}
          slidesPerView={4}
          navigation={{
            prevEl: '.slider__btn_prev',
            nextEl: '.slider__btn_next'
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 25 },
            769: { slidesPerView: 3, spaceBetween: 80 },
            1025: { slidesPerView: 4, spaceBetween: 80 }
          }}
        >
          {currentEvents.map(({ date, description }, idx) => (
            <SwiperSlide key={`${date}-${idx}`} className="slider__slide">
              <p className="slider__year">{date}</p>
              <p className="slider__description">{description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="slider__btn slider__btn_prev" aria-hidden="true" />
        <button className="slider__btn slider__btn_next" aria-hidden="true" />
      </div>

      <div className="events__control-buttons">
        {TIMELINE_DATA.map((_, idx) => (
          <button
            key={idx}
            className={`events__button ${activeIdx === idx ? 'events__button_active' : ''}`}
            onClick={() => onSelect(idx)}
            aria-label={`Go to event ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
};

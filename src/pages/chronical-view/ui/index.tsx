import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { TIMELINE_DATA } from '@/shared/config';
import { DEFAULT_ROTATION_DURATION } from '../model'
import { EventSlider } from '@/features/event-slider';
import { ChronologyCircle } from '@/features/chronology-circle';

import './styles.scss';

export const ChronicleView = () => {
  const baseRotation = 360 / TIMELINE_DATA.length;

  const sliderContainer = useRef<HTMLDivElement>(null);
  const circleContainer = useRef<HTMLDivElement>(null);
  const beginRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLDivElement>(null);

  const [currentRotation, setCurrentRotation] = useState(baseRotation);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spinTime, setSpinTime] = useState(DEFAULT_ROTATION_DURATION);
  const [beginDate, setBeginDate] = useState(+TIMELINE_DATA[0].events[0].date);
  const [finishDate, setFinishDate] = useState(
    +TIMELINE_DATA[0].events[TIMELINE_DATA[0].events.length - 1].date
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      sliderContainer.current?.classList.add('slider_show');
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const hideSliderThen = (callback: () => void) => {
    sliderContainer.current?.classList.remove('slider_show');
    setTimeout(callback, 300);
  };

  const transitionDates = (index: number) => {
    const newBegin = Number(TIMELINE_DATA[index].events[0].date);
    const newFinish = Number(
      TIMELINE_DATA[index].events[TIMELINE_DATA[index].events.length - 1].date
    );
    const durationSec = (spinTime + 300) / 1000;

    const diffBegin = newBegin - beginDate;
    const diffFinish = newFinish - finishDate;

    gsap.to(beginRef.current, {
      duration: durationSec,
      textContent: `+=${diffBegin}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setBeginDate(newBegin)
    });
    gsap.to(finishRef.current, {
      duration: durationSec,
      textContent: `+=${diffFinish}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setFinishDate(newFinish)
    });
  };

  const selectNewEvent = (target: number) => {
    if (target < 0 || target >= TIMELINE_DATA.length) return;

    transitionDates(target);

    if (circleContainer.current?.children[target]) {
      circleContainer.current.children[target].classList.add('spinner__shoulder_active');
    }

    const newRotation = baseRotation - target * baseRotation;
    setSpinTime(Math.abs(activeIndex - target) * DEFAULT_ROTATION_DURATION);
    setTimeout(() => {
      setCurrentRotation(newRotation);
    }, 300);

    hideSliderThen(() => setActiveIndex(target));
  };

  return (
    <section className="main-page">
      <div className="main-page__container">
        <h1 className="main-page__title">Исторические даты</h1>
        <ChronologyCircle
          rotationAngle={currentRotation}
          activeIdx={activeIndex}
          beginDate={beginDate}
          finishDate={finishDate}
          beginRef={beginRef}
          finishRef={finishRef}
          circleRef={circleContainer}
          spinTime={spinTime}
          onSelect={selectNewEvent}
        />
        <EventSlider
          activeIdx={activeIndex}
          sliderRef={sliderContainer}
          onSelect={selectNewEvent}
        />
      </div>
    </section>
  );
};

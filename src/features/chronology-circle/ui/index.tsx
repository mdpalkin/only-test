import { RefObject } from 'react'

import { TIMELINE_DATA } from '@/shared/config';

import './styles.scss';

interface Props {
  beginRef: RefObject<HTMLDivElement>;
  finishRef: RefObject<HTMLDivElement>;
  circleRef: RefObject<HTMLDivElement>;
  beginDate: number;
  finishDate: number;
  rotationAngle: number;
  spinTime: number;
  activeIdx: number;
  onSelect: (index: number) => void;
}

export const ChronologyCircle = ({
  beginRef,
  finishRef,
  circleRef,
  beginDate,
  finishDate,
  rotationAngle,
  spinTime,
  activeIdx,
  onSelect
}: Props) => {
  const totalCount = TIMELINE_DATA.length;
  const anglePerItem = 360 / totalCount;

  return (
    <>
      <div className="chronology-circle__range range">
        <p className="range_start" ref={beginRef}>
          {beginDate}
        </p>
        <p className="range_end" ref={finishRef}>
          {finishDate}
        </p>
      </div>
      <div className="chronology-circle__spinner spinner">
        <div
          ref={circleRef}
          className="spinner__main-circle"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: `all ${spinTime}ms ease-in-out`
          }}
        >
          {TIMELINE_DATA.map((entry, idx) => {
            const shoulderRotation = anglePerItem * (idx + 1);
            const circleRotation = -anglePerItem * (idx + 1) - rotationAngle;
            return (
              <div
                key={idx}
                className={`spinner__shoulder ${activeIdx === idx ? 'spinner__shoulder_active' : ''}`}
                style={{ transform: `rotate(${shoulderRotation}deg)` }}
                onClick={() => onSelect(idx)}
              >
                <div className="spinner__circle-area">
                  <p
                    className="spinner__circle"
                    style={{ transform: `rotate(${circleRotation}deg)` }}
                  >
                    {idx + 1}
                    <span 
                    style={{transition: `opacity ${spinTime}ms linear ${spinTime}ms` }} 
                    className="spinner__title">{entry.title}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

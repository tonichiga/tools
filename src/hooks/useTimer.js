import { useState, useEffect } from "react";

const useTimer = ({ targetTime }) => {
  const offset = targetTime.serverTime - Date.now();
  const endTime = targetTime.endTime - targetTime.serverTime + offset;

  const endTimestamp = endTime + Date.now();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  useEffect(() => {
    const idinterval = setInterval(() => {
      // const endTime = targetTime;
      // const currentTime = Date.now() - offsetTime + offsetServerTime;

      let deltaTime = endTimestamp - Date.now();
      if (deltaTime < 0) {
        clearInterval(idinterval);
        deltaTime = 0;
      }
      updateClockFace(deltaTime);
    }, 1000);
    return () => {
      clearInterval(idinterval);
    };

    // eslint-disable-next-line
  }, [targetTime]);

  function updateClockFace(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */

    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    setTimeLeft({
      days,
      hours,
      mins,
      secs,
    });
    // console.log(
    //   `Осталось ${days} дней ${hours} часов ${mins} минут ${secs} секунд`
    // );
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  return timeLeft;
};

export default useTimer;

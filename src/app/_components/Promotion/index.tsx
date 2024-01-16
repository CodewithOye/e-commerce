'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

  })

  const targetDate = new Date(); // initialize with the current date
  targetDate.setDate(targetDate.getDate() + 7); // add 7 days

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      // Check if the target date is reached
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Optional: Set time to 0 when the target date is reached
      } else {
        const secondsRemaining = Math.floor(timeDifference / 1000);
        const days = Math.floor(secondsRemaining / (24 * 3600));
        const hours = Math.floor((secondsRemaining % (24 * 3600)) / 3600);
        const minutes = Math.floor((secondsRemaining % 3600) / 60);
        const seconds = secondsRemaining % 60;

        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Cleanup the interval when the component unmounts or when the target date is reached
    return () => clearInterval(intervalId);
  }, []);


  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our DEALS of the MONTH!
          Every purchases comes with exlusive perks and offers , making this month a celebration of savvy choices and amazing deals. DONT MISS OUT !!!!
        </p>
        <ul className={classes.stats}>
         <StatBox label='Days' value={time.days} />
         <StatBox label='Hours' value={time.hours} />
         <StatBox label='Minutes' value={time.minutes} />
         <StatBox label='Seconds' value={time.seconds} />
        </ul>


      </div>
      </section>
  )
}

const StatBox = ({label,value} : {label: string; value: number}) => (
  <li className={classes.statBox}>
            <h4>{value}</h4>
            <p>{label}</p>
  </li>

)

export default Promotion

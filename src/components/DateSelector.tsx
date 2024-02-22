import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface DateSelectorProps {
    onDateSelect: (date: Date) => void;
}


const DateSelector: React.FC<DateSelectorProps> = ({onDateSelect}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const slider = useRef<Slider>(null);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

  const [datesOfMonth, setDatesOfMonth] = useState<{ date: Date; day: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const dates: { date: Date; day: string }[] = [];

    for (let i = currentDate.getDate(); i <= lastDayOfMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      dates.push({ date, day });
    }

    setDatesOfMonth(dates);
  }, []);

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//   };

  return (
    <div className='app-container'>
      {/* <h2 className='text-blue-500'>Dates from Today to End of Month</h2> */}
    <div className='w-[90%] mx-auto flex'>
      <button onClick={() => slider?.current?.slickPrev()}>-</button>

      <div className="w-[92%]">
        <Slider ref={slider} {...settings}>
          {datesOfMonth.map((dateObj, index) => (
            <div key={index} 
                className='flex flex-col'
                onClick={() => handleDateClick(dateObj.date)}>
                <div>
                    {dateObj.date.getDate()} {dateObj.date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div>
                    {dateObj.day}
                </div>
            </div>
          ))}
        </Slider>
      </div>

      <button onClick={() => slider?.current?.slickNext()}>+</button>
    </div>
      {/* {
      selectedDate && (
        <div>
          <h3>Selected Date</h3>
          <p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      )
      } */}
    </div>
  );
};

export default DateSelector;

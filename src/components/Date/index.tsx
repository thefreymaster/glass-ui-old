import React from "react";
import Glass from "../../common/GlassCard";

const DateStamp = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setCurrentDate(new Date());
    }, 600000);
  }, [currentDate]);

  return (
    <Glass.Card alignItems="center" display="flex" justifyContent="center">
      <Glass.CardMetric
        fontSize="36px"
        style={{
          lineHeight: "25px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {currentDate.toLocaleDateString("en", {
          weekday: 'long',
          month: "long",
          day: "numeric",
        })}
      </Glass.CardMetric>
    </Glass.Card>
  );
};

export default DateStamp;

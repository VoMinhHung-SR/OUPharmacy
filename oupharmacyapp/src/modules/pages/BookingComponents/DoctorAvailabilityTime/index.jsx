const DoctorAvailabilityTime = ({ disabledTimes, isLoading, onChange }) => {
    const renderRadioButtons = () => {
      const radioButtons = [];
      for (let hour = 7; hour <= 16; hour++) {
        const label = `${hour}:00 - ${hour + 1}:00`;
        const isDisabled = disabledTimes.some(
          (time) =>
            time.start_time === `${hour.toString().padStart(2, "0")}:00:00` &&
            time.end_time === `${(hour + 1).toString().padStart(2, "0")}:00:00`
        );
        radioButtons.push(
          <label key={hour} className={`ou-radio-label ${isDisabled ? 'ou-opacity-50 ou-cursor-not-allowed' : ''}`}>
            <input
              type="radio"
              name="hour"
              value={label}
              className="ou-radio-input"
              disabled={isDisabled}
              onChange={onChange}
            />
            <div className="ou-radio-custom">{label}</div>
          </label>
        );
      }
      return radioButtons;
    };
  
    return (
      <div className="ou-radio-container">
        {!isLoading && renderRadioButtons()}
      </div>
    );
  };
  
  export default DoctorAvailabilityTime;
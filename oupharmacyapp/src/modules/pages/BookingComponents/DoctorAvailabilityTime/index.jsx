const DoctorAvailabilityTime = () => {
    const renderRadioButtons = () => {
      const radioButtons = [];
      for (let hour = 7; hour <= 16; hour++) {
        const label = `${hour}:00 - ${hour + 1}:00`;
        radioButtons.push(
          <label key={hour} className="ou-radio-label">
            <input type="radio" name="hour" value={label} className="ou-radio-input" />
            <div className="ou-radio-custom">{label}</div>
          </label>
        );
      }
      return radioButtons;
    };
  
    return <div className="ou-radio-container ">{renderRadioButtons()}</div>;
  };
  
  export default DoctorAvailabilityTime;
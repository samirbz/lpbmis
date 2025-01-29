import NepaliDatePicker from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';

const BSDatePicker = () => {
  const [nepaliDate, setNepaliDate] = useState(null);

  return (
    <div>
      <NepaliDatePicker
        value={nepaliDate}
        onChange={(date) => setNepaliDate(date)}
        options={{ calenderLocale: 'ne', valueLocale: 'en' }} // Options for localization
      />
    </div>
  );
};

export default BSDatePicker;

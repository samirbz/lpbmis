const convertNumbersToDevanagari = (nepaliDateString) => {
  const numberMap = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };

  return nepaliDateString.replace(/[0-9]/g, (match) => numberMap[match]);
};

export default convertNumbersToDevanagari;

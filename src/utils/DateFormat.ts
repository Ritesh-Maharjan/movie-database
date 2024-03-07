const changeDateFormat = (date: string | undefined) => {
  if (!date) return;
  const updateDate = new Date(date);

  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    updateDate
  );

  return formattedDate;
};

export default changeDateFormat;

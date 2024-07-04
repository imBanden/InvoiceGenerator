const getCurrentDate = ({ offset = 0 }) => {
  const now = new Date();
  now.setDate(now.getDate() + offset);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default getCurrentDate;

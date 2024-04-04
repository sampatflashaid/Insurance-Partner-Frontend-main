export function getAgeFromDate(date) {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

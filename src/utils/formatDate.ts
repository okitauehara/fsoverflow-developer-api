export default function formatDate(submitedDate: string) {
  const date = new Date(submitedDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
  return formattedDate;
}

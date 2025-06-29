export const stripHtml = (html: any) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const truncateText = (text: any, maxLength = 150) => {
  const cleanText = stripHtml(text);
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength) + "...";
};

export const extractTextFromHTML = (html: string, maxLength: number = 120) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const getReadingTime = (content: any) => {
  const words = stripHtml(content).split(" ").length;
  const readingTime = Math.ceil(words / 200);
  return `${readingTime} min read`;
};

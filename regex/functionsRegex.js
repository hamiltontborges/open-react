export function getVideoId(link_video) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = link_video.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  }
}

export function formatDate(datePosted) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  const date = new Date(datePosted)
  const day = date.getDate().toString().padStart(2, '0')
  const month = meses[(date.getMonth() + 1).toString()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}

export function firstLetter(name) {
  const firstLetter = name.substr(0, 1).toUpperCase();
  return firstLetter;
}
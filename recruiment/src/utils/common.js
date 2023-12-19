export const timeCaculate = (datetime) => {
  var oneHour = 60 * 60 * 1000;
  var oneDate = 60 * 60 * 1000 * 24;
  var dateCreated = new Date(datetime);
  var currentDate = new Date();
  if (currentDate - dateCreated < oneHour) {
    var minuteCurent = currentDate.getMinutes();
    var minuteCreated = dateCreated.getMinutes();
    if (minuteCurent < minuteCreated) {
      minuteCurent += 60;
      return minuteCurent - minuteCreated + " phút trước";
    } else {
      if (minuteCreated - minuteCurent <= 1) {
        return "vừa xong";
      } else {
        return minuteCreated - minuteCurent + " phút trước";
      }
    }
  } else if (currentDate - dateCreated < oneDate) {
    var hourCurent = currentDate.getHours();
    var hourCreated = dateCreated.getHours();
    if (hourCurent < hourCreated) {
      hourCurent += 24;
      return hourCurent - hourCreated + " giờ trước";
    } else {
      return hourCurent - hourCreated + " giờ trước";
    }
  } else {
    var dayCurent = currentDate.getDate();
    var dayCreated = dateCreated.getDate();
    var preMonth = currentDate.getMonth() - 1;
    if (dayCurent < dayCreated) {
      if (
        preMonth == 1 ||
        preMonth == 3 ||
        preMonth == 5 ||
        preMonth == 7 ||
        preMonth == 8 ||
        preMonth == 10 ||
        preMonth == 12
      ) {
        dayCurent += 31;
      } else if (preMonth == 2) {
        dayCurent += 28;
      } else {
        dayCurent += 30;
      }
      return dayCurent - dayCreated + " ngày trước";
    } else {
      return dayCurent - dayCreated + " ngày trước";
    }
  }
};

const axios = require("axios")

module.exports = town => {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + town + "&appid=a6dbb945a94c4b5240c048de757cdf0b&mode=json",
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    }).then(res => {
      let json = res.data;
      const weatherData = json.list.map(item => ({
        date: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description
      }));
      resolve(weatherData);
    });
  });
};

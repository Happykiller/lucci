import datas from '../datas.json' assert { type: "json" };

export class Lucci {

  metrics;
  dates;
  times;
  distOnCals;

  constructor() {
    this.getMetrics();
  }

  getMetrics() {
    if(!this.metrics) {
      this.metrics = [];
    } else {
      return this.metrics;
    }

    for (let day of datas.datas) {
      // time
      const [minutes, seconds] = day.time.split(':');
      const [kilometre, metre] = day.distance.split('.');
      const time = this.convertToSeconds(minutes, seconds);
      const distance = kilometre * 1000 + metre * 10;
      const calorie = parseInt(day.calories);
      const distOnCal = Math.round(calorie / (time/60));

      this.metrics.push({
        date: day.date,
        level: day.level,
        time: time,
        distance: distance,
        calories: calorie,
        distOnCal: distOnCal
      });
    }
  }

  convertToSeconds(minutes, seconds) {
    return 60 + Number(minutes) * 60 + Number(seconds);
  }

  convertToTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  getDates() {
    if(!this.dates) {
      this.dates = [];
    } else {
      return this.dates;
    }

    for (let day of this.metrics) {
      this.dates.push(day.date);
    }

    return this.dates;
  }

  getTimes() {
    if(!this.times) {
      this.times = [];
    } else {
      return this.times;
    }

    for (let day of this.metrics) {
      this.times.push(day.time);
    }

    return this.times;
  }

  getDistances() {
    if(!this.distances) {
      this.distances = [];
    } else {
      return this.distances;
    }

    for (let day of this.metrics) {
      this.distances.push(day.distance);
    }

    return this.distances;
  }

  getCalories() {
    if(!this.calories) {
      this.calories = [];
    } else {
      return this.calories;
    }

    for (let day of this.metrics) {
      this.calories.push(day.calories);
    }

    return this.calories;
  }

  getDistOnCals() {
    if(!this.distOnCals) {
      this.distOnCals = [];
    } else {
      return this.distOnCals;
    }

    for (let day of this.metrics) {
      this.distOnCals.push(day.distOnCal);
    }

    return this.distOnCals;
  }
}
module.exports = {
  number: {
    minNumber: process.env.MIN_NUMBER || 1,
    maxNumber: process.env.MAX_NUMBER || 8,
  },
  weeks: {
    minWeeksNumber: process.env.MIN_WEEKS_NUMBER || 0,
    maxWeeksNumber: process.env.MAX_WEEKS_NUMBER || 20,
  },
}

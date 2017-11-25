function toUtc(dateString) {
  return new Date(dateString).toISOString().replace('T', ' ').substr(0, 19)
}

module.exports.toUtc = toUtc

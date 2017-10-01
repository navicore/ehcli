const EventHubClient = require('azure-event-hubs').Client

const printPartitionIds = hub => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  return client.open()
    .then(function () {
      return client.getPartitionIds()
    })
    .then(function (ids) {
      ids.forEach(function (id) { console.log(id) })
      return ids
    })
}

const writeToHub = (hub, message) => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  return client.open()
      .then(function () {
        return client.createSender()
      })
      .then(function (tx) {
        tx.on('errorReceived', function (err) { console.log(err) })
        return tx.send({ contents: message }, message)
      })
     .then(() => client.close())
}

const readFromHub = (hub, partitionId) => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  client.open()
    .then(function () {
      return client.createReceiver('$Default', partitionId, {})
    })
    .then(function (rx) {
      rx.on('errorReceived', function (err) { console.log(err) })
      rx.on('message', function (message) {
        const body = message.body
        console.log(`${JSON.stringify(body, 0, 2)}`)
      })
    })
}

module.exports = { writeToHub, readFromHub, printPartitionIds }

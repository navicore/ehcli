const EventHubClient = require('azure-event-hubs').Client

const printPartitionIds = hub => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  return client.open()
    .then(() => client.getPartitionIds())
    .then(ids => ids.forEach((id) => console.log(id)))
    .then(() => client.close())
}
const crypto = require('crypto')

// message should already be stringified
const writeToHub = (hub, message) => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  return client.open()
    .then(() => client.createSender())
    .then(tx => {
      tx.on('errorReceived', err => console.log(err))
      const h = crypto.createHash('md5').update(message).digest('hex')
      return tx.send(message, h)
    })
    .then(() => client.close())
}

const readFromHub = (hub, partitionId) => {
  const client = EventHubClient.fromConnectionString(process.env.CONNSTR || '', hub)
  client.open()
    .then(() => client.createReceiver('$Default', partitionId, {}))
    .then(rx => {
      rx.on('errorReceived', err => console.log(err))
      rx.on('message', message => {
        console.log(message.body.toString('utf8'))
      })
    })
}

module.exports = { writeToHub, readFromHub, printPartitionIds }

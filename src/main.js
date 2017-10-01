#!/usr/bin/env node

const program = require('commander')

const { readFromHub, writeToHub, printPartitionIds } = require('./eh')

program
  .version('0.0.1')
  .description('IMPORTANT: set env var CONNSTR= to a Service Bus Connection String. See Shared access policies.')

program
  .command('printIds <hub>')
  .alias('p')
  .description('print partition IDs')
  .action(hub => {
    printPartitionIds(hub)
      .catch(error => {
        console.info(`got error: ${error}`)
      })
  })

program
  .command('write <hub> <event>')
  .alias('w')
  .description('write an event')
  .action((hub, event) => {
    writeToHub(hub, {body: event})
      .catch(error => {
        console.info(`got error: ${error}`)
      })
  })

program
  .command('read <hub> <partitionId>')
  .alias('r')
  .description('read an event')
  .action((hub, partitionId) => {
    readFromHub(hub, partitionId)
  })

program.parse(process.argv)

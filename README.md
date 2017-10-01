# ehcli

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/48a5dc9e38b1432f8888c94db66dbf2f)](https://www.codacy.com/app/navicore/ehcli?utm_source=github.com&utm_medium=referral&utm_content=navicore/ehcli&utm_campaign=badger)

A node commander cli for Azure EventHubs reading and writing

## INSTALLATION

Something like:

```console
git clone https://github.com/navicore/ehcli.git && cd ehcli && yarn install && yarn link
```

## USAGE

```console
  Usage: ehcli [options] [command]

  IMPORTANT: set env var CONNSTR= to a Service Bus Connection String. See Shared access policies.


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    printIds|p <hub>            print partition IDs
    write|w <hub> <event>       write an event
    read|r <hub> <partitionId>  read an event
```

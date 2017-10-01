# ehcli

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

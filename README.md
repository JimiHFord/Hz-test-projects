# Hz-test-1
This is a bare-bones project demonstrating the ease that is websocket programming with node.js and socket.io.

One page acts as the wall warts equipped with microphones sending data to the hub via the ZigBee network.
![Hz devices plugged into the wall](./be-the-magic.png)

The other page acts as a device (whether tablet, smartphone, desktop) capable of receiving real-time "push notifications" about the magic events.

![Device that receives live Hz notifications](./see-the-magic.gif)

Installation
============

```git clone https://github.com/JimiHFord/Hz-test-1.git```

```cd Hz-test-1/```

```npm install```

(If you don't have node.js installed... shame on you. [get node](https://nodejs.org/))

run ./bin/www

Visit "localhost:3000" in browser. Also open 129.xxx.xxx.xxx:3000 (whoever is hosting the application) on a smartphone or laptop for additional satisfaction.

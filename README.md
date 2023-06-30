# OpenSCD Plugins
![Maintainance Status](https://img.shields.io/badge/maintainance_status-pending-orange)

A collection from feature enhancing plugins
A collection of feature enhancing plugins for better planning of substation with [OpenSCD ↗](https://github.com/openscd/open-scd)

## 📦 What this repo contains
This repository contains the source code for the:
- 🖥️ **[Community Explorer Plugin](./packages/uilib/src/lib/plugins/communication-explorer)**  
    For an overview of which IEDs communicate with each other
- 🖨️ **[PDF Exporter](./packages/uilib/src/lib/plugins/documentation)**  
    To export a printed version of the connections and configurations for offline usages
- 🧩 **[Type Switcher](./packages/uilib/src/lib/plugins/type-switcher)**  
    Allows you to resolve redundancies in data types, when planning a substation

for the [OpenSCD ↗](https://github.com/openscd/open-scd) project. This project was created in cooperation with [TransnetBW ↗](https://www.transnetbw.de/de)

## 🔎 Try out the newest version on our test distribution
You can find our test environment here:  
[https://openscd.sprinteins.com/ ↗](https://openscd.sprinteins.com/)


## 👨🏻‍💻 How to install the plugins

- **Communication Explorer**  
    latest: https://sprinteins.github.io/oscd-plugins/communication-explorer/index.js
- **PDF Exporter**  
    latest: https://sprinteins.github.io/oscd-plugins/network-explorer/index.js
- **Type Switcher**  
    latest: https://sprinteins.github.io/oscd-plugins/diffing-tool/index.js

### 📦 Install it on your distribution 
```js
export const officialPlugins = [{
    name: 'Communication Explorer',
    src: `https://sprinteins.github.io/oscd-plugins/communication-explorer/index.js`,
    icon: 'edit',
    default: true,
    kind: 'editor',
}]
```




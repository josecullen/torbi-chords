Tenés que tener instalado:
- Node y npm. (yo estoy con la versión 4.6.0)
- mongodb

Instalar transpiler typescript:
`npm install --global typescript`
comprobamos con `which tsc`

Levantar el proyecto:
```
npm install
tsc
npm start
```

Sobre Typescript:
Al proyecto le quité el live-resync, así que cuando quieran que tome algún nuevo cambio de un archivo .ts, ejecuten `tsc`
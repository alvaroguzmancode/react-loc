import feathers from '@feathersjs/client';
import io from 'socket.io-client';
// import reduxifyAuthentication from 'feathers-reduxify-authentication';
import reduxifyServices from 'feathers-redux';
import { combineReducers } from 'redux' ;

import reduxifyAuthentication from './FeathersReduxifyAuthentication';

const socket = io('http://localhost:3030/', { transports: ['socket'] });
const app = feathers();

app.configure(feathers.socketio(socket, { timeout: 20000 }));
app.configure(
  feathers.authentication({
    storage: window.localStorage,
    storageKey: 'loc-jwt',
  }),
);

const a_services = [
  'colonia',
  'consultorio',
  'estado',
  'horario',
  'municipio',
  'renta',
  'sucursal',
  'users',
];

export const services = reduxifyServices(app, a_services);

export default app;
export const feathersAuthentication = reduxifyAuthentication(app);

export const feathersServices = combineReducers({
  colonia: services.colonia.reducer,
  consultorio: services.consultorio.reducer,
  estado: services.estado.reducer,
  horario: services.horario.reducer,
  municipio: services.municipio.reducer,
  renta: services.renta.reducer,
  sucursal: services.sucursal.reducer,
  users: services.users.reducer,
});

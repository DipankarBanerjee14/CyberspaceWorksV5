// lib/databaseConnections.ts

import mongoose from "mongoose";

export const cyberProjectsDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/project_management?appName=dead"
  );
  export const cyberProjectDBBasic =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/project_management-basic?appName=dead"
  );

export const cyberLedgerDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/tallysoftware?appName=dead"
  );
  export const cyberLedgerDBBasic =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/tally-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  );

export const cyberClinicDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/clinic_management?retryWrites=true&w=majority"
  );
export const cyberClinicDBBasic =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/clinic_management-basic?retryWrites=true&w=majority"
  );
export const cyberPharmaDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/pharmacy_management_pro?appName=dead"
  );
  export const cyberPharmaDBBasic =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/pharmacy_management_basic?retryWrites=true&w=majority"
  );
  export const cyberPayrollDB =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/hr-management?retryWrites=true&w=majority&appName=HACKETHIC"
  );
   export const cyberPayrollDBBasic =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/hr-management-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  );
  export const cyberDineDB =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/resturant_management?retryWrites=true&w=majority&appName=HACKETHIC"
  );
  export const cyberDineDBBasic =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/restaurant_management-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  );
  export const cyberInvoiceDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/gstandbilling?appName=dead"
  );
  export const cyberInvoiceDBBasic =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/gstandbilling-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  );
  export const cyberRetailDB =
  mongoose.createConnection(
    "mongodb+srv://soumen:BBsfT5dbIoLCFqOz@dead.abjt7ko.mongodb.net/retail?appName=dead"
  );
  export const cyberRetailDBBasic =
  mongoose.createConnection(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/hr-management-basic?retryWrites=true&w=majority&appName=HACKETHIC"
  );
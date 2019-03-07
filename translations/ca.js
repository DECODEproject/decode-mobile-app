/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

export default {
  attributesLanding: {
    nodata: 'Comencem per afegir algunes dades.\nFes click en el botó per començar.',
    manage: 'Gestionar dades',
    petitions: 'Veure peticions',
    description: 'Aquestes són les teves dades personals emmagatzemades en l\'app DECODE',
  },
  attributesSummary: {
    genericName: 'Decidim',
    title: 'requereix verificar la teva residència a Barcelona ',
    subtitle: 'Ho pots verificar amb l\'Ajuntament de Barcelona. La residència es verifica anònimament. Només cal fer-ho una vegada.',
    requirement: 'Requireix el següent:',
    more: 'Mostrar més',
    less: 'Mostrar menys',
    button: 'Verificar',
    cancel: 'O cancel·lar la teva participació en aquesta proposta',
    requiredAttributes: 'Dades requerides per signar la proposta',
  },
  deleteButton: {
    title: 'Esborrar totes les dades',
    description: 'Totes les teves dades i el teu PIN seran esborrats de l\'app',
    cancel: 'Cancel·lar',
    accept: 'Acceptar',
  },
  home: {
    badPin: 'Codi PIN incorrecte',
    button: 'Accedir',
    errorTitle: 'No s\'ha pogut aconseguir la informació de la proposta de Decidim',
    errorText: 'Pots tornar a la pàgina de Decidim per veure altres propostes actives.',
  },
  login: {
    emptyMessage: 'No tens dades que es puguin fer servir per accedir-hi.',
    header: 'BCNNow necessita un credencial per accedir',
    subHeader: 'Pots accedir compartint:',
    button: 'Accedir',
    failbutton: 'Test error',
    failedMessage: 'La vostre petició no s\'ha pogut processar.\nSi us plau, reintente-ho en uns instants.',
    successMessage: 'Connectat correctament.',
  },
  manageAttributes: {
    description: 'Pots gestionar les següents dades. Les dades romandran en el teu mòbil.',
    ageAttribute: 'Data de Naixement',
    districtAttribute: 'Districte',
    districtPlaceholder: 'Selecciona un districte',
    genderAttribute: 'Gènere',
    genderPlaceholder: 'Selecciona un gènere',
    add: 'Afegir',
    edit: 'Editar',
    save: 'Desar',
    errorDelete: 'Error en esborrar les dades',
  },
  newDateOfBirthAttribute: {
    datepickerPlaceholder: 'Selecciona una data',
    confirm: 'Confirmar',
    cancel: 'Cancel·lar',
    errorEmptyDateOfBirth: 'Has de seleccionar una data',
    errorSaveDateOfBirth: 'No s\'ha pogut desar la data',
    save: 'Desar',
  },
  petitionSummary: {
    yes: 'Signar - Sí',
    no: 'Signar - No',
    cancel: 'O cancel·lar la teva participació en aquesta proposta',
    optional: 'Dades opcionals per compartir',
    sharing: 'Estaràs compartint les teves dades amb',
    age: 'Edat',
    loading: 'Això podria trigar uns moments',
    requiredAttributes: 'Dades requerides per signar la proposta',
    requiredAttributeError: 'Has de compartir que ets resident de Barcelona o no podràs signar aquesta proposta. Aquesta informació és anònima.',
    manageData: 'Gestionar les teves dades',
  },
  pinSetup: {
    placeholderPin1: ' Almenys 4 dígits',
    placeholderPin2: 'Confirma el PIN',
    errorPin1: 'El PIN ha de tenir almenys 4 dígits',
    errorPin2: 'El PIN ha de coincidir',
    labelPin1: 'Introdueix PIN:',
    labelPin2: 'Confirma PIN:',
    button: 'Desar',
    title: 'Protegeix les teves dades',
    subtitle: 'Introdueix un PIN, així ningú podrà accedir a les teves dades',
    pinWarning: 'Recorda el teu PIN, no es pot recuperar si es perd!',
  },
  signOutcome: {
    backDecidim: 'Tornar a la petició',
    voteRecorded: 'El teu vot ha estat registrat anònimament',
    maybeInterested: 'Veure les dades de Decidim a Barcelona Now',
    errorText: 'Pots tornar enrere o veure més propostes',
    defaultError: 'Hi ha hagut un error',
    goBcnNow: 'Anar a BarcelonaNow',
    goOther: 'Veure altres peticions',
  },
  walkthrough: {
    done: 'Fet',
    skip: 'Saltar',
    next: 'Següent',
    pages: {
      one: {
        title: 'DECODE',
        subtitle: 'és el teu gestor de dades personals',
      },
      two: {
        subtitle: 'Les teves dades tenen un valor. És important que les controlis',
      },
      three: {
        subtitle: 'Amb DECODE, tu decideixes quines dades vols compartir i com seran utilitzades',
      },
      four: {
        subtitle: 'Guarda les teves dades amb alta seguretat',
      },
    },
  },
  schema: {
    addressLocality: 'Residència',
    dateOfBirth: 'Data de Naixement',
    gender: 'Gènere',
    district: 'Districte',
  },
  genders: {
    female: 'Femella',
    male: 'Mascle',
    other: 'Un altre',
  },
  attributesVerification: {
    verify: 'Verificar',
    verifyHash: 'Verificar (hash test)',
  },
  petitionList: {
    description: 'Pots signar amb l\'app de DECODE les següents peticions:',
    go: 'Vés',
  }
};

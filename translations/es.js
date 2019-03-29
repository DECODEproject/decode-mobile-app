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
    nodata: 'Empecemos por añadir algunos datos.\nHaz click en el botón inferior para empezar',
    manage: 'Gestionar datos',
    petitions: 'Ver peticiones',
    description: 'Estos son tus datos personales almacenados en la app DECODE.',
  },
  attributesSummary: {
    genericName: 'Decidim',
    title: 'requiere verificar tu residencia en Barcelona.',
    subtitle: 'La puedes verificar con el Ayuntamiento de Barcelona. Tu residencia se verifica anónimamente. Sólo hace falta hacerlo una vez.',
    requirement: 'Requiere lo siguiente:',
    more: 'Mostrar más',
    less: 'Mostrar menos',
    button: 'Verificar',
    cancel: 'O cancela la participación en esta propuesta',
    requiredAttributes: 'Datos requeridos para firmar la propuesta',
  },
  deleteButton: {
    title: 'Borrar todos los datos',
    description: 'Todos tus datos y el PIN serán borrados de la app',
    cancel: 'Cancelar',
    accept: 'Aceptar',
  },
  home: {
    badPin: 'Código PIN incorrecto',
    button: 'Acceder',
    errorTitle: 'No se ha podido conseguir la información de la propuesta de Decidim',
    errorText: 'Puedes volver a la página de Decidim para ver otras propuestas activas.',
  },
  login: {
    emptyMessage: 'No tienes datos que se puedan usar para acceder.',
    header: 'BCNNow necesita un credencial para acceder',
    subHeader: 'Puedes acceder compartiendo:',
    button: 'Acceder',
    failbutton: 'Test timeout',
    failedMessage: 'Tu petición no se ha podido procesar\n',
    successMessage: 'Conectado correctamente',
    timeout: 'Tiempo de espera excedido. Por favor reintenta',
    refreshMessage: 'Vuelve a tu navegador y refresca la página si es necesario',
  },
  manageAttributes: {
    description: 'Puedes gestionar los siguientes datos. Los datos permanecerán en tu móvil.',
    ageAttribute: 'Fecha de Nacimiento',
    districtAttribute: 'Distrito',
    districtPlaceholder: 'Selecciona un distrito',
    genderAttribute: 'Género',
    genderPlaceholder: 'Selecciona un género',
    add: 'Agregar',
    edit: 'Editar',
    save: 'Guardar',
    errorDelete: 'Error al borrar los datos',
  },
  newDateOfBirthAttribute: {
    datepickerPlaceholder: 'Selecciona una fecha',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    errorEmptyDateOfBirth: 'Debes seleccionar una fecha',
    errorSaveDateOfBirth: 'No se ha podido guardar la fecha',
    save: 'Guardar',
  },
  petitionSummary: {
    yes: 'Firmar - Sí',
    no: 'Firmar - No',
    cancel: 'O cancela la participación en esta propuesta',
    optional: 'Datos opcionales para compartir: ',
    sharing: 'Estarás compartiendo tus datos con',
    age: 'Edad',
    loading: 'Esto podría tardar unos momentos',
    requiredAttributes: 'Datos requeridos para firmar la propuesta',
    requiredAttributeError: 'Debes compartir este dato o no podrás firmar esta propuesta. Esta información es anónima.',
    manageData: 'Gestionar tus datos',
  },
  pinSetup: {
    placeholderPin1: 'Por lo menos 4 dígitos',
    placeholderPin2: 'Confirma el PIN',
    errorPin1: 'El PIN debe ser por lo menos de 4 dígitos',
    errorPin2: 'El PIN debe coincidir',
    labelPin1: 'Introducir PIN:',
    labelPin2: 'Confirmar PIN:',
    button: 'Guardar',
    title: 'Protege tus datos',
    subtitle: 'Introduce un PIN, para que nadie más pueda acceder a tus datos',
    pinWarning: 'Recuerda tu PIN, ¡No se puede recuperar si lo pierdes!',
  },
  signOutcome: {
    backDecidim: 'Volver a la petición',
    voteRecorded: 'Tu soporte ha sido registrado anónimamente',
    maybeInterested: 'Ver los datos de Decidim en Barcelona Now',
    errorText: 'Puedes volver atrás o ver más propuestas',
    defaultError: 'Ha habido un error',
    goBcnNow: 'Ir a BarcelonaNow',
    goOther: 'Ver otras peticiones',
  },
  error: {
    defaultError: 'Ha habido un error',
    goOther: 'Ver otras peticiones',
    alreadyIssued: 'Credencial ya entregada para estos datos.\nLas credenciales únicas sólo se pueden entregar una vez',
    notValid: 'Los datos entrados no son válidos para obtener esta credencial',
    missingValue: 'Faltan datos, volver a intentar',
    issuedBy: 'Para ayuda contactar con',
  },
  walkthrough: {
    done: 'Hecho',
    skip: 'Saltar',
    next: 'Siguiente',
    pages: {
      one: {
        title: 'DECODE',
        subtitle: 'tu gestor de datos personales',
      },
      two: {
        subtitle: 'Tus datos tienen un valor. Es importante que los controles',
      },
      three: {
        subtitle: 'Con DECODE, tú decides qué datos quieres compartir y cómo son utilizados',
      },
      four: {
        subtitle: 'Guarda tus datos personales con alta seguridad',
      },
    },
  },
  schema: {
    addressLocality: 'Residencia',
    dateOfBirth: 'Fecha de Nacimiento',
    gender: 'Género',
    district: 'Distrito',
  },
  genders: {
    female: 'Femenino',
    male: 'Masculino',
    other: 'Otro',
  },
  attributesVerification: {
    verify: 'Verificar',
    manageData: 'Gestionar tus datos',
    emptyData: 'No tienes ningún dato para compartir',
    intro1: 'Se solicitará una credencial en un',
    intro2: 'servicio externo',
    intro3: 'Para ello, necesitas proporcionar la información siguiente:',
    optionalIntro1: 'Para los objetivos de este piloto, puedes compartir los siguientes datos, que serán agregados anónimamente y',
    optionalIntro2: 'disponibles públicamente',
  },
  petitionList: {
    description: 'Puedes firmar con la app de DECODE las siguientes peticiones:',
    go: 'Ir',
    title: 'Reclamamos datos abiertos en toda la administración pública',
  }
};

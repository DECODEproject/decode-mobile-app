

export default function setCredential(getItem, setItem, attribute) {
  return async () => {
    getItem('credentials').then(async (credentials) => {
      const currentCredentials = (credentials === null) ? [] : credentials;
      const allCredentials = [...currentCredentials, attribute];
      await setItem('credentials', JSON.stringify(allCredentials));
    }).catch((e) => {
      console.log('error retrieving credential', e);
    });
  };
}




export default function setCredential(getItem, setItem, attribute) {
  return async () => {
    getItem('credentials').then(async (currentCredentials) => {
      const allCredentials = [...currentCredentials, attribute];
      await setItem('credentials', JSON.stringify(allCredentials));
    }).catch(() => {
      console.log('error retrieving credential');
    });
  };
}


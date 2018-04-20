
export function setPetition(petition) {
  return {
    type: 'SET_PETITION',
    petition,
  };
}

export function setPetitionError(error) {
  return {
    type: 'SET_PETITION_ERROR',
    error,
  };
}

export function getPetition(petitionLink) {
  return (dispatch) => {
    fetch(petitionLink).then(async (response) => {
      if (!response.ok) {
        dispatch(setPetitionError(response.statusText));
      } else {
        const json = await response.json();
        dispatch(setPetition(json));
      }
    });
  };
}

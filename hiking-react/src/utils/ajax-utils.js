

export const convert_to_json = (data) => {
  let json = '';
  try {
    json = JSON.stringify(data);
  } catch (err) {
    // nije usepla konverzija u json ali nece se srusiti aplikacija nego cemo samo dobiti ispisan oda se greska desila
    console.log(err);
  }
  return json;
};
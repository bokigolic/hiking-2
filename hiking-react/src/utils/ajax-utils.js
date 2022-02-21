

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


/*
export const json_to_js = (json) => {
  let obj = '';
  try {
    obj = JSON.parse(json);
  } catch (err) {
    // nije usepla konverzija u json ali nece se srusiti aplikacija nego cemo samo dobiti ispisan oda se greska desila
    console.log(err);
  }
  return obj;
};
*/
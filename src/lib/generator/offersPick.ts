export type offerItem = {
  step: number[];
};

  function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export function offersPick<T extends offerItem>(items: T[], offerMod: number = 0): T {
  if (!items.length) {
    throw new Error("Cannot pick from an empty list.");
  }

  let offerRoll = randomIntFromInterval(2, 12) + offerMod;
  if(offerRoll < 0)
  {
    offerRoll = 0;
  }
  else if(offerRoll > 13)
  {
    offerRoll = 13;
  }
  else
  {

  }

  for (const item of items) {

    if (item.step.includes(offerRoll)) {
      return item;
    }
  }

  return items[items.length - 1];
}
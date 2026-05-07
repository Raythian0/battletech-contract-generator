import { generateContractTerms } from "$lib/generator/generateContractTerms";
import { hiringHallPick } from "$lib/generator/hiringHallPick";
import { offersPick } from "$lib/generator/offersPick";
import hiringHallData from "$lib/data/hiringHall.json"

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateContracts(
  scale: number = 1, 
  companyName: string = "Unknown Company",
  employerType: string = "Minor Power",
  maxContracts: number = 6,
  hiringHall: string = "standard_Hall") {

  const contractCount = randomInt(0, maxContracts);

  const hall = hiringHallPick(hiringHallData.hiringHall, hiringHall)
  const offers = offersPick(hiringHallData.offersTable, hall.Offers)

  return Array.from({ length: offers.offers }, (_, index) => {
    const terms = generateContractTerms();

    return {
      id: crypto.randomUUID(),
      title: `Contract ${index + 1}`,
      company: companyName.trim(),
      employer: employerType.trim(),
      scale,
      terms: {
        ...terms,
        basePay: {
          ...terms.basePay,
          scaledValue: terms.basePay.value * scale
        },
        transportationRights: {
          ...terms.transportationRights,
          scaledValue: terms.transportationRights.value
            ? terms.transportationRights.value
            : 0
        }
      }
    };
  });
}
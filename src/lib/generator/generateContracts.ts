import { generateContractTerms } from "$lib/generator/generateContractTerms";
import { hiringHallPick } from "$lib/generator/hiringHallPick";
import { offersPick } from "$lib/generator/offersPick";
import { employerPick } from "$lib/generator/employerPick";
import { getMissionTypePick } from "$lib/generator/getMissionTypePick";
import { generateTracks } from "$lib/generator/generateTracks";
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

  console.log("***************")
  console.log("STARTING GENERATING CONTRACTS")

  const contractCount = randomInt(0, maxContracts);

  const hall = hiringHallPick(hiringHallData.hiringHall, hiringHall)
  const offers = offersPick(hiringHallData.offersTable, hall.Offers)
  let employerId = "";

  return Array.from({ length: offers.offers }, (_, index) => {
    console.log('Generating Contract: '+index)
    const employer = employerPick(hiringHallData.employers, hall.employers) 
      if(employer.id == "independent")
      {
        const independentEmployer = employerPick(hiringHallData.independentEmployers, hall.employers)
        employerType = independentEmployer.label;
        employerId = independentEmployer.id;
      }
      else
      {
        employerType = employer.label;
        employerId = employer.id;
      }
    const missionType = getMissionTypePick(hall.missions, employerId)
    const terms = generateContractTerms(missionType[0]);

    return {
      id: crypto.randomUUID(),
      title: `Contract ${index + 1}`,
      company: companyName.trim(),
      employer: employerType.trim(),
      missionType: missionType[0],
      specialMissionType: missionType[1],
      scale,
      terms: {
        ...terms,
        basePay: {
          ...terms.basePay,
          scaledValue: terms.basePay.value * scale
        },
        transportationRights: {
          ...terms.transportationRights,
          scaledValue: terms.transportationRights.value * scale
            ? terms.transportationRights.value
            : 0
        }
      },
      tracks: generateTracks(missionType[0])
    };
    
  });
    console.log("ENDING GENERATING CONTRACTS")
    console.log("***************")
}
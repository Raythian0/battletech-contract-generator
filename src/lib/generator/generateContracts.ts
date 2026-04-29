import { generateContractTerms } from "$lib/generator/generateContractTerms";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateContracts(
  scale: number = 1, 
  companyName: string = "Unknown Company",
  maxContracts: number = 6) {
  const contractCount = randomInt(0, maxContracts);

  return Array.from({ length: contractCount }, (_, index) => {
    const terms = generateContractTerms();

    return {
      id: crypto.randomUUID(),
      title: `Contract ${index + 1}`,
      company: companyName.trim(),
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
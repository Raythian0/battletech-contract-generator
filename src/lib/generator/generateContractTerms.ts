import contractTerms from "$lib/data/contractTerms.json";
import { weightedPick } from "$lib/generator/weightedPick";

export function generateContractTerms() {
  return {
    basePay: weightedPick(contractTerms.basePay),
    commandRights: weightedPick(contractTerms.commandRights),
    salvageRights: weightedPick(contractTerms.salvageRights),
    supportRights: weightedPick(contractTerms.supportRights),
    transportationRights: weightedPick(contractTerms.transportationRights)
  };
}
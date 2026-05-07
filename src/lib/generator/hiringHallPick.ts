export type hallItem = {
  id: string;
};

export function hiringHallPick<T extends hallItem>(items: T[], hiringHall: string = "standard_Hall"): T {
  if (!items.length) {
    throw new Error("Cannot pick from an empty list.");
  }

  for (const item of items) {

    if (item.id == hiringHall) {
      return item;
    }
  }

  return items[items.length - 1];
}
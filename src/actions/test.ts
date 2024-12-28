"use server";

export const testFilter = async (param: string) => {
  console.log(`${param} filter`);
  return `${param} filter`;
};

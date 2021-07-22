import { CountryObject } from "@/types/country";

const newObjInInitialArr = function (initialArr: CountryObject[], newObject: CountryObject): CountryObject[] {
  const id = newObject.id;
  const newArr: CountryObject[] = [];
  for (let i = 0; i < initialArr.length; i++) {
    if (id === initialArr[i].id) {
      newArr.push(newObject);
    } else {
      newArr.push(initialArr[i]);
    }
  }
  return newArr;
};

const updateObjectsInArr = function (initialArr: CountryObject[], newArr: CountryObject[]): CountryObject[] {
  let finalUpdatedArr = initialArr;
  for (let i = 0; i < newArr.length; i++) {
    finalUpdatedArr = newObjInInitialArr(finalUpdatedArr, newArr[i]);
  }
  return finalUpdatedArr as CountryObject[];
};

export default { newObjInInitialArr, updateObjectsInArr }
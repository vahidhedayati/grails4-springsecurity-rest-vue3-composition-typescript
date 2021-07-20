
export type objectList = {
  id: string | number,
  name: string
}

const newObjInInitialArr = function (initialArr: objectList[], newObject: objectList): objectList[] {
  let id = newObject.id;
  let newArr: objectList[] = [];
  for (let i = 0; i < initialArr.length; i++) {
    if (id === initialArr[i].id) {
      newArr.push(newObject);
    } else {
      newArr.push(initialArr[i]);
    }
  }
  return newArr;
};

const updateObjectsInArr = function (initialArr: objectList[], newArr: objectList[]) {
  let finalUpdatedArr = initialArr;
  for (let i = 0; i < newArr.length; i++) {
    finalUpdatedArr = newObjInInitialArr(finalUpdatedArr, newArr[i]);
  }
  return finalUpdatedArr;
};

export default { newObjInInitialArr, updateObjectsInArr }
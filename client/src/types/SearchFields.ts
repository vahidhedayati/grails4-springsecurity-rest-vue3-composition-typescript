import SearchTypes  from "@/types/search";

export default class SearchFields implements SearchTypes {

    name: string;

    constructor(name:string) {
        this.name=name;
    }

}
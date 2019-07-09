export interface RootList {
     code: number;
     name: string;
     sub_catergories: SubCategories[];
}

export interface SubCategories {
     code: number;
     name: string;
     parentCode: number;
     products: Products[]
}

export interface Products {
     code: number;
     name: string;
     price: number;
     parentCode: number;
     check?: boolean;
}
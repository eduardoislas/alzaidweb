export class RootCatalog {
    success: boolean;
    catalogs: CatalogModel[];
    cuantos: number;
  }
  
  export class CatalogModel {
    _id: string;
    name: string;
    type: string;
  }


  export class Catalog {
    success: boolean;
    catalog: CatalogModel;
  }

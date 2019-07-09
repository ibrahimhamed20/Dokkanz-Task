export const RootList = [
     {code: 1, name: 'Category #1', sub_catergories: []},
     {code: 2, name: 'Category #2', sub_catergories: []},
     {code: 3, name: 'Category #3', sub_catergories: []}
]

export const SubCategories = [
     {code: 1, name: 'SubCategory #1', parentCode: 1, products: []},
     {code: 2, name: 'SubCategory #2', parentCode: 1, products: []},
     {code: 3, name: 'SubCategory #3', parentCode: 2, products: []},
]

export const Products = [
     {code: 1, name: 'Product #1', price: 199.00, parentCode: 1},
     {code: 2, name: 'Product #2', price: 183.00, parentCode: 2},
     {code: 3, name: 'Product #3', price: 156.00, parentCode: 3},
     {code: 4, name: 'Product #4', price: 134.00, parentCode: 1},
     {code: 5, name: 'Product #5', price: 175.00, parentCode: 2},
     {code: 6, name: 'Product #6', price: 132.00, parentCode: 3},
     {code: 7, name: 'Product #7', price: 153.00, parentCode: 1},
     {code: 8, name: 'Product #8', price: 134.00, parentCode: 2},
     {code: 9, name: 'Product #9', price: 121.00, parentCode: 3}
]
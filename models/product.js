const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Products {
  //Next JS
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  
};

// THE CODE BELOW IS BEFORE REFACTORING THIS MODEL FILE

// const fs = require("fs");
// const path = require("path");

// module.exports = class Products {
//   //Next JS
//   constructor(t) {
//     this.title = t;
//   }

//   save() {
//     const p = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       "products.json"
//     );
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     //can be called on the class itself and not on the instantial
//     const p = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       "products.json"
//     );
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       }
//       cb(JSON.parse(fileContent));
//     });
//   }
// };

// module.exports = function Products() {
// ES5 constructor function
// }

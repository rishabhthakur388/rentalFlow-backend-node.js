const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dbconnect = require('./config/config');
const morgan = require('morgan');
dbconnect();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/data', require('./routes/userdatasRoutes'));
app.use('/data', require('./routes/addCategoriesRoutes'));
app.use('/', require('./routes/stripeRoute'));

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`Port is listning on ${port}`);
});


// const a = [1,24,5,6,4]

// const a = 10
//  for(let i=1; i<=a;i++){
//     const r = i*a
//     console.log(r);
// }

// const b = [10];
// const result = b.reduce(num => num * b);
// console.log(result);

// const a = 10;
// const numbers = Array.from({length: a}, (_, index) => index + 1);
// const result = numbers.map(num => num * a);
// console.log(result);


// const oldArray = [1,23,4,5,6,7]

// const newArr = oldArray.map(doc=>{ return doc-1})
// console.log(newArr);

// const oldArray = [1, 23, 4, 5, 6, 7];

// const newArr = oldArray.map(doc => doc * 2); // Added the return statement
// console.log(newArr);


// const red = [1,2,3,4,5]
// const sum = red.reduce((acc,currentValue)=>{return acc+currentValue})
// console.log(sum);

// let arr = [ [1, 2, 3],
//             [4, 5, 6],
//             [7, 8, 9], ];

// function diagonalDifference(arr) {
//     let leftSum = 0;
//     let rightSum = 0;

//     for (let i = 0; i < arr.length; i++) {
//          let b =leftSum += arr[i][i]
//         let c = rightSum += arr[arr.length - 1 - i][i]
//         // console.log( b, 'left')
//         // console.log( c, "right")
//     }

//     return Math.abs(leftSum - rightSum)
// }+

// console.log(diagonalDifference(arr));

// const n = 6;
// for (let i = 1; i <= n; i++) {
//   let line = '';
//   for (let j = 0; j < i; j++) {
//     line += '*';
//   }
//   console.log(line);
// }


// let m = 5;
// for (let i = m; i >= 1; i--) {
// 	let str = "* ";
// 	let space = ' ';
// 	console.log(space.repeat(m-i)+str.repeat(i));
// }


// const arr = ['A', 'N', 'U'];
// arr[10] = 10;
// console.log(arr.length);

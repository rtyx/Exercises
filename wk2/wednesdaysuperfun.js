var num;
var doublenum;

num = 5;

function timesTwo(number) {
  return number*2;
};

doublenum = timesTwo(num);

var numbers;

numbers = [num, doublenum];

for (i = 0; i < numbers.length; i++) {
  timesTwo(numbers[i]);
};

numbers = {};

numbers.num = doublenum




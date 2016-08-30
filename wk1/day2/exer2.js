var a = {
  Berlin: 'Germany',
  Paris: 'France',
  'New York': 'USA'
};

var b = Object.create(null)

for (var capital in a) {
    console.log("The capital of " + a[capital] + " is " + capital)
    b[a[capital]] = capital
    }

for (var country in b) {
    console.log(country + " is where " + b[country] + " is")
}

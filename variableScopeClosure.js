//SCOPE
{
  let say = 'Hello';
  console.log(say);
}

{
  let say = 'Goodby';
  console.log(say);
}

if (true) {
  let i = 5;
  console.log(i); //5
}
// console.log(i); //error, out of schope

for (let i = 0; i < 5; i++) {
  console.log(i);
}
// console.log(i); //error, even visually i is outside the scope {}, but its considered as part of {} scope

  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  //let firstUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366'
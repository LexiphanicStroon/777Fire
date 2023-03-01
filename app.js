const apiKey = 'YOUR_API_KEY';
const provinceDropdown = document.getElementById('province');
const cityDropdown = document.getElementById('city');

// Get a list of Canadian provinces from Google Places API
fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=province+canada&types=(regions)&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const provinces = data.predictions.map(prediction => prediction.structured_formatting.main_text);

    provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province;
      option.textContent = province;
      provinceDropdown.appendChild(option);
    });
  })
  .catch(error => console.error(error));

// Populate the city dropdown when a province is selected
provinceDropdown.addEventListener('change', event => {
  const province = event.target.value;
  cityDropdown.innerHTML = '';

  // Get a list of cities in the selected province from Google Places API
  fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${province}+canada&types=(cities)&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const cities = data.predictions.map(prediction => prediction.structured_formatting.main_text);

      cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
      });
    })
    .catch(error => console.error(error));
});

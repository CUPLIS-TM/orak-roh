document.addEventListener("DOMContentLoaded", function() {
  var getLocationBtn = document.getElementById("getLocationBtn");
  getLocationBtn.addEventListener("click", getLocation);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLocation, handleError);
    } else {
      console.log("Geolocation tidak didukung oleh browser ini.");
    }
  }

  function sendLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var locationData = {
      latitude: latitude,
      longitude: longitude
    };

    fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Laporan lokasi terkirim:', data);
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
  }

  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Pengguna menolak permintaan Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Informasi lokasi tidak tersedia.");
        break;
      case error.TIMEOUT:
        console.log("Permintaan untuk mendapatkan lokasi pengguna telah melebihi batas waktu.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Terjadi kesalahan yang tidak diketahui.");
        break;
    }
  }
});

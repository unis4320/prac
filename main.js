// Google Maps를 초기화하는 함수
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.589436, lng: 127.145325 }, // 초기 중심 위치
        zoom: 14, // 초기 줌 레벨
    });

    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();

    // MongoDB에서 데이터 가져오기
    fetch('mongodb-data.json') // JSON 파일의 경로
        .then(response => response.json())
        .then(data => {
            data.forEach(({ lat, lon }) => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(lat), lng: parseFloat(lon) },
                    map: map
                });
                bounds.extend(marker.position);

                marker.addListener("click", () => {
                    map.panTo(marker.position);
                    infoWindow.setContent(`위도: ${lat}, 경도: ${lon}`);
                    infoWindow.open({
                        anchor: marker,
                        map
                    });
                });
            });

            // 모든 마커가 표시될 수 있도록 지도 확대/축소 설정
            map.fitBounds(bounds);
        })
        .catch(error => console.error('JSON 파일을 로드하고 마커를 추가하는 중 오류 발생:', error));
}

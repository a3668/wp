async function getWeather(location) {
    const apiKey = 'adb2e93b40084fa5aa3140632241506';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error('查詢失敗');
        }
        
        const data = await response.json();
        
        if (!data.location || data.location.name.toLowerCase() !== location.toLowerCase()) {
            throw new Error('未找到匹配的地點');
        }

        // 24小時制
        const localtime = new Date(data.location.localtime.replace(' ', 'T'));

        return {
            location: data.location.name,
            condition: data.current.condition.text,
            temperature: data.current.temp_c,
            localtime: localtime.toLocaleString('zh-Hant', { hour12: false, timeStyle: 'short', dateStyle: 'short' })
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('查詢超時，請稍後再試');
        }
        throw new Error('查詢過程中發生錯誤，請稍後再試');
    }
}

async function showWeather() {
    let locationNode = document.querySelector('#location');
    let weatherNode = document.querySelector('#weather');
    weatherNode.innerText = '獲取天氣中，請稍等...';
    
    try {
        let weather = await getWeather(locationNode.value);
        weatherNode.innerText = `地點：${weather.location}，天氣狀況：${weather.condition}，溫度：${weather.temperature}°C，當地時間：${weather.localtime}`;
    } catch (error) {
        weatherNode.innerText = error.message;
    }
}
fetch(
    'https://api.brightsky.dev/radar'
).then((resp) => resp.json()
).then((respData) => {
    const raw = respData.radar[0].precipitation_5;
    const compressed = Uint8Array.from(atob(raw), c => c.charCodeAt(0));
    const rawBytes = pako.inflate(compressed).buffer;
    const precipitation = new Uint16Array(rawBytes);
});

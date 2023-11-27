const homeUrl = "https://l.muz.kr";

const create = async () => {
    const nowUrl = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    }).then((tabs) => tabs[0].url);

    if (!nowUrl.startsWith('http://') && !nowUrl.startsWith('https://')) {
        alert('http:// 또는 https://로 시작하는 주소만 가능합니다.');
        return;
    }

    const result = await fetch(homeUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: nowUrl,
        }),
    }).then((res) => res.json());

    if (result.error) {
        alert(result.error);
        return;
    }

    document.getElementById('url').innerText = `${homeUrl}/${result.url}`;
};

document.getElementById('create_btn').addEventListener('click', create);

document.getElementById('copy_btn').addEventListener('click', () => {
    const url = document.getElementById('url').innerText;
    copyClipBoard(url);
});

export const copyClipBoard = async (text) => {
    try {  
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        } else {
            let t = document.createElement("textarea");
            document.body.appendChild(t);
            t.value = text;
            t.select();
            document.execCommand("Copy");
            document.body.removeChild(t);
        }
        return true
    } catch (error) {
        return false 
    }
}
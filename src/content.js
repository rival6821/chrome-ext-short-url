const template = document.getElementById('li_template');

const create = async () => {
    // 현재 열린 탭의 url을 가져온다.
    const nowUrl = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    }).then((tabs) => tabs[0].url);
    const result = await fetch("https://url.ilhoon.kr", {
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
    document.getElementById('url').innerText = `https://url.ilhoon.kr/${result.url}`;
};

document.getElementById('create_btn').addEventListener('click', create);
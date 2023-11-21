const template = document.getElementById('li_template');

const create = async () => {
    const result = await fetch("https://url.ilhoon.kr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: window.location.href,
        }),
    });

    const template = document.getElementById('li_template');
    const element = template.content.firstElementChild.cloneNode(true);
    element.querySelector('.url').textContent = result.text();
    element.querySelector('.paste_button').addEventListener('click', () => {
        navigator.clipboard.writeText(result.text());
    });
};
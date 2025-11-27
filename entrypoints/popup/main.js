const homeUrl = "https://l.muz.kr";
const urlElement = document.getElementById('url');

// Localization function
const localizeHtml = () => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const message = chrome.i18n.getMessage(key);
        if (message) {
            element.innerText = message;
        }
    });
};

// Run localization
localizeHtml();

let isMakeUrl = false;

const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

const createAndCopy = async () => {
    let finalUrl = "";

    if (isMakeUrl) {
        finalUrl = urlElement.innerText;
    } else {
        const nowUrl = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        }).then((tabs) => tabs[0].url);
    
        if (!nowUrl.startsWith('http://') && !nowUrl.startsWith('https://')) {
            showToast(chrome.i18n.getMessage('errorInvalidUrl'));
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
            showToast(result.error);
            return;
        }
        
        isMakeUrl = true;
        finalUrl = `${homeUrl}/${result.url}`;
    
        urlElement.style.display = 'block';
        urlElement.innerText = finalUrl;
    }

    await copyClipBoard(finalUrl);
    showToast(chrome.i18n.getMessage('toastUrlCopied'));
};

document.getElementById('action_btn').addEventListener('click', createAndCopy);

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

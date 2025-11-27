const homeUrl = "https://l.muz.kr";
const urlElement = document.getElementById('url');

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
            showToast('Only URLs starting with http:// or https:// are supported.');
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
    showToast('URL copied to clipboard.');
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
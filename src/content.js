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
};

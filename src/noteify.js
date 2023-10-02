export const noteify = (str) => {
    const ref = document.querySelector("#noteify");

    ref.innerHTML = `
   ${str}
    `;
    ref.classList.add("noteify-active");
    window.setTimeout(()=>{ ref.classList.remove("noteify-active");}, 2000);
};

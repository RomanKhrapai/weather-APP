export const widgetErorr = (message) => {
    document.querySelector(".tab-contents").innerHTML = `
    <div class="widget">
        <div class="widget-loader">
            <span class="error-message"> ${message}</span>
        </div>
    </div>`;
};

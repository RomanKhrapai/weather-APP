export const renderWidgetErorr = (message) => {
    document.querySelector(".tab-contents").innerHTML = `
    <div class="widget-now">
        <div class="widget-loader">
            <span class="error-message"> ${message}</span>
        </div>
    </div>`;
};

export const renderLoader = (ref) => {
    ref.innerHTML = `
    <div class="widget">
        <div class="widget-loader">
            <img class="widget-loader__image" src="../images/loader.gif" alt="loader" width="100" />
        </div>
    </div>`;
};

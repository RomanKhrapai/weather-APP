export const renderListStore = (names) => {
    if (names.length === 0)
        return ` <li class="store-list-item">
  Історія пуста
    </li>`;
    return names
        .map(
            (name) =>
                ` 
            <li class="store-list-item" data-name="${name}">
            <span class="store-item-text">${name} </span>
                    <button class="store-bin-btn" data-store-remove="${name}">
                        <svg class="icon icon-bin2" height="30" width='30' ><use xlink:href="#icon-bin2"></use>
                            <symbol id="icon-bin2" viewBox="0 0 32 32">
                            <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"></path>
                            </symbol>
                        </svg>
                     </button>
            </li>`
        )
        .join("");
};

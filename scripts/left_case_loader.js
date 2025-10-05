let leftImagesAttached = false;

function ensureLeftImages() {
    if (leftImagesAttached) return;

    const { map, idList } = getGroupsSnapshot();
    if (!map || !idList || idList.length === 0) return;

    addLeftImages();
    leftImagesAttached = true;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureLeftImages();
} else {
    window.addEventListener("load", ensureLeftImages, { once: true });
}

UIStore.subscribe("groups", () => {
    ensureLeftImages();
});

function addLeftImages() {
    forEachGroup((GROUP) => {
        if (!GROUP.imgCase || !GROUP.imgCase.length) return;

        GROUP.imgCaseLeft ??= [];

        GROUP.imgCase.forEach((imgRight, indexCase) => {
            if (!(imgRight instanceof HTMLImageElement)) return;

            const IMG_CASE_PATH_LEFT = GROUP.imgPath + "left/F2L" + (indexCase + 1) + ".svg";

            GROUP.imgCaseLeft[indexCase] = document.createElement("img");
            GROUP.imgCaseLeft[indexCase].classList.add("img-case");
            GROUP.imgCaseLeft[indexCase].classList.add("back");
            GROUP.imgCaseLeft[indexCase].src = IMG_CASE_PATH_LEFT;
            GROUP.imgCaseLeft[indexCase].alt = GROUP.name + ", Case " + (indexCase + 1) + " (Left)";

            imgRight.parentNode.insertBefore(GROUP.imgCaseLeft[indexCase], imgRight.nextSibling);
        });
    });

}
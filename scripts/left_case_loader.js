window.addEventListener("load", () => {
    if (typeof GROUPS !== "undefined" && GROUPS.length) {
        addLeftImages();
    }
});

function addLeftImages() {
    GROUPS.forEach((GROUP, groupIndex) => {
        if (!GROUP.imgCase || !GROUP.imgCase.length) return;

        if (!GROUP.imgCaseLeft) GROUP.imgCaseLeft = [];

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
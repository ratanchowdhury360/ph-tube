

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    const second = remainingSecond;
    return `${hour} hour ${minute} min ${second} sec ago`;
}
console.log(getTimeString(3661));
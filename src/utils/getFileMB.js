
function getFileMB(size) {
    const fileSizeInBytes = size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    return fileSizeInMB;
}

export default getFileMB
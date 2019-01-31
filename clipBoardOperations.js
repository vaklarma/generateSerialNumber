document.addEventListener('paste', e => {
    const text = e.clipboardData.getData('text/plain');
    console.log('Got pasted text: ', text);
})
// navigator.permissions.query({
//     name: 'clipboard-read'
// }).then(permissionStatus => {
//     // Will be 'granted', 'denied' or 'prompt':
//     console.log(permissionStatus.state);
//
//     // Listen for changes to the permission state
//     permissionStatus.onchange = () => {
//         console.log(permissionStatus.state);
//     };
// });
// getClipboardContents();
// async function getClipboardContents() {
//     try {
//         const text = await navigator.clipboard.readText();
//         console.log('Pasted content: ', text);
//     } catch (err) {
//         console.error('Failed to read clipboard contents: ', err);
//     }
// }

// navigator.clipboard.readText()
//     .then(text => {
//         console.log('Pasted content: ', text);
//     })
//     .catch(err => {
//         console.error('Failed to read clipboard contents: ', err);
//     });
//

// navigator.clipboard.readText().then(clipText =>
//     document.getElementById("filnameFromClipboard").innerText = clipText);
//

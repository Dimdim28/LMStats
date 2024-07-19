export const copyText = (text: string) => {
    void navigator.clipboard.writeText(text);
    alert('Text copied: ' + text);
};

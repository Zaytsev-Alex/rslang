const clearContainer = (container) => {
    container.querySelectorAll('*').forEach(e => e.remove());
}

export { clearContainer as default };

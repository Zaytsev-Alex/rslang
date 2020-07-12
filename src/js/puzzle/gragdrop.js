export default function dragdrop() {
  const ALL_DRAG_EL = document.querySelectorAll('.drag-el');
  let DRAG_SRC_EL = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    DRAG_SRC_EL = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }


  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
  }


  function handleDragEnter() {
    if (this.classList.contains('.drag-el')) {
      this.classList.add('drag-el_over');
    }
  }


  function handleDragLeave() {
    this.classList.remove('drag-el_over');
  }


  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (DRAG_SRC_EL !== this) {
      DRAG_SRC_EL.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }


  function handleDragEnd() {
    this.style.opacity = '1';

    [].forEach.call(ALL_DRAG_EL, (el) => {
      el.classList.remove('drag-el_over');
    });
  }


  [].forEach.call(ALL_DRAG_EL, (el) => {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
  });

  return false;
}
